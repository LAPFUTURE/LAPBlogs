<template>
    <div class="about">
        <h1>LAPBlogs的网站结构</h1>
        <p align="left">前言：感谢各位看官百忙之中抽出时间来看这篇文章，文章<span>从零建站并部署
            上线</span>。当你学完此文章时，那么起码对这个网站会有一个
            <span>整体的认识</span>，并会学习到许多知识，
            这些知识都是我一个一个坑踩出来的，或许对你以后也会有帮助。
            文章分为<span>五大块</span>，每一大块蕴含若干知识点。知识点覆盖广且杂，难免有疏漏，
            望各位大佬发现错误及时指出，共同进步。
            话不多说，搬好小板凳，带上瓜子，一起愉快的从零建站！</p>
        <ul align="left">
            <li><a href="#vue">Vue</a></li>
            <li><a href="#nginx"></a>Nginx</li>
            <li>NodeJs(Express)</li>
            <li>Python(Django)</li>
            <li>MongoDB</li>
        </ul>
        <img style="width:94%;padding:10px;" src="../assets/architecture.jpg" alt="">
        <div id="vue">
            <h1 align="left">Vue(3.0.3)</h1>
            <ul align="left">
                <li><span><a href="#element-ui">Element-ui</a></span> <a href="http://element-cn.eleme.io/#/zh-CN">官方文档</a></li>
                <li><span><a href="#vuex">Vuex</a></span> <a href="https://vuex.vuejs.org/zh/guide/">官方文档</a></li>
                <li><span><a href="#localstorage">localStorage</a></span></li>
                <li><span><a href="#axios">Axios</a></span> <a href="https://www.npmjs.com/package/axios">官方文档</a></li>
                <li><span><a href="#proxy">代理和跨域</a></span></li>
                <li><span><a href="#jwt-decode">jwt-decode</a></span> <a href="https://www.npmjs.com/package/jwt-decode">官方文档</a></li>
                <li><span><a href="#tinymce">Tinymce</a></span> <a href="https://github.com/tinymce/tinymce-vue#usage">官方文档</a></li>
                <li>...</li>
            </ul>
            <p>vue脚手架的从零搭建就不用了吧，官网也有详细的教程，这里就默认大家会使用vue进行开发。
                以及后面一大片的代码可以直接跳过看解析，或者边看注释边看代码，仔细看的话还是很容易理解的，
                不过还是建议先看解析再看代码，这样会有一个整体的认识。</p>
            <div class="component" id="element-ui">
                <h1 align="left">Element-ui</h1>
                <div>这里用一下官方文档的一句话："Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库"。虽然这个网站前台是vue3.0，但这并不影响与element-ui的融合。使用element-ui来构建站点可以极大的提高开发效率。
                    你想：遇到要写什么过渡动画，消息提醒，美观表格，导航啊。。。什么乱七八糟的，这里都有，<span class="line-through">直接Ctrl C + Ctrl V</span>认真观看文档，然后仔细查看参数说明,最后怀着虔诚的心把代码拷过来，岂不美哉？快快用起来，一起摇摆，你就是最靓的仔
                </div>
                <div>
                    好了，element-ui这么好用，那么如何使用它呢？进入代码环节: 使用命令行进入到你的vue项目，
                    <span class="code">npm install element-ui -S</span>,安装好之后找到vue项目下的<span class="code">src/main.js</span>。在其中添加下面代码：
                    <div>
                        <span class="line-code">
                            import Vue from 'vue'
                        </span>
                        <span class="line-code">
                            import ElementUI from 'element-ui'
                        </span>
                        <span class="line-code">
                            import 'element-ui/lib/theme-chalk/index.css'
                        </span>
                        <span class="line-code"> 
                            Vue.use(ElementUI)
                        </span>
                        以上引入是全局引入，如果你只想要引入部分组件的话,可以这样写：
                        <span class="line-code">import { MessageBox,Loading } from 'element-ui';</span>
                        详情请见<a href="http://element-cn.eleme.io/#/zh-CN/component/quickstart"><官方文档></a>，官方文档是最好的老师。element-ui
                        上手还是挺快的，花点时间就入门了。
                        还有就是不要乱改组件的代码，以及明白参数的意义，不然
                        就容易gg，你花费30分钟解决莫名其妙的bug来节约看文档的10分钟。我当时用它的表单验证时，
                        一开始我以为有个回调没有用，于是删掉了，然后后面即使通过验证但一直触发不了提交函数。。。
                        结局就是花了好一会才找到，还是太菜，让各位见笑了
                    </div>
                </div>
            </div>
            <div class="component" id="vuex">
                    <h1 align="left">Vuex</h1>
                    组件之间传值使用props感觉有点累，所以虽然这个网站前台并不是很复杂，但我还是选择用vuex来维护状态。
                    在src/store.js(没有则新建)添加以下代码：
                    <span class="line-code">import Vue from 'vue'</span>
                    <span class="line-code">import Vuex from 'vuex'</span>
                    <span class="line-code">Vue.use(Vuex)</span>
                    <span class="line-code">const types = {</span>
                    <span class="line-code">    SET_AUTHENTICATED: "SET_AUTHENICATED",</span>
                    <span class="line-code">    SET_USER: "SET_USER",</span>
                    <span class="line-code">    SET_BLOG: "SET_BLOG",</span>
                    <span class="line-code">    SET_USERINFO: "SET_USERINFO"</span>
                    <span class="line-code">}</span>
                    <span class="line-code">const state = {</span>
                    <span class="line-code">    isAuthenticated: false, //授权状态</span>
                    <span class="line-code">    user: {}, //email,name,id</span>
                    <span class="line-code">    blog: {}, //请求的blog</span>
                    <span class="line-code">    userInfo: {} //temporarySave(暂存区),saveTime(保存时间)</span>
                    <span class="line-code">}</span>
                    <span class="line-code">const getters = {</span>
                    <span class="line-code">    isAuthenticated: state => state.isAuthenticated,</span>
                    <span class="line-code">    user: state => state.user,</span>
                    <span class="line-code">    blog: state => state.blog,</span>
                    <span class="line-code">    userInfo: state => state.userInfo</span>
                    <span class="line-code">}</span>
                    <span class="line-code">const mutations = {</span>
                    <span class="line-code">    //es6计算属性</span>
                    <span class="line-code">    [types.SET_AUTHENTICATED](state, isAuthenticated) {</span>
                    <span class="line-code">        isAuthenticated ? state.isAuthenticated = isAuthenticated : state.isAuthenticated = false;</span>
                    <span class="line-code">        //如果有授权的话就是store.isAuthenticates为true，否则为false,下面同理</span>
                    <span class="line-code">    },</span>
                    <span class="line-code">    [types.SET_USER](state, user) {</span>
                    <span class="line-code">        user ? state.user = user : state.user = {};</span>
                    <span class="line-code">    },</span>
                    <span class="line-code">    [types.SET_BLOG](state, blog) {</span>
                    <span class="line-code">        blog ? state.blog = blog : state.blog = {};</span>
                    <span class="line-code">    },</span>
                    <span class="line-code">    [types.SET_USERINFO](state, userInfo) {</span>
                    <span class="line-code">        userInfo ? state.userInfo = userInfo : state.userInfo = {};</span>
                    <span class="line-code">    },</span>
                    <span class="line-code">}</span>
                    <span class="line-code">const actions = {</span>
                    <span class="line-code">    //setAuthenticated</span>
                    <span class="line-code">    setAuthenticated: ({</span>
                    <span class="line-code">        commit</span>
                    <span class="line-code">    }, isAuthenticated) => {</span>
                    <span class="line-code">        commit(types.SET_AUTHENTICATED, isAuthenticated);//这里提交的是mutation,</span>
                    <span class="line-code">    },</span>
                    <span class="line-code">    setUser: ({</span>
                    <span class="line-code">        commit</span>
                    <span class="line-code">    }, user) => {</span>
                    <span class="line-code">        commit(types.SET_USER, user);</span>
                    <span class="line-code">    },</span>
                    <span class="line-code">    setBlog: ({</span>
                    <span class="line-code">        commit</span>
                    <span class="line-code">    }, blog) => {</span>
                    <span class="line-code">        commit(types.SET_BLOG, blog);</span>
                    <span class="line-code">    },</span>
                    <span class="line-code">    setUserInfo: ({</span>
                    <span class="line-code">        commit</span>
                    <span class="line-code">    }, userInfo) => {</span>
                    <span class="line-code">        commit(types.SET_USERINFO, userInfo);</span>
                    <span class="line-code">    },</span>
                    <span class="line-code">    clearCurrentState: ({//清除所有状态</span>
                    <span class="line-code">        commit</span>
                    <span class="line-code">    }) => {</span>
                    <span class="line-code">        commit(types.SET_AUTHENTICATED, false);</span>
                    <span class="line-code">        commit(types.SET_USER, null);</span>
                    <span class="line-code">        commit(types.SET_USERINFO, null);</span>
                    <span class="line-code">    }</span>
                    <span class="line-code">}</span>
                    <span class="line-code">export default new Vuex.Store({</span>
                    <span class="line-code">    state,</span>
                    <span class="line-code">    getters,</span>
                    <span class="line-code">    mutations,</span>
                    <span class="line-code">    actions</span>
                    <span class="line-code">})</span>
                    state里的都是要维护的状态，然后在其它组件中通过getters获取，
                    同步修改状态使用commit提交mutation,异步修改状态使用dispatch提交action
            </div>
            <div class="component" id="localstorage">
                    <h1 align="left">localStorage</h1>
                    众所周知cookie只能存4kb，并且cookie一开始的作用是维持http状态，
                    让服务器通过cookie知道你是谁，后来cookie又被迫承担本地存储的担子，小小身板大能量。
                    后来localStorage出现了，它是用来分担和代替cookie肩上的担子的。
                    localStorage和cookie同样遵循浏览器的同源策略，并且存储容量可以达到5-10M。
                    存储在其中的数据永远也不会过期，除非使用localStorage.removeItem()或者localStorage.clear();
                    <br>
                    存储数据：<span class="code">localStorage.setItem('name',"lap" )</span>
                    <br>
                    读取数据：<span class="code">localStorage.getItem('name')</span>
                    <br>
                    删除数据：<span class="code">localStorage.removeItem('name')</span>
                    <br>
                    删除所有数据：<span class="code">localStorage.clear()</span>
                </div>
            <div class="component" id="axios">
                    <h1 align="left">Axios</h1>
                    现在引入axios,并对其封装拦截请求，在src下的http.js(没有的话就新建一个)，下面的代码可以跳过，直接看解析。
                    <span class="line-code">import axios from 'axios'</span>
                    <span class="line-code">import {Message,Loading} from 'element-ui'</span>
                    <span class="line-code">import router from './router'</span>
                    <span class="line-code">let loading;</span>
                    <span class="line-code">function startLoading(){</span>
                    <span class="line-code">    loading = Loading.service({</span>
                    <span class="line-code">        lock:true,</span>
                    <span class="line-code">        text:'Loading...',</span>
                    <span class="line-code">        background:'rgb(0,0,0,0.7)'</span>
                    <span class="line-code">    });</span>
                    <span class="line-code">}</span>
                    <span class="line-code">function endLoading(){</span>
                    <span class="line-code">    loading.close();</span>
                    <span class="line-code">}</span>
                    <span class="line-code">axios.interceptors.request.use(//发送请求前拦截请求,将eleToken加入到headers.Authorization</span>
                    <span class="line-code">    (config)=>{</span>
                    <span class="line-code">        startLoading();</span>
                    <span class="line-code">        if(localStorage.eleToken){//第一次登录时eleTokenk肯定是空的，如果有则说明是已登录用户，已登录则要设置请求头带上token</span>
                    <span class="line-code">            <strong> config.headers.Authorization = localStorage.eleToken;</strong>//设置请求头带上token</span>
                    <span class="line-code">            // console.log(config.headers.Authorization)</span>
                    <span class="line-code">        }</span>
                    <span class="line-code">        return config;</span>
                    <span class="line-code">    },</span>
                    <span class="line-code">    (error)=>{</span>
                    <span class="line-code">        return Promise.reject(error);</span>
                    <span class="line-code">    }</span>
                    <span class="line-code">)</span>
                    <span class="line-code">axios.interceptors.response.use(</span>
                    <span class="line-code">    (response)=>{//返回拦截</span>
                    <span class="line-code">        endLoading();</span>
                    <span class="line-code">        return response;</span>
                    <span class="line-code">    },error=>{</span>
                    <span class="line-code">        console.log(error);</span>
                    <span class="line-code">        endLoading();</span>
                    <span class="line-code">        Message.error("请求出错，请重试!");</span>
                    <span class="line-code">        let { status } = error.response;</span>
                    <span class="line-code">        if(status == 401){</span>
                    <span class="line-code">            Message.error("时间已过期，请重新登录!");</span>
                    <span class="line-code">            localStorage.removeItem("eleToken");</span>
                    <span class="line-code">            router.push('/login');</span>
                    <span class="line-code">        }</span>
                    <span class="line-code">        return Promise.reject(error);</span>
                    <span class="line-code">    }</span>
                    <span class="line-code">)</span>
                    <span class="line-code">export default axios;</span>
                    上面出现了headers.Authorization，字段跨域存放token凭证,
                    服务器通过这个字段认证请求者的身份。上面代码表明axios每次发送请求
                    都会被拦截下来填装headers.Authorization,如果本地有eleToken说明登录了，然后把token填上去。
                    如果为空，说明是登录请求。当请求返回，也被axios拦截，判断返回状态，做相应处理。
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'about',
        components: {
        }
    }
</script>

<style scoped>
    .about{
        padding:20px;
    }
    .about>p{
        text-indent: 2em;
    }
    p>span{
        color:rgb(66,185,131);
    }
    strong{
        font-weight: bolder;
    }
    .about>h1{
        font-size: 2em;
        padding:10px;
    }
    ul{
        padding:20px;
        list-style-type: disc;
    }
    li{
        padding: 5px;
        cursor: pointer;
    }
    li>span{
        display: inline-block;
        min-width:100px;
    }
    #vue{
        border-radius: 4px;
        background:rgb(248,248,248);
        
    }
    #vue li{
        color:rgb(66,185,131);
    }
    #vue>h1{
        font-size: 2em;
        text-indent: 1em;
        color:rgb(66,185,131);
    }
    .code{
        background-color:rgb(66,185,131);
        text-indent: 0;
        padding:2px 5px 2px 5px;
        margin:2px;
        border-radius: 4px;
        display: inline-block;
    }
    .line-code{
        /* background-color:rgb(66,185,131); */
        background-color: #BEEDC7 ;
        text-indent: 0;
        padding:2px 5px 2px 5px;
        display: block;
    }
    .component{
        padding: 20px;
        text-indent: 2em;
        line-height: 22px;
        text-align: left;
    }
    .component>h1{
        font-size:1.2em;
    }
    .line-through{
        text-decoration: line-through;
    }

</style>