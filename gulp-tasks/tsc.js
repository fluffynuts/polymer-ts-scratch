var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    babel = require('gulp-babel'),
    log = require('debug')('gulp/tsc'),
    config = require('./config');

var appProject;
function createProject() {
    log('-> creating typescript project');
    return ts.createProject('src/tsconfig.json');
}
gulp.task('tsc', function() {
  appProject = appProject || createProject();
  return gulp.src(['src/**/*.ts', '!**/bower_components/**/*.ts'])
      .pipe(appProject())
      .pipe(babel({ presets: ['es2015' ] }))
      .pipe(gulp.dest(config.buildDir));
});
