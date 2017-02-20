var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    babel = require('gulp-babel');

function transpileToEs5(pipe) {
    return process.env.NODE_ENV === 'production' ? pipe.pipe(babel({ presets: ['es2015'] })) : pipe;
}

var appProject;
gulp.task('tsc', function() {
  appProject = appProject || ts.createProject('tsconfig.json');
  var pipe = gulp.src(['**/*.ts', '!node_modules/**/*.ts', '!bower_components/**/*.ts'])
      .pipe(appProject());
  return transpileToEs5(pipe)
      .pipe(gulp.dest('.'));
});
