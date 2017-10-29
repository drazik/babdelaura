/* eslint-env node */

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    app: [
      "./src/Babdelaura/BlogBundle/Resources/public/css/main.css",
      "./src/Babdelaura/BlogBundle/Resources/public/js/app.js"
    ],
    admin: [
      "./src/Babdelaura/AdminBundle/Resources/public/css/main.css",
      "./src/Babdelaura/AdminBundle/Resources/public/js/admin.js"
    ]
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
          plugins: [
            "transform-object-rest-spread",
            ["transform-react-jsx", { pragma: "h" }]
          ]
        },
        include: [
          path.resolve(
            __dirname,
            "src/Babdelaura/AdminBundle/Resources/public/js"
          ),
          path.resolve(
            __dirname,
            "src/Babdelaura/BlogBundle/Resources/public/js"
          )
        ]
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
                  options: {
                    enabled: production
                  }
                },
                {
                  use: require("imagemin-jpegtran"),
                  options: {
                    enabled: production
                  }
                },
                {
                  use: require("imagemin-svgo"),
                  options: {
                    enabled: production
                  }
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
    }),
    new CleanWebpackPlugin(["assets"], {
      root: path.join(__dirname, "web"),
      verbose: true
    })
  ]
};
