const path = require('path');
const proEnv = require('./config/pro.env');  // 生产环境
const devEnv = require('./config/dev.env');  // 本地环境
const uatEnv = require('./config/uat.env');  // 测试环境
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['js', 'css'];

let target = '';
if(process.env.NODE_ENV === 'production'){  // 生产环境
    target = proEnv.hosturl;
}else if(process.env.NODE_ENV === 'test'){ // 测试环境
    target = uatEnv.hosturl;
}else{  // 本地环境
    target = devEnv.hosturl;
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
            config.devtool = 'cheap-module-eval-source-map';
            // config.plugins.push(new CompressionWebpackPlugin({
            //     algorithm: 'gzip',
            //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            //     threshold: 10240,
            //     minRatio: 0.8
            //   }));
        }else if(process.env.NODE_ENV === 'production'){//生产环境配置
            // config.plugins.push(
            //     new CompressionWebpackPlugin({
            //         asset: '[path].gz[query]',
            //         algorithm: 'gzip',
            //         test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            //         threshold: 10240,
            //         minRatio: 0.8
            //     })
            // )
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
        proxy:{
            '/api':{
                // target:'http://localhost:8009/', //本地
                // target:'http://node_api.connectyoume.top',//线上
                target:target,
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':'/api' 
                }
            }
        },
        before:app=>{}
    }
}