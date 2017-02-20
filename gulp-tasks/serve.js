var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  typescript = require('gulp-typescript');

gulp.task('serve', ['clean-tsc'], function () {
  browserSync({
    open: false,
    notify: false,
    server: {
      baseDir: './'
    }
  });
  gulp.watch([
    'src/**/*.html',
    'src/**/*.js',
    'src/**/*.css'
  ], reload);
  gulp.watch('src/**/*.ts', ['tsc']);
});