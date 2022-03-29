// packages
const config = require('../config');
const browsersync = require('browser-sync').create();

// BrowserSync
function init(done) {
  browsersync.init({
    proxy: config.projectUrl,
    files: [
      config.paths.styles.dest + "/**/*.css",
      config.paths.scripts.dest + "/**/*.js",
      config.paths.twigs.glob,
      config.paths.fonts.dest + '/**/*',
      config.paths.images.dest + '/**/*.{png,jpg,svg,gif,ico}',
      config.paths.svgs.dest + '/**/*.svg'
    ],
    watchEvents : [ 'change', 'add', 'unlink', 'addDir', 'unlinkDir' ]
  });
  done();
}

// exports
module.exports = {
  init: init
};
