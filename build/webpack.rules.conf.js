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

        // use: extractSass.extract({
        //     use: [
        //         {
        //             loader: "css-loader"
        //         },
        //         {
        //             loader: "sass-loader"
        //         }],
        //     fallback: "style-loader"
        // })
    },
    {
        test: /\.ejs$/,
        // loader: 'ejs-loader',
        use: ['ejs-loader']
    },
    {
        test: /\.html$/,
        use: [{
            loader: 'html-loader',
            options: {
                interpolate: true,
                minimize: false
            }}]
    },
    ];

module.exports = rules;