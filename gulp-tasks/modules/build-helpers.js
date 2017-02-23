const 
  gulp = require('./gulp-with-help'),
  linkHelper = require('./link-helper'),
  path = require('path'),
  config = require('../config'),
  log = require('debug')('gulp/build'),
  notBowerComponents = [config.srcDir, config.buildDir, config.distDir].map(function(d) {
    return '!' + path.join(d, 'bower_components/**/*');
  });

function copyArtifacts(title, src, dst) {
  src = Array.isArray(src) ? src: [src];
  src = src.concat(notBowerComponents);
  return gulp.src(src)
          // .pipe(debug({ title: title + ':' }))
          .pipe(gulp.dest(dst));
}

function generateCopyTask(source, target, title, glob, dependencies) {
  gulp.task(title, false, dependencies || [], function() {
    return copyArtifacts(
      title,
      path.join(source, glob),
      path.join(target),
      dependencies
    );
  });
}

function generateBuildCopyTask(subTitle, glob, dependencies, subTarget) {
  const target = subTarget ? path.join(config.buildDir, subTarget) : config.buildDir;
  generateCopyTask(config.srcDir, target, 'build:' + subTitle, glob, dependencies);
}

function generateDistCopyTask(subTitle, glob, subTarget) {
  const target = subTarget ? path.join(config.distDir, subTarget) : config.distDir;
  generateCopyTask(config.buildDir, target, 'dist:'+ subTitle, glob);
}

function linkOrCopyBower(from, to) {
  // where possible, link bower_components into the target
  //  as it's way faster (and should be valid). If we can't,
  //  then fall back on copying )':
  if (linkHelper.canCreateSymlinks()) {
    const sub = 'bower_components',
        src = path.join(from, sub),
        dst = path.join(to, sub);
    log(`linking: ${src} => ${dst}`);
    return linkHelper.createSymlink(src, dst);
  }
  // fall back on an actual copy
  log('(falling back on copy method for bower_components)');
  return gulp.src(path.join(from, 'bower_components/**/*'))
          .pipe(gulp.dest(path.join(to, 'bower_components')));
}

module.exports = {
  linkOrCopyBower: linkOrCopyBower,
  generateBuildCopyTask: generateBuildCopyTask,
  generateDistCopyTask: generateDistCopyTask,
  linkOrCopyBower: linkOrCopyBower,
  bowerComponentsExclusions: notBowerComponents
};