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

gulp.task('jpg', function() {
    var imageminJpegRecompress = require('imagemin-jpeg-recompress');

    return gulp.src('assets/images/**/*.jpg')
        .pipe(plumber())
        .pipe(newer('web/images'))
        .pipe(imageminJpegRecompress({ loop: 3 })())
        .pipe(gulp.dest('web/images'));
});

gulp.task('png', function() {
    var imageminPngquant = require('imagemin-pngquant');

    return gulp.src('assets/images/**/*.png')
        .pipe(plumber())
        .pipe(newer('web/images'))
        .pipe(imageminPngquant({ quality: '65-80', speed: 4 })())
        .pipe(gulp.dest('web/images'));
});

gulp.task('images', ['jpg', 'png']);

gulp.task('fonts', function() {
    var fontmin = require('gulp-fontmin');

    return gulp.src('assets/fonts/**/*')
        .pipe(plumber())
        .pipe(newer('web/fonts'))
        .pipe(fontmin())
        .pipe(gulp.dest('web/fonts'));
});

gulp.task('compile', ['styles', 'js', 'images', 'fonts']);

gulp.task('watch', ['compile'], function() {
    gulp.watch('assets/scss/**/*.scss', ['styles']);
    gulp.watch('assets/js/**/*.js', ['js']);
    gulp.watch('assets/images/**/*.jpg', ['jpg']);
    gulp.watch('assets/images/**/*.png', ['png']);
    gulp.watch('assets/fonts/**/*.ttf', ['fonts']);
});