'use strict';
var 
  environment = process.env.NODE_ENV || 'development',
  gulp = require('gulp'),
  polyGulpBuild = require('./modules/poly-gulp-build'),
  polyGulpCopy = require('./modules/poly-gulp-copy'),
  path = require('path'),
  runSequence = require('run-sequence'),
  config = require('./config'),
  buildDir = config.buildDir,
  distDir = config.distDir,
  srcDir = config.srcDir,
  merge = require('merge-stream');


gulp.task('build:copy-scripts', [ 'import-webcomponentsjs' ], function() {
    return gulp.src([path.join(srcDir, 'scripts/**/*')])
            .pipe(gulp.dest(path.join(buildDir, 'scripts')));
});

gulp.task('build:copy-translations', function() {
    return gulp.src([path.join(srcDir, 'translations/**/*')])
              .pipe(gulp.dest(path.join(buildDir, 'translations')));
});

gulp.task('build:copy-images', function() {
    return gulp.src([path.join(srcDir, '**/*.png'), '!bower_components/**/*'])
        .pipe(gulp.dest(buildDir));
});

gulp.task('build:copy-html', function() {
  return gulp.src([path.join(srcDir, '**/*.html'), '!bower_components/**/*'])
          .pipe(gulp.dest(buildDir));
});

gulp.task('build:copy-css', function() {
  return gulp.src([path.join(srcDir, '**/*.css'), '!bower_components/**/*'])
          .pipe(gulp.dest(buildDir));
});

gulp.task('build:copy-bower_components', function() {
    return gulp.src([path.join(srcDir, 'bower_components/**/*')])
        .pipe(gulp.dest(path.join(buildDir, 'bower_components')));
});

gulp.task('build:copy', function(done) {
  runSequence([
    'build:copy-scripts',
    'build:copy-translations',
    'build:copy-html',
    'build:copy-css',
    'build:copy-images',
    'build:copy-bower_components',
  ], done);
});

gulp.task('clean-build', function(done) {
  runSequence('clean', 'build', done);
});

gulp.task('build', function(done) {
  runSequence([
    'build:copy',
    'tsc'
  ], done);
});

gulp.task('dist', ['build'], function() {
  var isProduction = environment === 'production';
  return gulp.src(path.join(buildDir, 'app', 'elements.html'))
          .pipe(polyGulpBuild({ maximumCrush: isProduction }))
          .pipe(gulp.dest(distDir));
});


