const path = require('path');
const proEnv = require('./config/pro.env');  // 生产环境
const devEnv = require('./config/dev.env');  // 本地环境
const uatEnv = require('./config/uat.env');  // 测试环境
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['js', 'css'];

let target = '';
if(process.env.NODE_ENV === 'production'){  // 生产环境
    target = proEnv.hostUrl;
}else if(process.env.NODE_ENV === 'test'){ // 测试环境
    target = uatEnv.hostUrl;
}else{  // 本地环境
    target = devEnv.hostUrl;
}

module.exports = {
    baseUrl:'/',//根域上下文目录
    outputDir:'dist',//构建输出目录
    assetsDir:'assets',//静态资源目录
    lintOnSave:false,//是否开启eslint保存检测，有效值：true|false|'error'
    runtimeCompiler:true,//运行时版本是否需要编译
    // transpileDepencies:[],
    productionSourceMap:false,
    configureWebpack:(config)=>{
        if(process.env.NODE_ENV === 'development'){//开发环境配置

        }else if(process.env.NODE_ENV === 'production'){//生产环境配置

        }
    },
    chainWebpack:(config)=>{
        //图片优化
        // config.module
        //     .rule('image-webpack-loader')
        //     .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        //     .use('image-webpack-loader')
        //     // .loader('url-loader')
        //     .loader('image-webpack-loader')
        //     .options({
        //             limit: 10000
        //     })            
    },
    parallel:require('os').cpus().length > 1,//构建时开启多进程处理babel编译
    pluginOptions:{

    },
    pwa:{

    },
    devServer:{
        open:true,
        host:'127.0.0.1',
        port: 8081,
        https:false,
        hotOnly:false,
        // proxy:{ //这个代理基本上用处不大了,因为请求地址在views/main.js用this.host根据环境重写了,无论是线上还是开发环境都可以直接用，即使打包后直接扔服务器也ok
        //     '/api':{
        //         // target:'http://localhost:8009/', //本地
        //         // target:'http://node_api.connectyoume.top',//线上
        //         target:target, //这个target就是上面那个根据环境而定,但线上地址时还是没用,proxy只在dev的时候生效
        //         ws:true,
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '^/api':'/api' 
        //         }
        //     }
        // },
        before:app=>{}
    }
}