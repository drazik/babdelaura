var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

module.exports = function(callback) {
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
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel'
                }
            ]
        }
    }, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString());
        callback();
    });
};
