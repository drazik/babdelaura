import gulp from 'gulp'
import fonts from './fonts'
import images from './images'
import scripts from './scripts'
import styles from './styles'

const compile = gulp.parallel(
    fonts,
    images,
    scripts,
    styles
)

compile.displayName = 'compile'
compile.description = 'Build all the assets of the project'

export default compile
