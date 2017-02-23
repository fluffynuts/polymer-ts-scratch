const
  gulp = require('gulp'),
  path = require('path'),
  environment = process.env.NODE_ENV || 'development',
  buildHelpers = require('./modules/build-helpers'),
  config = require('./config'),
  replace = require('gulp-replace'),
  polyGulpBuild = require('./modules/poly-gulp-build');

[
  { title: 'copy-scripts', glob: 'scripts/**/*', target: 'scripts' },
  { title: 'copy-images', glob: '**/*.png' },
  { title: 'copy-translations', glob: 'translations/**/*', target: 'translations' }
].forEach(function(item) {
  buildHelpers.generateDistCopyTask(
    item.title, item.glob, item.target
  );
});

gulp.task('dist:copy-root-html', false, function() {
  // also mutate references to imports in app
  //  as they will now sit alongside the base html
  //  files.
  return gulp.src(path.join(config.buildDir, '*.html'))
          .pipe(replace(/href="app\//, s => {
            return 'href="';
          }))
          .pipe(gulp.dest(config.distDir));
});

gulp.task('dist:copy', false, [
    'dist:copy-scripts',
    'dist:copy-root-html',
    'dist:copy-images',
    'dist:copy-translations'
], function() {
});

gulp.task('dist', `Builds and Vulcanizes to ${config.distDir}`, ['build', 'dist:copy'], function() {
  var isProduction = environment === 'production';
  return gulp.src(path.join(config.buildDir, 'app', 'elements.html'))
          .pipe(polyGulpBuild({ maximumCrush: isProduction }))
          .pipe(gulp.dest(config.distDir));
});

