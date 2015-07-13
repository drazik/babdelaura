var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var globby = require('globby');
var through = require('through2');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');

module.exports = function() {
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
            entries: entries
        });

        b.bundle().pipe(bundledStream);
    });

    return bundledStream;
};
