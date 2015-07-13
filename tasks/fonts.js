var gulp = require('gulp');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var fontmin = require('gulp-fontmin');

module.exports = function() {
    return gulp.src('assets/fonts/**/*')
        .pipe(plumber())
        .pipe(newer('web/fonts'))
        .pipe(fontmin())
        .pipe(gulp.dest('web/fonts'));
};
