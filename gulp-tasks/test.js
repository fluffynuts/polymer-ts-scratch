var gulp = require('gulp'),
  Server = require('karma').Server,
  runSequence = require('run-sequence'),
  autoRebuild = require('./modules/auto-rebuild-and-notify'),
  path = require('path');

function startKarma(isSingleRun, browsers) {
  var config = {
    configFile: path.join(__dirname, '..', 'karma.conf.js'),
    singleRun: isSingleRun
  };
  if (browsers && browsers.length) {
    config.browsers = browsers;
  }
  new Server(config).start();
}

gulp.task('test-only', 'Tests once without rebuilding', function() {
  startKarma(true);
});

gulp.task('test', 'Cleans, builds and runs all tests once', ['clean-build'], function (done) {
  runSequence('test-only', done);
});

const defaultBrowser = 'Chrome';
gulp.task('watch', 
  `Watches your project, re-building and running all tests in ${defaultBrowser} when the source changes`, 
  [`watch:${defaultBrowser.toLowerCase()}`], function () {
});

gulp.task('watch:chrome', 'Watches your tests with Karma/Chrome', ['clean-build'], function () {
  startKarma(false, ['Chrome']);
  autoRebuild();
});

gulp.task('watch:phantom', 'Watches your tests with Karma/PhantomJS', ['clean-build'], function () {
  startKarma(false, ['PhantomJS']);
  autoRebuild();
});
