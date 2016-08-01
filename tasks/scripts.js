import gutil from 'gulp-util'
import webpack from 'webpack'

function scripts(done) {
    webpack({
        entry: {
            app: './assets/js/app.js',
            admin: './assets/js/admin.js'
        },
        output: {
            path: './web/js',
            filename: '[name].js'
        },
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                }
            ],
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /nodes_modules/
                }
            ]
        },
        eslint: {
            emitWarning: true,
            emitError: true,
            failOnWarning: false,
            failOnError: true
        }
    }, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err)
        }

        gutil.log('[webpack]', stats.toString())
        done()
    })
}

scripts.description = 'Bundles javascript'

export default scripts
