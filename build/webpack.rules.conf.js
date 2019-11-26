const extractTextPlugin = require("extract-text-webpack-plugin");

// const extractSass = new extractTextPlugin({
//     filename: "[name].[contenthash].css",
//     disable: process.env.NODE_ENV === "development"
// });
const rules = [
    {
        test: /\.(css|scss|sass)$/,
        // 区别开发环境和生成环境
        use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "sass-loader"] : extractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"],
            // css中的基础路径
            publicPath: "../"
        }),
    },
    {
        test: /\.(png|jp?g|gif|svg)$/,
        use: {
            loader: "url-loader",
            options: {
                name: '[name].[ext]',
                limit: '8192',
                outputPath: 'img/'
            }
        }
        // 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',

    },
    {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        // use: {
        //     loader:'underscore-template-loader'
        // },
        // query: {
        //     engine: 'lodash'
        // }
    },
    // {
    //     test: /\.html$/,
    //     use: [{
    //         loader: 'html-loader',
    //         options: {
    //             interpolate: true,
    //             minimize: false
    //         }}]
    // },
    ];

module.exports = rules;