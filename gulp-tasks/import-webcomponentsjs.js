var gulp = require('gulp');

gulp.task('import-webcomponentsjs', function () {
  // facilitate using same link (scripts/webcomponents-lite.min.js) for dev
  //  and build output
  return gulp.src([
    './bower_components/webcomponentsjs/webcomponents-lite.min.js'
  ]).pipe(gulp.dest('./scripts'));
});