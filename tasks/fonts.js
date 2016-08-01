import gulp from 'gulp'
import plumber from 'gulp-plumber'
import newer from 'gulp-newer'
import fontmin from 'gulp-fontmin'

function fonts() {
    return gulp.src('assets/fonts/**/*')
        .pipe(plumber())
        .pipe(newer('web/fonts'))
        .pipe(fontmin())
        .pipe(gulp.dest('web/fonts'))
}

fonts.description = 'Compress and convert fonts into multiple formats'

export default fonts
