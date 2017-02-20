'use strict';
var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('clean-tsc', function(done) {
  runSequence('clean', 'tsc', done);
});