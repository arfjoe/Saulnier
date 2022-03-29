const configJson = require('./config.json');

module.exports = {
  projectUrl: configJson.host,
  paths: {
    input: './src',
    output: ['./build/css',"./build/js",'./build/img','./build/svg'],
    styles: {
      src: "./src/scss/**/*.{sass,scss}",
      dest: "./build/css",
      reactComponents: "css"
    },
    scripts: {
      src:"./src/javascript/src",
      glob: "./src/javascript/src/**/*.js",
      dest: "./build/js",
      reactComponents: {
        src: "./src/javascript/reactComponents",
        dest: "./build/reactComponents"
      } 
    },
    images: {
      src: './src/images/**/*.{png,jpg,svg,gif,ico}',
      dest: './build/img'
    },
    svgs: {
      src: "./src/svg/**/*.svg",
      dest: './build/svg'
    },
    fonts: {
      src: "./src/fonts/**/*",
      glob: "./src/fonts/**/*",
      dest: './build/fonts'
    },
    twigs: {
      glob: '../templates/**/*.html.twig'
    }
  }
};
