var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    babel = require('gulp-babel'),
    config = require('./config');

var appProject;
gulp.task('tsc', function() {
  appProject = appProject || ts.createProject('src/tsconfig.json');
  return gulp.src(['src/**/*.ts', '!**/bower_components/**/*.ts'])
      .pipe(appProject())
      .pipe(babel({ presets: ['es2015' ] }))
      .pipe(gulp.dest(config.buildDir));
});
