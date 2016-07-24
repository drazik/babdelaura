var gulp = require('gulp');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var customMedia = require('postcss-custom-media');

module.exports = function() {
    var processors = [
        atImport(),
        customMedia()
    ];

    return gulp.src('assets/css/*.css')
        .pipe(plumber())
        .pipe(postcss(processors))
        .pipe(gulp.dest('web/css'));
};
