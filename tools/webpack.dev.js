const { join }          = require('path')
const webpack           = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: join(__dirname, 'build'),
    historyApiFallback: true,
    publicPath: '/'
  },
  entry: [
    '@babel/polyfill',
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    'react-hot-loader/patch', // RHL patch
    './main.tsx'
  ],
  output: {
    filename: 'bundle.js',
    path: join(__dirname, 'dist'),
    publicPath: '/',
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]'
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
