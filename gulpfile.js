const gulp = require('gulp');
const webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('front/app.js')
    .pipe(webpack({
      output: {
        filename: 'app.js',
      },
    }))
    .pipe(gulp.dest('public'));
});
