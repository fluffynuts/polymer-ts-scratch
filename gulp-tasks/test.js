var gulp = require('gulp'),
    karma = require('karma').Server,
    runSequence = require('run-sequence'),
    path = require('path');

gulp.task('test', function() {
  Karma({
    configFile: path.join(__dirname, '..', 'karma.conf.js'),
    singleRun: true
  }).start();
  gulp.watch([
    'app/**/*.ts',
    'specs/**/*.ts'
  ], function() {
    runSequence(['tsc', 'tsc-specs']);
  });
});
