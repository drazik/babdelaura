var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

module.exports = function() {
    return gulp.src('assets/scss/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
        .pipe(gulp.dest('web/css'));
};
