var path = require('path');
const webpack = require('webpack');
const publicPath = './dist';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  //Content 
  entry: './src/index.js',
  // A SourceMap without column-mappings ignoring loaded Source Maps. 
  devtool: 'cheap-module-source-map',
  plugins: [
    //simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    //Auto replacement of page when i save some file, even css
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("styles.css")
  ],
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname, publicPath),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
  },

  devServer: {
    port: 3030,
    host: 'localhost',
    //Be possible go back pressing the "back" button at chrome
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: publicPath,
    contentBase: path.join(__dirname, publicPath),
    //hotmodulereplacementeplugin
    hot: true
  },
  module: {
    rules: [
     { 
      test: /\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
           fallback: "style-loader",
           use: "css-loader"
         })
     },
      {
        test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
      },
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ["babel-loader"]
      },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       }]
  },
}
