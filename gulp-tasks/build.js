'use strict';
const
  gulp = require('./modules/gulp-with-help'),
  path = require('path'),
  runSequence = require('run-sequence'),
  config = require('./config'),
  linkHelper = require('./modules/link-helper'),
  replace = require('gulp-replace'),
  buildHelpers = require('./modules/build-helpers');

[
  { title: 'copy-scripts', glob: 'scripts/**/*', target: 'scripts', dependencies: [ 'import-webcomponentsjs' ] },
  { title: 'copy-images', glob: '**/*.png' },
  { title: 'copy-css', glob: '**/*.css' },
  { title: 'copy-translations', glob: 'translations/**/*', target: 'translations' },
  { title: 'copy-specs-lib', glob: 'specs/lib/**/*.js', target: 'specs/lib' }
].forEach(function(item) {
  buildHelpers.generateBuildCopyTask(item.title, item.glob, item.dependencies, item.target);
});

gulp.task('build:copy-html', false, function() {
  return gulp.src([path.join(config.srcDir, '**/*.html')].concat(buildHelpers.bowerComponentsExclusions))
          .pipe(replace(/\.ts"/, '.js"')) // TODO: make this smarter: should look for script tags in particular
          .pipe(gulp.dest(config.buildDir));
});

gulp.task('build:copy-bower_components', false, function() {
  return buildHelpers.linkOrCopyBower(config.srcDir, config.buildDir);
});

gulp.task('build:copy', 'Does all file copies required to get the build folder reasonable', [
    'build:copy-scripts',
    'build:copy-translations',
    'build:copy-html',
    'build:copy-css',
    'build:copy-images',
    'build:copy-bower_components',
    'build:copy-specs-lib'
  ], function() {
});

gulp.task('clean-build', 'Cleans and builds', function(done) {
  runSequence('clean', 'build', done);
});

gulp.task('build', `Builds app to ${config.buildDir}`, function(done) {
  runSequence([
    'build:copy',
    'tsc'
  ], done);
});

gulp.task('import-webcomponentsjs', false, function () {
  // facilitate using same link (scripts/webcomponents-lite.min.js) for dev
  //  and build output
  return gulp.src([
    './bower_components/webcomponentsjs/webcomponents-lite.min.js'
  ]).pipe(gulp.dest('./scripts'));
});

gulp.task('test-link-generation', 'Tests link generation on the local machine', function() {
  return new Promise((resolve, reject) => {
    if (linkHelper.canCreateSymlinks()) {
      console.log('we can do links!');
      resolve('win');
    } else {
      console.log('NOPE!');
      reject('no links!');
    }
  });
});

