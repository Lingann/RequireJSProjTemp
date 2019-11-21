// 引入nodejs路径模块
const path = require('path');
// 引入webpack
const webpack = require("webpack");

// 读取同一目录下的入口配置文件
const ENV_CONFIG =require("./webpack.env.conf");
const RULES_CONFIG = require("./webpack.rules.conf");

/****************************插件引入*************************************/
// html webpack plugin插件引入
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 清除未引用的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// 拷贝公共资源文件到编译目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index : '../src/index.js',
        aboutUS: '../src/aboutus.js',
        contactUs : '../src/contactus.js'
    },
    module: {
        rules: [...RULES_CONFIG]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'../src')
        }
    },
    externals: {

    },
    optimization: {

    },
    plugins: [
        // 使用CleanWebpack插件
        new CleanWebpackPlugin(),
        // 使用cleanWebpack插件
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/public'), // 不打包直接输出的文件
                to: 'public', // 打包后静态文件放置位置
                ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
            }
        ]),
        // 使用HTMLWebpack插件
        new HtmlWebpackPlugin({
            title: "页面标题",
            template: "./src/pages/index.html",
            // excludeChunks: ['list','detail']
        }),
    ]
};