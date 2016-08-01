import gulp from 'gulp'
import styles from './styles'
import scripts from './scripts'
import fonts from './fonts'
import images from './images'

function watch() {
    gulp.watch('assets/css/**/*.css', styles)
    gulp.watch('assets/js/**/*.js', scripts)
    gulp.watch('assets/fonts/**/*.ttf', fonts)
    gulp.watch('assets/images/**/*', images)
}

watch.description = 'Watch files modification and then run the good tasks'

export default watch
