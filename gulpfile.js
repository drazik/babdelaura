var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    prefix = require('gulp-autoprefixer'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglifyjs');

gulp.task('styles', function() {
    gulp.src('assets/scss/*.scss')
        .pipe(plumber())
        .pipe(newer('web/css'))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(prefix('last 3 versions', '> 1%'))
        .pipe(gulp.dest('web/css'));
});

gulp.task('js', function() {
    gulp.src('assets/js/app.js')
        .pipe(plumber())
        .pipe(newer('web/js/app.js'))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('web/js'));
});

gulp.task('images', function() {
    gulp.src('assets/images/**/*')
        .pipe(plumber())
        .pipe(newer('web/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('web/images'));
});

gulp.task('fonts', function() {
    gulp.src('assets/fonts/**/*')
        .pipe(plumber())
        .pipe(newer('web/fonts'))
        .pipe(gulp.dest('web/fonts'));
});

gulp.task('compile', ['styles', 'js', 'images', 'fonts']);

gulp.task('watch', ['compile'], function() {
    gulp.watch('assets/scss/**/*.scss', ['styles']);
    gulp.watch('assets/js/**/*.js', ['js']);
    gulp.watch('assets/images/**/*', ['images']);
    gulp.watch('assets/fonts/**/*', ['fonts']);
});