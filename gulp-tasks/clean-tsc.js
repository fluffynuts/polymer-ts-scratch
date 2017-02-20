'use strict';
var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('clean-tsc', ['clean'], function(done) {
  runSequence('tsc', done);
});
