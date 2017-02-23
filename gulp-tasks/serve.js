var gulp = require('./modules/gulp-with-help'),
  browserSync = require('browser-sync'),
  path = require('path'),
  reload = browserSync.reload,
  config = require('./config'),
  autoRebuildAndNotify = require('./modules/auto-rebuild-and-notify')

gulp.task('serve', 'Serves your app with BrowserSync', ['build'], function () {
  browserSync({
    open: false,
    notify: false,
    server: {
      baseDir: path.join('.', config.buildDir),
    },
    watchOptions: {
      usePolling: true,
      interval: 25000,
      awaitWriteFinish: true
    }
  });

  autoRebuildAndNotify(reload);
});