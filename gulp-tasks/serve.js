var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  path = require('path'),
  reload = browserSync.reload,
  config = require('./config'),
  typescript = require('gulp-typescript');

function inSrc(glob) {
  return path.join(config.srcDir, glob);
}

gulp.task('serve', ['build'], function () {
  browserSync({
    open: false,
    notify: false,
    server: {
      baseDir: path.join('.', config.buildDir)
    }
  });

  gulp.watch([inSrc('**/*.ts')], ['tsc']);

  gulp.watch([inSrc('scripts/**/*')], ['build:copy-scripts']);
  gulp.watch([inSrc('translations/**/*')], ['build:copy-translations']);
  gulp.watch([inSrc('**/*.html')], ['build:copy-html']);
  gulp.watch([inSrc('**/*.css')], ['build:copy-css']);
  gulp.watch([inSrc('**/*.png')], ['build:copy-images']);
  gulp.watch([inSrc('bower_components/**/*')], ['build:copy-bower_components']);
  
  gulp.watch([
    path.join(config.buildDir, '**', '*')
  ], reload);
});