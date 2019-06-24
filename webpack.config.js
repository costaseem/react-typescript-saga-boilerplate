const { resolve }            = require('path')
const webpack                = require('webpack')
const merge                  = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin      = require('html-webpack-plugin')
const koutoSwiss             = require('kouto-swiss')
const jeet                   = require('jeet')
const rupture                = require('rupture')

const WebpackDevConfig       = require('./tools/webpack.dev.js')
const WebpackProdConfig      = require('./tools/webpack.prod.js')

const PROD = process.env.NODE_ENV ? process.env.NODE_ENV === 'production' && true : false

const common = {
  context: resolve(__dirname, 'app'),
  resolve: {
    alias: {
      '@assets': resolve('app/assets'),
      '@components': resolve('app/components'),
      '@modules': resolve('app/modules'),
      '@settings': resolve('app/settings'),
      'react-dom': PROD ? 'react-dom' : '@hot-loader/react-dom'
    },
    extensions: ['*', '.js', '.ts',  '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(styl)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              localsConvention: 'camelCase',
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              use: [koutoSwiss(), jeet(), rupture()],
              import: [resolve(__dirname, './app/assets/css/core.styl')]
            }
          }
        ]
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) } }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: require('./package.json').app_settings.title,
      template: resolve(__dirname, 'tools/.ejs'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
    new webpack.ProgressPlugin()
  ]
}

module.exports = PROD ? merge(WebpackProdConfig, common)
  : merge(WebpackDevConfig, common)
