'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin');

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
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var globby = require('globby');
    var through = require('through2');
    var gutil = require('gulp-util');
    var uglify = require('gulp-uglify');

    var bundledStream = through();

    bundledStream
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(gulp.dest('web/js'));

    globby(['./assets/js/*.js'], function(err, entries) {
        if (err) {
            bundledStream.emit('error', err);
            return;
        }

        var b = browserify({
            entries: entries,
            debug: false
        });

        b.bundle().pipe(bundledStream);
    })
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