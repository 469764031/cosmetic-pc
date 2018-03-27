/**
 *  webpack开发配置文件
 */
'use strict';

const fs = require('fs');
const path = require('path');
const assetsViews = require('./assets-views');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包

/**
 * 全局的api配置
 **/
const api_host = 'http://127.0.0.1:8080';


module.exports = {
  entry: {
    'app': ['babel-polyfill', './app.js']
  },                 //打包的js
  devServer: {
    contentBase: "../../",  //以public为根目录提供文件
    historyApiFallback: true,
    inline: true,
    port: 7777
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'common'),
      path.resolve(__dirname, 'util'),
      'node_modules'
    ],
    extensions: ['.js', '.json', '.jsx'],
    mainFiles: ["index"]
  },
  output: {                                            //输出信息
    path: path.resolve(__dirname, './build'), //线上路径'./build/'
    filename: 'qianmi-[name]-[chunkhash].js',
    chunkFilename: 'qianmi-[name]-[id].[chunkhash:8].bundle.js',
    publicPath: '/static/js-p/build/'
  },
  module: {                                         //处理jsx的编译
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        enforce: "pre",
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(jpg|png|gif|eot|woff|ttf|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][hash].[ext]",
            publicPath: '/static/js-p/build/'
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader"
            }],
          fallback: "style-loader",
          publicPath: "/build"
        })
      }
    ]
  },
  devtool: '#source-map', //此选项方便调试
  //此处定义全局变量。
  plugins: [
    new webpack.DefinePlugin({
      api_host: JSON.stringify(api_host)
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./build/vendor-manifest.json')
    }),
    assetsViews({
      gloabal: {
        api_host: JSON.stringify(api_host)
      },
      from: './views/',
      to: '../../'
    }),
    new ExtractTextPlugin({
      filename: "style.css",
      disable: false,
      allChunks: true
    })
  ]
};