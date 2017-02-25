const
  gulp = require('./modules/gulp-with-help'),
  tslint = require('gulp-tslint'),
  files = ['src/**/*.ts', '!src/bower_components/*/**'],
  _ = require('lodash'),
  conf = {
    configuration: 'tslint.json'
  };

gulp.task('tslint', function () {
  return gulp.src(files)
    .pipe(tslint(conf))
    .pipe(tslint.report());
});

function zpad(s, howMany, withWhat) {
  s = (s + '') || '';
  howMany = howMany === undefined ? 2 : howMany;
  withWhat = withWhat || '0';
  return _.padLeft(s, howMany, withWhat);
}

function timestamp() {
  var d = new Date();
  return [
    d.getFullYear(), '-', zpad(d.getMonth() + 1), '-', zpad(d.getDate()),
    ' ',
    zpad(d.getHours()), ':', zpad(d.getMinutes()), ':', zpad(d.getSeconds())
  ].join('');
}

gulp.task('watch-tslint', ['tslint'], function () {
  gulp.watch(files, function (ev) {
    console.log(`${timestamp()} :: re-lint: ${ev.type}: ${ev.path}`);
    gulp.src(files)
      .pipe(tslint(conf))
      .pipe(tslint.report({
        emitError: false
      })).on('end', function() {
        console.log(`${timestamp()} :: lint complete`);
      });
  });
});
