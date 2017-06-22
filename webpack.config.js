'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('minimist')(process.argv.slice(2))

let webpackConfig = {
  resolve: {
    modules: [
      path.resolve('node_modules'),
      path.resolve(__dirname, 'web_modules'),
      path.resolve('./src'),
    ],
  },

  resolveLoader: {
    modules: ['loaders', 'node_modules']
  },

  node: {
    tls: 'mock',
    net: 'mock',
    child_process: 'empty',
    module: 'empty',
    path: true,
    assert: true,
    events: true,
    stream: true,
    _stream_duplex: true,
    _stream_passthrough: true,
    _stream_readable: true,
    _stream_transform: true,
    _stream_writable: true,
    string_decoder: true,
    sys: true,
    console: false,
    global: true,
    process: true,
    __filename: "mock",
    __dirname: "mock",
    Buffer: true,
    setImmediate: true
  },

  entry: {
    app: ['./src']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: [
          path.resolve(__dirname, 'node_modules/rc'),
        ],
        use: [
          {
            loader: 'remove-hashbang-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'web_modules'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules/tar'),
          path.resolve(__dirname, 'node_modules/errno'),
        ],
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              presets: ['es2015', 'react', 'stage-1'],
              plugins: [
                'transform-decorators-legacy'
              ]
            }
          },
        ]
      },
      {
        test: /\.(json)$/,
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      "__webpack_require_loader__": path.join(__dirname, "web_modules", "webpackLoaders.js")
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  devServer: {
    contentBase: './dist',
    inline: true
  }
}

if (argv.env === 'production') {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ])
}

module.exports = webpackConfig
