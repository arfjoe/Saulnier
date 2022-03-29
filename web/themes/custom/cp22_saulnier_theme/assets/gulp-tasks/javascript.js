const gulp = require('gulp');
const config = require('../config');
const log = require('fancy-log');
const glob = require('glob');
// const fs = require('fs');
const sourcemaps = require('gulp-sourcemaps');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const rollup = require('rollup');
const polyfill = require('rollup-plugin-polyfill');
const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const { terser } = require('rollup-plugin-terser');

gulp.task("javascript", function (callback) {
  const destination = config.paths.scripts.dest;

  // On init le compiler.
  let compiler = new JavascriptCompiler(destination, callback);

  // On lance le process sur tous les fichiers d'entrée.
  const scriptFilesProcess = new Promise(resolve => {
    glob(config.paths.scripts.src + '/*/*.js',
      (err, files) => compiler.processScriptJsFiles(err, files)
        .then(() => {
          resolve();
        }));
  })
  const reactComponentsProcess = new Promise(resolve => {
    glob(config.paths.scripts.reactComponents.src + '/*.js',
      (err, files) => compiler.processReactComponents(err, files)
        .then(() => {
          resolve();
        })
    );
  })
  return new Promise(resolve => {
    Promise.all([scriptFilesProcess, reactComponentsProcess]).then(() => {
      resolve();
    });
  })
});


gulp.task("javascriptWatch", function (callback) {

  // Definition du répertoire de destination.
  let destination = config.paths.scripts.dest;

  // // Récupération du fichier en cours de modification.
  // let watchedFile = gulp.currentWatchedFilePath;
  // log("watchedFile : " + watchedFile);
  //
  // // On récupère le répertoire du bundle du fichier courant.
  // let bundleRepName = watchedFile.split(config.paths.scripts.src)[1].split('/')[1];
  //
  // // On récupère le fichier d'entrée du bundle.
  // let entry = config.scripts.src + '/' + bundleRepName + '/'+bundleRepName+'.js';
  //
  // // On crée le compiler.
  // let compiler = new JavascriptCompiler(destination, callback);
  // if (fs.existsSync(entry)) {
  //   // On lance le rebuild d'un seul fichier d'entrée.
  //   compiler.processAllJsFiles(null, [entry]);
  // }'jquery' in output.globals – guessing 'require$$0'
  // else {
  //   // On rebuild tout si le fihcier d'entrée n'a pas été identifié.
  //   glob(config.paths.scripts.glob, (err, files) => compiler.processAllJsFiles(err, files));
  // }

  // On init le compiler.
  let compiler = new JavascriptCompiler(destination, callback);

  // @todo recup le fichie'jquery' in output.globals – guessing 'require$$0'r modifié en gulp4
  // en attendant rebuild tout :
  // On lance le process sur tous les fichiers d'entrée.
  const scriptFilesProcess = new Promise(resolve => {
    glob(config.paths.scripts.src + '/*/*.js',
      (err, files) => compiler.processScriptJsFiles(err, files)
        .then(() => {
          resolve();
        }));
  })
  const reactComponentsProcess = new Promise(resolve => {
    glob(config.paths.scripts.reactComponents.src + '/*.js',
      (err, files) => compiler.processReactComponents(err, files)
        .then(() => {
          resolve();
        })
    );
  })
  return new Promise(resolve => {
    Promise.all([scriptFilesProcess, reactComponentsProcess]).then(() => {
      resolve();
    });
  })

});

/**
 *
 **/
class JavascriptCompiler {

  constructor(destination, callback) {
    this.destination = destination;
    this.filesCount = 0;
    this.processedFilesCount = 0;
    this.callback = callback;
  }

  processScriptJsFiles(err, files) {
    if (err) done(err);

    // Nombre d'éléments à traiter.
    this.filesCount = files.length;

    log('JS Entry files count ' + this.filesCount);
    const dest = config.paths.scripts.dest;
    // On process chaque fichier.
    return new Promise(resolve => {
      files.map((fileName) => this.processOneEntryFile(fileName, dest, false).then(() => {
        resolve();
      }));
    });

  }

  processReactComponents(err, files) {
    if (err) done(err);
    log('processing React Components...');
    const dest = config.paths.scripts.reactComponents.dest;
    const isReactComponent = true;
    // On process chaque fichier.
    return new Promise(resolve => {
      files.map((fileName) => this.processOneEntryFile(fileName, dest, isReactComponent).then(() => {
        resolve();
      }));
    });
  }

  processOneEntryFile(entry, destination, isReactComponent) {
    log('JS: Compilation du fichier ' + entry);
    let splitEntry = entry.split('/');
    let fileName = splitEntry[splitEntry.length - 1];
    let reactComponentsFolder = false;

    // On définie le nom du fichier js final.
    let finalName = this.getFinalName(entry);
    if(isReactComponent) {
      reactComponentsFolder = isReactComponent && fileName.slice(0, fileName.length - 3);
      finalName = this.getReactComponentFinalName(entry);
    }

    let error = false;
    // ON lance la compilation
    return rollup.rollup({
      input: entry,
      plugins: [
        peerDepsExternal(),
        nodeResolve({
          browser: true,
          dedupe: ['react', 'react-dom'],
        }),
        replace({
          preventAssignment: true,
          'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        babel({
          exclude: 'node_modules/**',
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: "> 0.5%, ie >= 11"
                },
              }
            ],
            [
              "@babel/preset-react",
              {
                "runtime": "automatic"
              }
            ]
          ],
          babelHelpers: 'bundled',
        }),

        commonjs(),
        polyfill([]),
        postcss(isReactComponent ? {
          extract: `${finalName.slice(0, finalName.length - 3)}.css`,
        } : {}),
        // terser(),
      ]
    }).then(bundle => {
      log(finalName);
      return bundle.write({
        file: `${destination}/${reactComponentsFolder ? reactComponentsFolder + '/' : ''}${finalName.slice(0, finalName.length - 3)}.js`,
        format: 'iife',
        sourcemap: true
      });
    });
  }

  /**
   *  Action lorsque qu'un fichier d'entrée a fini d'être traité.
   **/
  onOneFileProcessEnd(entry, finalName) {
    log('JS: Fin de compilation du fichier ' + entry);
    this.increaseProcessedFiles();
  }

  /**
   * On incrémente le process et lance la callback si tous les fichiers ont été traités.
   **/
  increaseProcessedFiles() {
    // on incrémente le compteur d'éléments traités
    this.processedFilesCount++;
    log('JS: ' + this.processedFilesCount + '/' + this.filesCount);

    // Si tous les éléments sont processés, on balance la suite.
    if (this.processedFilesCount === this.filesCount) {
      log('JS: Fin de compilation de tous les fichiers');
      this.callback();
    }
  }

  /**
   * Retourne le nom final du fichier lié au fichier d'entrée
   **/
  getFinalName(entry) {
    let split = entry.split('/');
    return split[split.length - 2] + '.js';
  }

  /**
   * Retourne le nom final du fichier lié au fichier d'entrée
   **/
   getReactComponentFinalName(entry) {
    let split = entry.split('/');
    return split[split.length - 1];
  }

}
