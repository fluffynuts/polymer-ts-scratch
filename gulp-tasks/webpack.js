'use strict';
/* experimental; webpack doesn't appear to work well */
var gulp = require('gulp'),
    webpack = require('gulp-webpack');

gulp.task('webpack', function() {
  return gulp.src('src/index.html')
    .pipe(webpack(require('../../webpack.config.js')))
    .pipe(gulp.dest('dist'));
});