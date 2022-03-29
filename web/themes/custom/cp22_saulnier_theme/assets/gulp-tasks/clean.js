const gulp = require('gulp');
const config = require('../config');
const del = require('del');

gulp.task('clean:styles', (done) => {
  del.sync([config.paths.styles.dest+'/**','!'+config.paths.styles.dest],{force:true});
  done();
});

gulp.task('clean:scripts', (done) => {
  del.sync([config.paths.scripts.dest+'/**','!'+config.paths.scripts.dest],{force:true});
  done();
});

gulp.task('clean:reactComponents', (done) => {
  del.sync([config.paths.scripts.reactComponents.dest+'/**','!'+config.paths.scripts.reactComponents.dest],{force:true});
  done();
});

gulp.task('clean:images', (done) => {
  del.sync([config.paths.images.dest+'/**','!'+config.paths.images.dest],{force:true});
  done();
});

gulp.task('clean:svgs', (done) => {
  del.sync([config.paths.svgs.dest+'/**','!'+config.paths.svgs.dest],{force:true});
  done();
});

gulp.task('clean:fonts', (done) => {
  del.sync([config.paths.fonts.dest+'/**','!'+config.paths.fonts.dest],{force:true});
  done();
});


gulp.task('clean', gulp.series(
  'clean:styles',
  'clean:scripts',
  'clean:reactComponents'
));

gulp.task('clean:all', gulp.series(
  'clean:styles',
  'clean:scripts',
  'clean:reactComponents',
  'clean:images',
  'clean:svgs',
  'clean:fonts'
));
