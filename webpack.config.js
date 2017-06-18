/* eslint-env node */

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    app: "./assets/js/app.js",
    admin: "./assets/js/admin.js"
  },
  output: {
    path: path.resolve(__dirname, "web", "assets"),
    publicPath: "/assets/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["env"],
          plugins: ["transform-object-rest-spread"]
        },
        include: path.resolve(__dirname, "assets", "js")
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                minimize: production,
                sourceMap: !production
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: !production,
                plugins: () => [
                  require("postcss-import")(),
                  require("postcss-url")(),
                  require("postcss-custom-properties")(),
                  require("postcss-custom-media")
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(svg|png|gif|jpg)$/,
        use: [
          { loader: "file-loader" },
          {
            loader: "imagemin-loader",
            options: {
              plugins: [
                {
                  use: require("imagemin-pngquant"),
                  options: {}
                },
                {
                  use: require("imagemin-mozjpeg"),
                  options: {}
                },
                {
                  use: require("imagemin-gifsicle"),
                  options: {}
                },
                {
                  use: require("imagemin-svgo"),
                  options: {}
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development"
    }),
    new ExtractTextPlugin({
      filename: "css/[name].css",
      disable: !production
    })
  ]
};
