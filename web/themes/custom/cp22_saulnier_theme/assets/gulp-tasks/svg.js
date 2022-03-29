const gulp = require('gulp');
const config = require('../config');
const svgmin = require('gulp-svgmin');
const changed = require('gulp-changed');

gulp.task('svgs', () => {
  return gulp.src(config.paths.svgs.src)
    .pipe(changed(config.paths.svgs.dest))
    .pipe(svgmin())
    .pipe(gulp.dest(config.paths.svgs.dest));
});
