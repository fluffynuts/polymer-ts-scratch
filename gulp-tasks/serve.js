var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  path = require('path'),
  reload = browserSync.reload,
  config = require('./config'),
  autoRebuildAndNotify = require('./modules/auto-rebuild-and-notify')

gulp.task('serve', ['build'], function () {
  browserSync({
    open: false,
    notify: false,
    server: {
      baseDir: path.join('.', config.buildDir)
    }
  });

  autoRebuildAndNotify(reload);
});