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
        dirName: path.resolve(__dirname,'../src'),
        baseUrl: 'http://100.xxx.xxx',
        // 资源根目录
        assetsPublicPath: '/assets/'
    },
    {
        // 测试环境
        envName: 'test',
        dirName: path.resolve(__dirname,'../dist'),
        baseUrl: 'http://111.xxx.xxx',
        // 资源根目录(CDN上的绝对路径，或相对路径)
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