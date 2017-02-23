var gulp = require('./modules/gulp-with-help'),
    del = require('del'),
    path = require('path'),
    config = require('./config');

gulp.task('clean', 'Destroys build artifacts with glee and abandon', function() {
  return del([
    path.join(config.buildDir, '**', '*'),
    path.join(config.distDir, '**', '*')]
  );
});
