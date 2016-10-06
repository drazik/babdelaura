import gulp from 'gulp'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import atImport from 'postcss-import'
import customMedia from 'postcss-custom-media'
import customProperties from 'postcss-custom-properties'
import autoprefixer from 'autoprefixer'

function styles() {
    const processors = [
        atImport(),
        customMedia(),
        customProperties(),
        autoprefixer({browsers: ['last 2 versions']})
    ]

    return gulp.src('assets/css/*.css')
        .pipe(plumber())
        .pipe(postcss(processors))
        .pipe(gulp.dest('web/css'))
}

styles.description = 'Compile styles'

export default styles
