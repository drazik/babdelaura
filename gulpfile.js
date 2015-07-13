'use strict';

var gulp = require('gulp');

gulp.task('styles', require('./tasks/styles'));
gulp.task('scripts', require('./tasks/scripts'));

gulp.task('jpg', require('./tasks/jpg'));
gulp.task('png', require('./tasks/png'));
gulp.task('images', ['jpg', 'png']);

gulp.task('fonts', require('./tasks/fonts'));

gulp.task('compile', ['styles', 'scripts', 'images', 'fonts']);

gulp.task('watch', ['compile'], require('./tasks/watch'));
