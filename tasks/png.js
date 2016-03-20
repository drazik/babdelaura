var gulp = require('gulp');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var imageminPngquant = require('imagemin-pngquant');

module.exports = function() {
    return gulp.src('assets/images/**/*.png')
        .pipe(plumber())
        .pipe(newer('web/images'))
        .pipe(imageminPngquant({ quality: '65-80', speed: 4 })())
        .pipe(gulp.dest('web/images'));
};
