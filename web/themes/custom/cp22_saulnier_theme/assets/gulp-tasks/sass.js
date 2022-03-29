const gulp = require('gulp');
const config = require('../config');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const log = require('fancy-log');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
/**
 * Generate CSS from SCSS
 * Build sourcemaps
 */
gulp.task('sass', () => {
  return gulp.src(config.paths.styles.src)
    .pipe(plumber({
      errorHandler: function (err) {
        notify.onError({
          title: "Gulp error in " + err.plugin,
          message: err.toString()
        })(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.paths.styles.dest));
});
