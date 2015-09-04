var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha-phantomjs');

gulp.task('jshint', function () {
  return gulp.src(['gulpfile.js', 'src/**/*.js', 'test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function () {
  return gulp.src('test/mocha-chai-sinon/index.html')
    .pipe(mocha());
});