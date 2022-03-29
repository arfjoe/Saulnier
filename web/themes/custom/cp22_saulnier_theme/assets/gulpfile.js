/**
 *
 * Drupal 8 Gulp Workflow
 *
 * Plutôt que de faire un gulpfile long comme le bras,
 * on divise les taches dans des fichiers séparés.
 * Tous les fichiers dans le dossier "gulp-tasks" doivent
 * être requis ci dessous.
 *
 * La config est géré dans le fichier ./config.js et est
 * requis dans les différentes taches.
 *
 * à améliorer, une bonne piste est le modele suivant : https://github.com/jeromecoupe/webstoemp
 */

// Load plugins
const gulp = require("gulp");

// Load config
const config = require('./config');

// avec des export on pourrait simplifier :
const task_clean = require('./gulp-tasks/clean');
const task_copy = require('./gulp-tasks/copy');
const task_images = require('./gulp-tasks/image');
const task_svgs = require('./gulp-tasks/svg');
const task_javascript = require('./gulp-tasks/javascript');
const task_sass = require('./gulp-tasks/sass');
const task_build = require('./gulp-tasks/build');
const server = require("./gulp-tasks/browsersync.js");

// @todo trouver un moyen de recup le path du fichier changé pour ne rebuild que son point d'entrée.
// function javascriptEvents(path) {
//   gulp.currentWatchedFilePath = path;
//   gulp.series('javascriptWatch', reload);
// }
function watchFiles(done) {
  gulp.watch(config.paths.styles.src, gulp.series('sass'));
  gulp.watch(config.paths.scripts.glob, gulp.series('javascriptWatch'));
  // @todo trouver un moyen de recup le path du fichier changé pour ne rebuild que son point d'entrée.
  // let watcher = gulp.watch(config.paths.scripts.blob);
  // watcher.on('change', (path,stats) => {
  //   console.log('change');
  //   javascriptEvents(path);
  // });

  gulp.watch(config.paths.svgs.src, gulp.series('svgs'));
  gulp.watch(config.paths.images.src, gulp.series('images'));
  gulp.watch(config.paths.fonts.src, gulp.series('copy:fonts'));
  done();
}

gulp.task('watch',gulp.series('build', gulp.parallel(watchFiles,server.init)));
gulp.task('default', gulp.series('watch'));
