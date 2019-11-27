// const extractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'
// const extractSass = new extractTextPlugin({
//     filename: "[name].[contenthash].css",
//     disable: process.env.NODE_ENV === "development"
// });
module.exports = {
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                            // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                            publicPath:process.env.NODE_ENV === "development" ? './' : "../",
                            // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                            hmr: devMode, // 仅dev环境启用HMR功能
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            // {
            //     test: /\.js$/,
            //     // exclude: /(node_modules)/,
            //     include: [path.resolve(__dirname, '../src')],
            //     use: {
            //         loader: "babel-loader"
            //     }
            // },
            {
                test: /\.(png|jp?g)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: '[hash].[ext]',
                        limit: '8192',
                        outputPath: 'img/'
                    }
                }
                // 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',

            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                use: [{
                    loader: "file-loader"
                }]
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
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        interpolate: true,
                        minimize: false
                    }}]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 这里的配置和webpackOptions.output中的配置相似
            // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
            filename: process.env.NODE_ENV === "development" ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: process.env.NODE_ENV === "development"  ? 'css/[id].css' : 'css/[id].[hash].css',
        })
    ]
};
