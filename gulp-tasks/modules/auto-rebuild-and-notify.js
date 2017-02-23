var config = require('../config'),
    gulp = require('gulp'),
    _ = require('lodash'),
    path = require('path');

function inSrc(glob) {
  return path.join(config.srcDir, glob);
}

// TODO: debounce reloads in browserSync:

function autoRebuild(notifyCallback) {
  gulp.watch([inSrc('**/*.ts')], ['tsc']);

  gulp.watch([inSrc('scripts/**/*')], ['build:copy-scripts']);
  gulp.watch([inSrc('translations/**/*')], ['build:copy-translations']);
  gulp.watch([inSrc('**/*.html'), '!bower_components/**/*'], ['build:copy-html']);
  gulp.watch([inSrc('**/*.css')], ['build:copy-css']);
  gulp.watch([inSrc('**/*.png')], ['build:copy-images']);
  gulp.watch([inSrc('bower_components/**/*')], ['build:copy-bower_components']);
  
  if (!notifyCallback) {
    return;
  }
  
  var debouncedCallback = _.debounce(notifyCallback, 150);
  gulp.watch([
    path.join(config.buildDir, '**', '*')
  ], function(ev) {
    console.log('changed: ', ev);
    notifyCallback();
  });
}

module.exports = autoRebuild;