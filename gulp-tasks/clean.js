var gulp = require('gulp'),
    del = require('del'),
    path = require('path'),
    config = require('./config');

gulp.task('clean', function() {
  return del([
    path.join(config.buildDir, '**', '*'),
    path.join(config.distDir, '**', '*')]);
});
