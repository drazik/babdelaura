var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    browserify = require('gulp-browserify'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglifyjs');

gulp.task('styles', function() {
    var sass = require('gulp-sass');
    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer-core');

    return gulp.src('assets/scss/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest('web/css'));
});

gulp.task('js', function() {
    return gulp.src('assets/js/app.js')
        .pipe(plumber())
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('web/js'));
});

gulp.task('images', function() {
    return gulp.src('assets/images/**/*')
        .pipe(plumber())
        .pipe(newer('web/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('web/images'));
});

gulp.task('fonts', function() {
    return gulp.src('assets/fonts/**/*')
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