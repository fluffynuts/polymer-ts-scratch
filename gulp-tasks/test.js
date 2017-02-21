var gulp = require('gulp'),
  Server = require('karma').Server,
  runSequence = require('run-sequence'),
  autoRebuild = require('./modules/auto-rebuild-and-notify'),
  path = require('path');

function startKarma(singleRun) {
  new Server({
    configFile: path.join(__dirname, '..', 'karma.conf.js'),
    singleRun: singleRun
  }).start();
}

gulp.task('quick-test', function() {
  startKarma(true);
});

gulp.task('test', ['clean-build'], function () {
  startKarma(true);
});

gulp.task('watch', ['clean-build'], function () {
  startKarma(false);
  autoRebuild();
});
