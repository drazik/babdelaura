var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer');

gulp.task('styles', function() {
    gulp.src('./assets/scss/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(prefix('last 3 versions', '> 1%'))
        .pipe(gulp.dest('./web/css'));
});

gulp.task('js', function() {
    gulp.src('./assets/js/*.js')
        .pipe(plumber())
        .pipe(gulp.dest('./web/js'));
});

gulp.task('compile', ['styles', 'js']);

gulp.task('watch', ['compile'], function() {
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['js']);
});