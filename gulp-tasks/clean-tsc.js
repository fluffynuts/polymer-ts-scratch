'use strict';
var gulp = require('./modules/gulp-with-help'),
    runSequence = require('run-sequence');

gulp.task('clean-tsc', 'Cleans and transpiles Typescript', ['clean', 'tsc'], function(done) {
});
