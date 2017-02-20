var gulp = require('gulp'),
  Server = require('karma').Server,
  runSequence = require('run-sequence'),
  path = require('path');

function startKarma(singleRun) {
  new Server({
    configFile: path.join(__dirname, '..', 'karma.conf.js'),
    singleRun: singleRun
  }).start();
}

gulp.task('test', ['clean-tsc'], function () {
  startKarma(true);
});

gulp.task('watch', ['clean-tsc'], function () {
  startKarma(false);
  gulp.watch([
    'app/**/*.ts',
    'specs/**/*.ts'
  ], function () {
    runSequence(['tsc']);
  });
});
