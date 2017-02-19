var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  typescript = require('gulp-typescript');

gulp.task('serve', ['tsc'], function () {
  browserSync({
    open: false,
    notify: false,
    server: {
      baseDir: './',
      directory: true
    }
  });
  gulp.watch([
    'src/**/*.html',
    'src/**/*.js',
    'src/**/*.css'
  ], reload);
  gulp.watch('src/**/*.ts', ['tsc']);
});

var project = typescript.createProject('tsconfig.json');
gulp.task('tsc', function () {
  console.log('transpiling typescript');
  return gulp.src('src/**/*.ts')
    .pipe(project())
    .pipe(gulp.dest('src'));
});