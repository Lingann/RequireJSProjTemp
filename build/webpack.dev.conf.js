const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigDev = {
    mode: 'development',// 通过mode声明开发环境
    output: {
        path: path.resolve(__dirname,'../dist'),
        // 打包多出口文件
        filename: 'script/[name].bundle.script'
    },
    devServer: {
        contentBase : path.join(__dirname,"../src/pages/index"),
        publicPath: '/',
        host: "127.0.0.1",
        port: "8090",
        hot: true,
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
};

module.exports = merge(webpackConfigBase,webpackConfigDev);