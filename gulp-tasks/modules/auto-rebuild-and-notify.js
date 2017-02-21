var config = require('../config'),
    gulp = require('gulp'),
    path = require('path');

function inSrc(glob) {
  return path.join(config.srcDir, glob);
}

// TODO: debounce reloads in browserSync:
//  https://github.com/BrowserSync/browser-sync/issues/982

function autoRebuild(notifyCallback) {
  gulp.watch([inSrc('**/*.ts')], ['tsc']);

  gulp.watch([inSrc('scripts/**/*')], ['build:copy-scripts']);
  gulp.watch([inSrc('translations/**/*')], ['build:copy-translations']);
  gulp.watch([inSrc('**/*.html')], ['build:copy-html']);
  gulp.watch([inSrc('**/*.css')], ['build:copy-css']);
  gulp.watch([inSrc('**/*.png')], ['build:copy-images']);
  gulp.watch([inSrc('bower_components/**/*')], ['build:copy-bower_components']);
  
  if (!notifyCallback) {
    return;
  }
  
  gulp.watch([
    path.join(config.buildDir, '**', '*')
  ], notifyCallback);
}

module.exports = autoRebuild;