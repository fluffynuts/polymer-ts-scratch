var gulp = require('gulp');

module.exports = function (buildRoot) {
    gulp.src(['./*.html', './*.png'])
        .pipe(gulp.dest(buildRoot));
    
    gulp.src(['./scripts/**/*'])
        .pipe(gulp.dest(buildRoot + '/scripts'));
    
    gulp.src(['./translations/**/*'])
        .pipe(gulp.dest(buildRoot +'/translations'));
};