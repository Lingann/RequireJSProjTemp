const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
// 清除目录等
const CleanWebpackPlugin = require("clean-webpack-plugin");

const webpackConfigBase = require("./webpack.base.conf");

const webpackConfigProd = {
    mode: 'prodction', // 通过mode声明生产环境
    output: {
        path: path.resolve(__dirname,'../dist'),
        //打包多出口文件
        filename: 'js/[name].[hash].js',
        publicPath: '../'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname,'../'),    // 根目录
            verbose: true, // 开启在控制台输出信息
            dry: false
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_URL' : '\"' + process.env.BASE_URL + '\"'
        })
    ]
};

module.exports = merge(webpackConfigBase,webpackConfigProd);