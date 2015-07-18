var gulp = require('gulp');

module.exports = function() {
    gulp.watch('assets/scss/**/*.scss', ['styles']);
    gulp.watch('assets/js/**/*.js', ['js']);
    gulp.watch('assets/images/**/*.jpg', ['jpg']);
    gulp.watch('assets/images/**/*.png', ['png']);
    gulp.watch('assets/fonts/**/*.ttf', ['fonts']);
};