const gulp = require('gulp');
const config = require('../config');
const changed = require('gulp-changed');

/**
 * Copy fonts to build folder
 */
gulp.task('copy:fonts', () => {
  return gulp.src(config.paths.fonts.src)
    .pipe(changed(config.paths.fonts.dest))
    .pipe(gulp.dest(config.paths.fonts.dest));
});
