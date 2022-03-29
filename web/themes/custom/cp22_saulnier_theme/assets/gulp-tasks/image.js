const gulp = require('gulp');
const config = require('../config');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');


gulp.task('images', () => {
  return gulp.src(config.paths.images.src)
    .pipe(changed(config.paths.images.dest))
    .pipe(imagemin(Object.assign({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }, { use: [pngquant()] })))
    .pipe(gulp.dest(config.paths.images.dest));
});
