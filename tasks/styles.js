var gulp = require('gulp');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var cssnext = require('cssnext');

module.exports = function() {
    var processors = [
        cssnext({
            url: false
        })
    ];

    return gulp.src('assets/css/*.css')
        .pipe(plumber())
        .pipe(postcss(processors))
        .pipe(gulp.dest('web/css'));
};
