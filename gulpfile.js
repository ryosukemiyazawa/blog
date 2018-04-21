const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

var paths = "public/**/*.html"
var css_path = "layouts/partials/*.css"
var css_min_path = "layouts/partials"

gulp.task('minify-html', () => {
  return gulp.src(paths)
    .pipe(htmlmin({
      collapseWhitespace: true,
      caseSensitive: true,
      preserveLineBreaks: true,
      minifyJS: true}))
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['minify-html'], function () {
});
