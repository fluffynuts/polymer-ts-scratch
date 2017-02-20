'use strict';
var 
  environment = process.env.NODE_ENV || 'development',
  gulp = require('gulp'),
  polyGulpBuild = require('./modules/poly-gulp-build'),
  polyGulpCopy = require('./modules/poly-gulp-copy'),
  path = require('path'),
  runSequence = require('run-sequence'),
  buildRoot = 'dist'; // deviates from MGS default

function doBuild (input, output) {
    var isProduction = environment === 'production';
    return gulp.src(input)
      .pipe(polyGulpBuild({ maximumCrush: isProduction }))
      .pipe(gulp.dest(output));
}

gulp.task('dist-scripts', [ 'import-webcomponentsjs'], function() {
    return gulp.src(['./scripts/**/*'])
            .pipe(gulp.dest(buildRoot + '/scripts'));
});

gulp.task('dist-translations', function() {
    return gulp.src(['./translations/**/*'])
              .pipe(gulp.dest(buildRoot +'/translations'));
});

gulp.task('dist-root-html', function() {
  return gulp.src(['./*.html'])
          .pipe(gulp.dest(buildRoot));
});

gulp.task('dist-images', function() {
    gulp.src(['./**/*.png'])
        .pipe(gulp.dest(buildRoot));
});

gulp.task('dist-static-content', function(done) {
  runSequence([
    'dist-scripts', 
    'dist-translations', 
    'dist-root-html', 
    'dist-images'],
  done);
});

gulp.task('build', ['dist-static-content'], function() {
  return doBuild('app/elements.html', path.join(buildRoot, 'app'))
});


