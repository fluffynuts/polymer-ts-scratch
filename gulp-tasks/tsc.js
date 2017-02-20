var gulp = require('gulp'),
    ts = require('gulp-typescript');

var project = ts.createProject('tsconfig.json');
gulp.task('tsc', function() {
  gulp.src(['src/**/*.ts'])
      .pipe(project())
      .pipe(gulp.dest('src'));
});