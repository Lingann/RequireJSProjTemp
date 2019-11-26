const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigDev = {
    mode: 'development',// 通过mode声明开发环境
    output: {
        path: path.resolve(__dirname,'../dist'),
        // 打包多出口文件
        filename: 'script/[name].bundle.js'
    },
    devServer: {
        contentBase : path.join(__dirname,"../src/index"),
        publicPath: '/',
        host: "127.0.0.1",
        port: 9000,
        // hot: true,
        overlay: true, // 浏览器页面上显示错误
        // open: true, // 开启浏览器
        // stats: "errors-only", //stats: "errors-only"表示只打印错误：
        //服务器代理配置项
        proxy: {
            '/testing/*' : {
                target: '',
                secure: true,
                changeOrigin : true
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BASE_URL' : '\"' + process.env.BASE_URL + '\"'
        })
    ],
    devtool: "source-map"
};

module.exports = merge(webpackConfigBase,webpackConfigDev);