# RequireJS 项目模板

## 一、项目准备

项目准备提要：

1. 搭建项目开发环境

2. 项目工程创建

3. 版本控制

4. 安装基本依赖库

### 1.1 搭建项目开发环境

项目开发环境搭建步骤：

1. 准备好Git环境，进行Git下载安装，[下载地址](https://git-scm.com/downloads)
2. 准备好NodeJS环境，进行nodeJS下载安装，[下载地址](https://nodejs.org/en/)
3. 准备好WebStrom开发工具，WebStrom下载安装，[下载地址](https://www.jetbrains.com/webstorm/)

4. Chrome浏览器安装

### 1.2 项目工程创建

打开WebStrom创建一个项目，保存在一个不包含中文的目录下。

规划目录架构，主要突出以下重点：

- **文档管理**

  进行需求文档、设计文档、技术文档、规范文档、测试文档、异常、日志管理，以及新人培训文档

- **开发目录**

  开发目录一般是以`src`命名，开发工作一般都在该目录下进行

- **构建目录**

  开发完成后进行构建，构建出来的项目就是最终需要部署到服务器上的项目，可以使用`dist`命名

### 1.3 版本控制

#### 1.3.1 创建版本控制仓库步骤

**Git仓库建立**

在Github上创建一个Git仓库，命名与项目命名一致

本地与远程项目合并，并将本地项目进行第一次提交

**关联仓库**

```
git remote add origin git@github.com:yourName/yourRepo.git
```

**合并仓库**

```
git pull origin master
```

**添加**

```
git add -u
```

**修改**

```
git commit -m "第一次提交"
```

**推送**

```
git push origin master
```

**创建标签**

```
git tag tag-20191119-v0.0.0
```

#### 1.3.2 协同开发工作流程

进行开发时，需要建立一个开发分支，开发人员主要在开发分支上进行开发。目前主分支master branch 和开发分支 develop branch，主分支和开发分支是受保护的，开发者不能直接对其进行开发工作，只有项目管理着(通常是项目的发起者)能对其进行较高权限的操作。

协同开发过程开发者的工作流程是先将远程库克隆到本地，然后基于开发分支创建一个功能分支，进行相应的功能开发后提交并推送到远程库。

> 分支主要分为以下几类：
> - 主分支 Master
> - 开发分支 Develop
> - 临时分支
>    -  功能分支 feature 
>    - 预发布分支 release
>    - 修补bug fixbug/hotfix
>  
> **临时分支都属于临时需要，使用完以后，应该删除，使得代码库常设分支始终只有Master和Develop**

​    

**创建开发分支**

```
git branch dev
```

**切换分支**

```
git checkout dev
```

### 1.4 安装基本依赖

#### 1.4.1 进行npm初始化

```
npm init
```

#### 1.4.2 webpack环境配置

```
npm install --save-dev webpack-cli
```

在项目根目录创建`webpack.config.js`文件



有关webpack的教程介绍：

- [webpack4.x最详细入门指南](https://blog.51cto.com/14047134/2310246)
- [翻译webpack 4 教程： 从0配置到生产模式](https://juejin.im/post/5af934806fb9a07ab458bced#heading-0)

**安装webpack4**

```
npm install --save-dev webpack
```



然后打开`package.json`添加构建脚本

```
"scripts":{
	"build" : "webpack"
}
```

关闭保存

基本的`webpack.config.js`配置如下

```js
const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: script,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: script
    },
    module:{
        rules:[]
    },
    externals: {
        
    },
    resolve:{
        alias:{
            
        }
    },
    plugins: [
        
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
}
```



#### 1.4.3 webpack多配置文件

开发和生产版本的目标差异很大。在开发中，我们需要强大的源映射和具有实时重载或热模块替换的localhost服务器。在生产中，我们的目标转向集中于缩小包装，减轻重量源图以及优化资产以缩短装载时间。有了逻辑上的分离，我们通常建议为每种编译环境**单独的webpack配置**。



虽然我们将生产和开发特定的部分分开，但请注意，我们仍将保持“同用”配置以保持干燥。未来将这些配置合并在一起，我们将使用名为实用程序`webpack-merge`。有了"通用"配置，我们就不必在特定于环境的配置中重复代码。



此时我们已经不需要`webpack.config.js`配置文件，而是建立另外几个配置文件。



在根目录增加一个`build`文件夹，将所有的配置文件放于此处。



**引入webpack-merge**

webpack-merge,用来合并我们的配置

```
npm install --save-dev webpack-merge
```



配置`webpack.env.conf.js`文件**

`webpack.env.cong.js`作为环境定义文件,将需要的开发环境和生产环境中通用配置集中存放在这里

```js
// 'use strict'

const path = require('path');

/*
* 环境列表，第一个环境为默认环境
* envName: 指明现在使用的环境
* dirName: 打包的路径，只在build的时候有用
* baseUrl: 这个环境下面的api请求的域名
* assetsPublicPath: 静态资源存放的源码，未指定则使用相对路径
* */

const ENV_LIST = [
    {
        // 本地环境
        envName: 'local',
        dirName: 'local',
        baseUrl: "http://199.xxx.xxx",
        assetsPublicPath: '/'
    },
    {
        // 开发环境
        envName: 'dev',
        dirName: 'dev',
        baseUrl: 'http://100.xxx.xxx',
        assetsPublicPath: '/'
    },
    {
        // 测试环境
        envName: 'test',
        dirName: path.resolve(__dirname,'../dist'),
        baseUrl: 'http://111.xxx.xxx',
        assetsPublicPath : '/'
    }
];

// 获取环境
const HOST_ENV = JSON.parse(process.env.npm_config_argv).original[3] || "";

// 没有设置环境，则默认为第一个
const HOST_CONF = HOST_ENV ? ENV_LIST.find(item=>item.envName === HOST_ENV) : ENV_LIST[0];

// 把环境常量挂着到process.env方便客户端使用
process.env.BASE_URL = HOST_CONF.baseUrl;

module.exports.HOST_CONF = HOST_CONF;

module.exports.ENV_LIST = ENV_LIST;
```



**配置`webpack.base.conf.js`文件**

`webpack.base.conf.js`是作为公共配置文件

```js
// 引入nodejs路径模块
const path = require('path');
// 引入webpack
const webpack = require("webpack");

require("./webpack.env.conf");

module.exports = {
    entry: {
        index : './src/index.js',
        aboutUS: './src/aboutus.js',
        contactUs : './src/contactus.js'
    },
    module: {
        rules: []
    },
    resolve: {

    },
    externals: {

    },
    optimization: {

    },
    plugins: []
};
```

**配置`webpack.dev.conf.js`文件**

`webpack.dev.cpnf.js`作为开发环境的配置

```js
const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigDev = {
    mode: 'development',// 通过mode声明开发环境
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'js/[name].bundle.js'
    },
    devServer: {
        contentBase : path.join(__dirname,"../src/pages/index"),
        publicPath: '/',
        host: "127.0.0.1",
        port: "8090",
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
```

**配置`webpack.prod.conf.js`文件**

```js
const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
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

    ]
};

module.exports = merge(webpackConfigBase,webpackConfigProd);
```



**配置`webpack.rules.conf.js`文件**

```

const rules = [

];

module.exports = rules;
```



**配置`package.json`**

```js
"scripts": {
    "test": "npm run build --[test]",
    "dev": "cross-env NODE_ENV=development webpack-dev-server  --config build/webpack.dev.conf.js",
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.prod.conf.js"
},
```



在上面的`package.json`中的`cross-env`会进行不是内部或外部命令，也不是可运行程序的报错。

简单来说，就是window不支持`NODE_ENV=development`的设置方式

解决办法是安装`cross-env`

```
npm install cross-env --save-dev
```

然后在`NODE_ENV=xxxxxx`前面添加`cross-env`就可以了



- [webpack4 多页面，多环境配置Demo](https://github.com/Blubiubiu/webpack4_mpa_demo)
- [Webpack4 多页面，多环境配置，逐行解释](https://www.520mwx.com/view/5181)
- [Webpack下多环境配置的思路](https://juejin.im/post/5b319c5e518825749d2d60be)
- [Webpack 生产环境配置介绍](https://webpack.js.org/guides/production/)
- [为什么我们要做三份 Webpack配置文件](https://zhuanlan.zhihu.com/p/29161762)

#### 1.4.4 webpack构建多页面

- [webpack构建多页面应用——初探](https://segmentfault.com/a/1190000017393930#articleHeader3)



#### 1.4.5 webpack常用插件

##### 1.4.5.1  开发测试服务器`webpack-dev-server` 

webpack-dev-server 是一个小型node.js express 服务器，它通过webpack-dev-middleware来为webpack打包的资源文件提供服务。可以认为webpack-dev-server就是一个拥有实时重载能力的镜头资源服务器（建议只在开发环境使用）

**安装**

```
npm install webpack-dev-server --save-dev
```



##### 1.4.5.2 处理html模板 `HtmlWebpackPlugin`

`HtmlWebpackPlugin`简化了HTML文件的创建，该插件将为你生成一个HTML5文件，其中包括使用`script`标签的body中所有webpack包

**安装**

```js
npm install --save-dev html-webpack-plugin
```

**使用**

只需添加插件到你的webpack（webpack.base.conf.js）配置:

```js
const htmlWebpackPlugin = require("html-webpack-plugin");
```

然后在配置文件中plugins变量下添加实例,`html-webpack-plugin`的一个实例生成一个html文件，如果单页面应用中需要多个页面入口，或者多页面应用时配置多个html时，那就需要实例化该插件多次

```js
plugins: [
    new HtmlWebpackPlugin({
        title: "页面标题",
        template: index.ejs,
        excludeChunks: ['list','detail']
    }),
    new HtmlWebpackPlugin({
        filename:  'list.html',
        template: "./src/pages/detail.html"
    })
]
```



有关HtmlWebpackPlugin插件配置的详细介绍，可以参考[html-webpack-plugin用法全解](https://segmentfault.com/a/1190000007294861)



##### 1.4.5.3 清除构建资源`CleanWebpackPlugin`

通常，在每次构建前清理`/dist`文件夹，是比较推荐的做法，因此只会生成用到的文件。`clean-webpack-plugin`是一个比较普及的管理插件，让我们安装和配置下。

**安装**

```js
npm install --save-dev clean-webpack-plugin
```



**使用**

```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const webpackConfig = {
    plugins: [
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/dist/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         */
        new CleanWebpackPlugin(),
    ],
};
 
module.exports = webpackConfig;
```

##### 1.4.5.4 处理CSS

使用`css-loader`或`raw-loader`将其转换为js模块，然后使用`extractTextPlugin`提取到单独的文件中

在`src`目录中创建`style`目录，里面存放我们需要的样式文件。要在webpack处理css,我们需要安装两个插件`style`以及`style-loader`

```
npm install --save-dev style-loader css-loader
```

另外我们还需要`extract-text-webpack-plugin` 的作用是分离项目中的css文件

```
npm install --save-dev extract-text-webpack-plugin
```

安装`postcss`

```
npm install postcss-loader --save-dev
```

压缩css文件可以使用`optimize-css-assets-webpack-plugin`

```
npm install --save-dev optimize-css-assets-webpack-plugin
```



##### 1.4.5.5 处理sass

通过将 [style-loader](https://github.com/webpack-contrib/style-loader) 和 [css-loader](https://github.com/webpack-contrib/css-loader) 与 sass-loader 链式调用，可以立刻将样式作用在 DOM 元素。

安装

```
npm install sass-loader node-sass webpack --save-dev
```

```js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    }
};
```



##### 1.4.5.6 使用ejs进行模板嵌套

ejs-loader使用的lodash库中的template函数编译ejs模板，而不是使用标准ejs模板引擎。ejs-loader使用loadsh库中的template函数编译ejs模板而不是使用标准ejs模板引擎。

> ejs本来是用`<% - inclued('xxx') %>` 引用模板的，而我测试ejs-loader不能这么用，得用`<%= require('xxx') () %>` （ejs-loader 处理后是个方法，调用该方法会返回处理后的html)

先安装lodash，lodash是一个著名的javascript原生库，不需要引入其他第三方依赖。是一个意在提高开发者效率，提高js原生方法性能的js库。

```
npm install --save-dev lodash
```



**`安装ejs-loader`**

```
npm install --save-dev ejs-loader
```

 **配置**

```js
module:{
	rules: [
        {
            test: /\.ejs$/,
            // loader: 'ejs-loader',
            use: ['ejs-loader']
        },
    ]
}
```

除了ejs之外，我们还需要处理html所以再安装一个`html-loader`

```js
module:{
	rules: [
        {
            test: /\.html$/,
            use: [{
            loader: 'html-loader',
            options: {
            interpolate: true,
            minimize: false
            }
            }]
        }
    ]
}
```



- [Webpack4 + ejs构建多页面应用](http://www.neiltop.com/detail/5d47e2eddc40834940b93902)

- [webpack-使用html-webpack-plugin和ejs-loader将侧栏、头部、底部公共html做成模板，并生成合并后的html页面](https://www.cnblogs.com/jffun-blog/p/9465254.html)



##### 1.4.5.7 `url-loader`解决项目中图片打包路径问题

在实际生产中有以下几种图片的引用方式:

```html
<img src="photo.jpg" />
<div style="background:url(photo.jpg)"><div>
```

css文件中的背景图等设置

```css
.photo {
	background: url(photo.jpg);
}
```

在js中进行图片引用

```js
$('.img').attr("src","photo.jpg");
```



在webpack中引入图片需要依赖`url-loader`这个加载器

```
npm install --save-dev url-loader
```



然后在在`webpack.config.js`的rules中进行配置

```js
module:{
	rules: [
        {
            test:/\.(jpg|png|gif|bmp|jpeg)$/,
            loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]'
        }
    ]
}
```





**关于在`ejs`文件中的图片打包问题**

`ejs`模板里面通过`<img src="<%= require('assets/images/xxxx.jpg') %>">`引入图片，打包的时候就能生成对应的图片资源文件。

