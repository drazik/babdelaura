import gulp from 'gulp'
import newer from 'gulp-newer'
import imagemin from 'gulp-imagemin'
import mozjpeg from 'imagemin-mozjpeg'
import pngquant from 'imagemin-pngquant'

const compress = imagemin([
    mozjpeg(),
    pngquant()
])

const dest = 'web/images'

function images() {
    return gulp.src('assets/images/**/*.{jpg,png}')
        .pipe(newer(dest))
        .pipe(compress)
        .pipe(gulp.dest(dest))
}

images.description = 'Compress images'

export default images
