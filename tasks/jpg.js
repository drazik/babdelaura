var gulp = require('gulp');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

module.exports = function() {
    return gulp.src('assets/images/**/*.jpg')
        .pipe(plumber())
        .pipe(newer('web/images'))
        .pipe(imageminJpegRecompress({ loop: 3 })())
        .pipe(gulp.dest('web/images'));
};
