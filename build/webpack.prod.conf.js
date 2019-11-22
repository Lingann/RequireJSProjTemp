const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
// 清除目录等
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const webpackConfigBase = require("./webpack.base.conf");

process.env.NODE_ENV = "test";

const webpackConfigProd = {
    mode: 'production', // 通过mode声明生产环境
    output: {
        path: path.resolve(__dirname,'../dist'),
        //打包多出口文件
        filename: 'js/[name].[hash].js',
        publicPath: '../'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        //删除dist目录
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../'), //根目录
            // verbose Write logs to console.
            verbose: true, //开启在控制台输出信息
            // dry Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_URL' : '\"' + process.env.BASE_URL + '\"'
        })
    ]
};

module.exports = merge(webpackConfigBase,webpackConfigProd);