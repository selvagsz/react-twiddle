const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: ['./src']
  },

  output: {
    path: './dist',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'web_modules')
        ],
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-1'],
          plugins: [
            'transform-decorators-legacy'
          ]
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: 'style!css?modules&localIdentName=[local]!sass?paths=/src'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  devServer: {
    contentBase: './dist',
    inline: true
  }
}
