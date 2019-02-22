<template>
    <div class="vue">
        <h1>Vue
            <span style="float: right;margin-right:-90px;">
                <el-badge :value="value" :max="999" class="item" type="primary">
                    <el-button size="small">浏览数</el-button>
                </el-badge>
            </span>
        </h1>
        <ul align="left" style="background-color: rgb(250,250,250);border-radius: 4px;">
            <li><span><a href="#element-ui">Element-ui</a></span> <a href="http://element-cn.eleme.io/#/zh-CN"><el-button type="primary" size="mini">官方文档</el-button></a></li>
            <li><span><a href="#vuex">Vuex</a></span> <a href="https://vuex.vuejs.org/zh/guide/"><el-button type="primary" size="mini">官方文档</el-button></a></li>
            <li><span><a href="#localstorage">localStorage</a></span></li>
            <li><span><a href="#axios">Axios</a></span> <a href="https://www.npmjs.com/package/axios"><el-button type="primary" size="mini">官方文档</el-button></a></li>
            <li><span><a href="#proxy">代理和跨域</a></span></li>
            <li><span><a href="#jwt-decode">jwt-decode</a></span> <a href="https://www.npmjs.com/package/jwt-decode"><el-button type="primary" size="mini">官方文档</el-button></a></li>
            <li><span><a href="#tinymce">Tinymce</a></span> <a href="https://github.com/tinymce/tinymce-vue#usage"><el-button type="primary" size="mini">官方文档</el-button></a></li>
            <li><a href="#others">Others...</a></li>
        </ul>
        <div class="right-bottom">
            <ul>
                <li><span><a href="#element-ui">Element-ui</a></span></li>
                <li><span><a href="#vuex">Vuex</a></span></li>
                <li><span><a href="#localstorage">localStorage</a></span></li>
                <li><span><a href="#axios">Axios</a></span></li>
                <li><span><a href="#proxy">代理和跨域</a></span></li>
                <li><span><a href="#jwt-decode">jwt-decode</a></span></li>
                <li><span><a href="#tinymce">Tinymce</a></span></li>
                <li><a href="#others">Others...</a></li>
            </ul>
        </div>
        <br>
        <p>vue脚手架的从零搭建就不用了吧，官网也有详细的教程，这里就默认大家会使用vue进行开发。
            还有就是建站用的是Vue3.0，它与Vue2.0大的变化就是webpack配置隐藏起来了，
            它都是默认配置给你配置好了的。所以如果要更改配置的话要在根目录下新建一个
            vue.config.js,在这里可以配置webpack和代理什么的。这是
            <a href="https://cli.vuejs.org/zh/config/#vue-config-js">Vue3.0官方配置参考中文文档</a>。
            以及后面一大片的代码可以直接跳过看解析，或者边看注释边看代码，仔细看的话还是很容易理解的，
            不过还是建议先看解析再看代码，这样会有一个整体的认识。</p>
        <div class="component" id="element-ui">
            <h1 align="left">Element-ui</h1>
            <p>这里用一下官方文档的一句话："Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0
                的桌面端组件库"。虽然这个网站前台是vue3.0，但这并不影响与element-ui的融合。使用element-ui来构建站点可以极大的提高开发效率。
                你想：遇到要写什么过渡动画，消息提醒，美观表格，导航啊。。。什么乱七八糟的，这里都有，<span class="line-through">直接Ctrl C + Ctrl V</span>认真观看文档，然后仔细查看参数说明,最后怀着虔诚的心把代码拷过来，岂不美哉？快快用起来，一起摇摆，你就是最靓的仔
            </p>
            <br>
            <div>
                <p>好了，element-ui这么好用，那么如何使用它呢？进入代码环节: 使用命令行进入到你的vue项目，
                    <span class="code">npm install element-ui -S</span>,安装好之后找到vue项目下的<span class="code">src/main.js</span>。在其中添加下面代码：
                </p>
                    <textarea disabled="disabled">
                            import Vue from 'vue';
                            import ElementUI from 'element-ui';
                            import 'element-ui/lib/theme-chalk/index.css';
                            Vue.use(ElementUI);
                    </textarea>
                    <p>以上引入是全局引入，如果你只想要引入部分组件的话,可以这样写：
                    </p>
                    <span class="line-code">import { MessageBox,Loading } from 'element-ui';</span>
                    <p>详情请见<a href="http://element-cn.eleme.io/#/zh-CN/component/quickstart">
                        <el-button type="primary" size="mini">官方文档</el-button>
                    </a>，官方文档是最好的老师。element-ui
                    上手还是挺快的，花点时间就入门了。
                    还有就是不要乱改组件的代码，以及明白参数的意义，不然
                    就容易gg，你花费30分钟解决莫名其妙的bug来节约看文档的10分钟。我当时用它的表单验证时，
                    一开始我以为有个回调没有用，于是删掉了，然后后面即使通过验证但一直触发不了提交函数。。。
                    结局就是花了好一会才找到，还是太菜，让各位见笑了
                    </p>
            </div>
        </div>
        <div class="component" id="vuex">
            <h1 align="left">Vuex</h1>
            <p>组件之间传值使用props感觉有点累，所以虽然这个网站前台并不是很复杂，但我还是选择用vuex来维护状态。
            在src/store.js(没有则新建)添加以下代码：
            </p>
            <textarea>
                    import Vue from 'vue'
                    import Vuex from 'vuex'
                    
                    Vue.use(Vuex)
                    
                    const types = {
                        SET_AUTHENTICATED: "SET_AUTHENICATED",
                        SET_USER: "SET_USER",
                        SET_BLOG: "SET_BLOG",
                        SET_USERINFO: "SET_USERINFO"
                    }
                    
                    const state = {
                        isAuthenticated: false, //授权状态
                        user: {}, //email,name,id
                        blog: {}, //请求的blog
                        userInfo: {} //temporarySave(暂存区),saveTime(保存时间)
                    }
                    
                    const getters = {
                        isAuthenticated: state => state.isAuthenticated,
                        user: state => state.user,
                        blog: state => state.blog,
                        userInfo: state => state.userInfo
                    }
                    
                    const mutations = {
                        //es6计算属性
                        [types.SET_AUTHENTICATED](state, isAuthenticated) {
                            isAuthenticated ? state.isAuthenticated = isAuthenticated : state.isAuthenticated = false;
                            //如果有授权的话就是store.isAuthenticates为true，否则为false
                        },
                    
                        [types.SET_USER](state, user) {
                            user ? state.user = user : state.user = {};
                        },
                    
                        [types.SET_BLOG](state, blog) {
                            blog ? state.blog = blog : state.blog = {};
                        },
                    
                        [types.SET_USERINFO](state, userInfo) {
                            userInfo ? state.userInfo = userInfo : state.userInfo = {};
                        },
                    }
                    
                    const actions = {
                        //setAuthenticated
                        setAuthenticated: ({
                            commit
                        }, isAuthenticated) => {
                            commit(types.SET_AUTHENTICATED, isAuthenticated);
                        },
                        setUser: ({
                            commit
                        }, user) => {
                            commit(types.SET_USER, user);
                        },
                        setBlog: ({
                            commit
                        }, blog) => {
                            commit(types.SET_BLOG, blog);
                        },
                        setUserInfo: ({
                            commit
                        }, userInfo) => {
                            commit(types.SET_USERINFO, userInfo);
                        },
                        clearCurrentState: ({
                            commit
                        }) => {
                            commit(types.SET_AUTHENTICATED, false);
                            commit(types.SET_USER, null);
                            commit(types.SET_USERINFO, null);
                        }
                    }
                    export default new Vuex.Store({
                        state,
                        getters,
                        mutations,
                        actions
                    })
            </textarea>
           <p>
            state里的都是要维护的状态，然后在其它组件中通过getters获取，
            同步修改状态使用commit提交mutation,异步修改状态使用dispatch提交action
        </p>
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
            <span class="line-code"> loading = Loading.service({</span>
            <span class="line-code"> lock:true,</span>
            <span class="line-code"> text:'Loading...',</span>
            <span class="line-code"> background:'rgb(0,0,0,0.7)'</span>
            <span class="line-code"> });</span>
            <span class="line-code">}</span>
            <span class="line-code">function endLoading(){</span>
            <span class="line-code"> loading.close();</span>
            <span class="line-code">}</span>
            <span class="line-code">axios.interceptors.request.use(//发送请求前拦截请求,将eleToken加入到headers.Authorization</span>
            <span class="line-code"> (config)=>{</span>
            <span class="line-code"> startLoading();</span>
            <span class="line-code"> if(localStorage.eleToken){//第一次登录时eleTokenk肯定是空的，如果有则说明是已登录用户，已登录则要设置请求头带上token</span>
            <span class="line-code"> <strong> config.headers.Authorization = localStorage.eleToken;</strong>//设置请求头带上token</span>
            <span class="line-code"> // console.log(config.headers.Authorization)</span>
            <span class="line-code"> }</span>
            <span class="line-code"> return config;</span>
            <span class="line-code"> },</span>
            <span class="line-code"> (error)=>{</span>
            <span class="line-code"> return Promise.reject(error);</span>
            <span class="line-code"> }</span>
            <span class="line-code">)</span>
            <span class="line-code">axios.interceptors.response.use(</span>
            <span class="line-code"> (response)=>{//返回拦截</span>
            <span class="line-code"> endLoading();</span>
            <span class="line-code"> return response;</span>
            <span class="line-code"> },error=>{</span>
            <span class="line-code"> console.log(error);</span>
            <span class="line-code"> endLoading();</span>
            <span class="line-code"> Message.error("请求出错，请重试!");</span>
            <span class="line-code"> let { status } = error.response;</span>
            <span class="line-code"> if(status == 401){</span>
            <span class="line-code"> Message.error("时间已过期，请重新登录!");</span>
            <span class="line-code"> localStorage.removeItem("eleToken");</span>
            <span class="line-code"> router.push('/login');</span>
            <span class="line-code"> }</span>
            <span class="line-code"> return Promise.reject(error);</span>
            <span class="line-code"> }</span>
            <span class="line-code">)</span>
            <span class="line-code">export default axios;</span>
            上面出现了headers.Authorization，字段跨域存放token凭证,
            服务器通过这个字段认证请求者的身份。上面代码表明axios每次发送请求
            都会被拦截下来填装headers.Authorization,如果本地有eleToken说明登录了，然后把token填上去。
            如果为空，说明是登录请求。当请求返回，也被axios拦截，判断返回状态，做相应处理。
        </div>
        <div class="component" id="proxy">
            <h1 align="left">代理和跨域</h1>
            重头戏来了，其实跨域这个问题大家肯定也是看了n篇文章了吧，真的是老生常谈，
            但是呢这个还是需要讲一讲的。不过不是讲跨域是什么，而是讲比较我个人对跨域和代理的理解。
            首先基于浏览器的同源安全策略，浏览器如果直接请求不同域的后台，那么浏览器会报错。
            首先要明白跨域只会发生在浏览器，如果是不同域的服务器请求服务器则不会发生，
            比如说你用php的curl，nodejs的request，postman...发送请求给服务器都不会报跨域的错。
            后面会讲nginx的代理，可以解决跨域，不过现在不讲。<br>
            根本的解决办法就是在后台接受请求时设置cors,以NodeJs为例res.header("Access-Control-Allow-Origin", "*");
            *说明服务器允许所有请求。一般还是得设置个白名单，只允许名单里的请求，这是给浏览器看的。其实浏览器
            发送请求给服务器，即使跨域了，服务器也会处理这个请求并返回数据，只是浏览器把着关，只要response的
            响应头Access-Control-Allow-Origin的值与浏览器发送请求的当前域是不同域，那么这个响应就会被浏览器挡住。
            浏览器发送请求时headers会有origin字段(ajax2才有,不过现在基本上都是ajax2了)，后台对其验证，通过
            了，那么response响应头会有Access-Control-Allow-Origin：*或者是当前域。然后我个人感觉服务器配置好cors
            才是解决跨域的根本方法，像jsonp什么的就是耍流氓，别喷我，开个玩笑，调侃一下。<br>
            另外，vue在本地开发环境时会有个devServer下的proxy配置,肯定有许多人配过这个，我也配过。不过这个东西我现在觉得
            有点鸡肋，于是我把它注释掉了，照样运行。
            <div class="img">
                <img src="../assets/proxy.jpg" alt="">
            </div>
            为什么我说它用处不大呢？理由如下：<br>
            0.解决跨域只要后台cors设置好就不会有跨域的错，它这里搞个代理用处不大。<br>
            1.这个东西只有在开发环境有用，在线上的时候还是得改接口。即使上面target改成线上地址，
            我npm run build后打包，axios请求的地址仍然不是线上地址。所以我想了一个办法可以解决：
            在src/main.js添加下面代码
            <span class="line-code">if(process.env.NODE_ENV === 'production'){ // 生产环境,线上环境</span>
            <span class="line-code"> Vue.prototype.host = 'http://node_api.connectyoume.top';</span>
            <span class="line-code">}else if(process.env.NODE_ENV === 'test'){ //测试环境</span>
            <span class="line-code"> Vue.prototype.host = '';</span>
            <span class="line-code">}else if(process.env.NODE_ENV === 'development'){ // 开发环境</span>
            <span class="line-code"> Vue.prototype.host = 'http://localhost:8009';</span>
            <span class="line-code">}</span>
            process.env.NODE_ENV有三个值'production'(生产环境)，'development'(开发环境),'test'(测试环境)
            process.env.NODE_ENV会根据你的编译环境改变，<br>
            当你运行npm run serve时，process.env.NODE_ENV的值为'development';<br>
            当你运行npm run build时，process.env.NODE_ENV的值为'production';<br>
            process.env.NODE_ENV的值为test时我也没用过，没搞过测试。<br>
            然后Vue.prototype.host的值就会根据你执行的命令不同对应到不同的值，然后我们知道在
            组件中可以用this访问Vue实例，于是axios发送请求时用this.host+接口路由,比如：<br>
            <span class="line-code">mounted(){</span>
            <span class="line-code"> this.$axios.get(<strong>this.host + "/api/quote/getQuote"</strong>)</span>
            <span class="line-code"> .then((res)=>{</span>
            <span class="line-code"> let data = res.data.data;</span>
            <span class="line-code"> if(data){</span>
            <span class="line-code"> this.img.content = data.content;</span>
            <span class="line-code"> this.img.address = data.origin_img_urls[0];</span>
            <span class="line-code"> this.img.author = data.author;</span>
            <span class="line-code"> this.img.translation = data.translation;</span>
            <span class="line-code"> }})</span>
            <span class="line-code"> .catch((err)=>{</span>
            <span class="line-code"> console.log(err);</span>
            <span class="line-code"> })</span>
            <span class="line-code">}</span>
            如果是开发环境：this.host+"/api/quote/getQuote"等同于http://localhost:8009/api/quote/getQuote<br>
            如果是线上环境：this.host+"/api/quote/getQuote"等同于http://node_api.connectyoume.top/api/quote/getQuote<br>
            虽然每次要加个this.host,但是可以省去我打包后上线的接口问题。
        </div>
        <div class="component" id="jwt-decode">
            <h1 align="left">jwt-decode</h1>
            本来这只是个解码token的，但是因为跟jsonwebtoken有关，所以还是讲一下。
            因为token是有三段，由两个逗号隔开，被base64加密了一下。
            里面存放的可以是用户名，用户id什么的。使用jwt-decode：
            <span class="code">npm install jwt-decode</span>
            在组件里<span class="code">import jwt_decode from 'jwt-decode';</span>
            前台登录完后,后台返回token,
            <span class="code">let decoded = jwt_decode(token);</span>
            详细代码的话在Login.vue里。后面会贴出仓库地址，有兴趣的可以看一下。
        </div>
        <div class="component" id="tinymce">
            <h1 align="left">Tinymce</h1>
            个人觉得这款富文本编辑器相当精巧好看，并且还支持vue,react,angular等，挺不错的。
            缺点就是加载太慢了，人家网站在国外，然后还是太慢了。。。
            <div class="img">
                <img src="../assets/tinymce.jpg" alt="">
            </div>
            如何使用它呢，官方文档全是英文，考验英语水平的时候到了。英语就英语呗，还不是照样搞定它
            在vue里安装和使用使用它：<span class="line-code">npm install @tinymce/tinymce-vue</span>
            在vue组件中使用它(详细见Write.vue):
            <span class="line-code">import Editor from '@tinymce/tinymce-vue';</span>
            <span class="line-code"> export default {</span>
            <span class="line-code"> components: {</span>
            <span class="line-code"> 'editor':Editor}</span>
            <span class="line-code"> },</span>
            <span class="line-code">&ltdiv class="tinymce-container"&gt</span>
            <span class="line-code"> &lteditor v-model="temporarySave.content"
                api-key="px3f3ogu2ob3hoqc6oiosfldxiju2f4br3s695fd1v4ssvi6" :init="init"&gt</span>
            <span class="line-code"> &lt/editor&gt</span>
            <span class="line-code"> &lt/div&gt</span>
            tinymce的初始化可以好好看一下文档，定制成你想要的样式。然后就是获得编辑框的内容是通过
            v-model="temporarySave.content",内容全是html字符，然后发送提交给后台，后台存数据库，
            然后要用的时候再把html字符串显示出来，那么就跟编辑时的样式一样。
            这里主要是讲那个api-key，没有这个api-key它会一直给你个警告并且好像一些功能也用不了，
            不美观。所以要得到这个api-key,而且这个api-key还是比较容易得到的，
            去官网注册一下账号(官网真好看，非常舒服)，进入到右上角的My Count，然后再点那个API Key Manage,就会出现
            api-key，Copy一下ok，然后事情还没完，它下面要加个域名访问权限，有这个权限的域才可以使用刚才得到
            api-key。默认已经有localhost，但是如果是127.0.0.1，还是得加上去，如果是自己的域名的话也得加上去，
            加子域名就行了。不然没有权限的域他还是报警告，对了，填完域还得点那个UPDATE API KEY，它得更新一下，可能要一会，
            全球cdn得更新一下，官方说可能要20分钟，我倒是update之后就立马生效了 。对了我的key你们应该用不了，
            因为我的域名权限只加了三个：localhost,127.0.0.1,connectyoume.top,如果是本地开发的话用我的api-key
            应该没问题不过我也没试过。大家如果想试一下这个富文本编辑器的话可以试试我的
            <span class="code">apiKey="px3f3ogu2ob3hoqc6oiosfldxiju2f4br3s695fd1v4ssvi6"</span>,
            如果想更方便的话还是要注册一个，反正也不是很费时间。
            放个图片吧：
            <div class="img">
                <img src="../assets/tinykey.jpg" alt="">
            </div>
        </div>
        <div class="component" id="others">
            <h1 align="left">Others</h1>
            <p>
                剩下一些杂七杂八的小物件，比如布局啊，自定义滚动条，
                数据库取出博客html字符串然后显示在页面上等等。
                布局我用的是flex,说起flex,我很喜欢一个文档，很舒服：<a href="http://cssreference.parryqiu.com/">http://cssreference.parryqiu.com/
                </a>。自定义滚动条要用到三个伪类，不会很难，花几分钟就可以做好。
                然后就是html字符串在页面显示。我也是用的tinymce的编辑面板，然后加个disable属性，但是由于tinymce
                首部有一个插件栏，而我只需要编辑板，所以我把首部去掉了(在组件的生命周期中把首部去掉了)。还有就是css
                平滑滚动，只要给目标容器加一个css属性<span class="code">scroll-behavior: smooth;</span>,然后运用锚点链接就行了。
            </p>
        </div>
        <router-link to="/schema">
            <el-button type="primary" icon="el-icon-d-arrow-left">上一篇(图示)</el-button>
        </router-link>
        &nbsp;
        <el-button @click="clickStar" type="primary" icon="el-icon-star-on">{{ star }}</el-button>
        &nbsp;
        <router-link to="/nginx">
            <el-button type="primary" icon="el-icon-d-arrow-right">下一篇(Nginx)</el-button>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'vue',
        data() {
            return {
                value: 0,
                star: 0,
                status: false
            }
        },
        methods: {
            getNumbers(name) {
                this.$axios.get(this.host + "/api/ip/ipAccess?type=" + name)
                    .then((res) => {
                        if (res.data.status === 1) {
                            this.value = res.data.accessTime;
                            this.star = res.data.star;
                        } else {
                            console.log(res);
                            this.$message({
                                type: "warning",
                                message: "，服务器繁忙,获取浏览数失败!",
                                center: true
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            clickStar() {
                if (this.status) {
                    this.handleStar({
                        "type": "vue",
                        "star": "decrease"
                    });
                } else {
                    this.handleStar({
                        "type": "vue",
                        "star": "add"
                    });
                }
            },
            handleStar: async function (obj) {
                try {
                    let res = await this.$axios.post(this.host + "/api/ip/handleStar", obj);
                    if (res.data.status === 1) {
                        this.$message({
                            type: "success",
                            center: true,
                            message: res.data.msg,
                            duration: 1000
                        });
                        this.star = res.data.starNumbers;
                        this.status = !this.status;
                    } else {
                        this.$message({
                            type: "error",
                            center: true,
                            message: "服务器繁忙,请稍后再试",
                            duration: 1000
                        })
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        },

        created() {
            this.getNumbers("vue");
        },
    }
</script>

<style scoped>
    h1 {
        font-size: 2em;
        padding: 10px;
    }
    p{
        text-indent:2em;
        text-align: left;
        line-height: 24px;
        border:0;
        background-color: rgb(250,250,250);
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }
    a{
        color: black;
    }
    textarea{
        background-color: rgba(40,44,52);
        color:rgb(255,255,255);
        font-size: 16px;
        line-height: 24px;
        border-radius: 3px;
        min-width: 100%;
        margin:20px 0;
        padding: 20px 0;
        overflow-y: auto;
        min-height: 125px;
        font-family: Arial, Helvetica, sans-serif;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    }
    

    .line-code {
        display: inline-block;
        background-color: rgba(40,44,52);
        color:rgb(255,255,255);
        font-size: 16px;
        line-height: 24px;
        border-radius: 3px;
        min-width: 100%;
        margin:20px 0;
        padding: 5px 0;
        overflow-y: auto;
        font-family: Arial, Helvetica, sans-serif;
    }
    .about {
        padding: 20px;
    }

    .about>p {
        text-indent: 2em;
    }

    p>span {
        color: rgb(66, 185, 131);
    }

    strong {
        font-weight: bolder;
    }

    .about>h1 {
        font-size: 2em;
        padding: 10px;
    }

    ul {
        padding: 20px;
        list-style-type: disc;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    }

    li {
        padding: 5px;
        cursor: pointer;
    }

    li>span {
        display: inline-block;
        min-width: 100px;
    }

    .vue {
        margin-right: 125px;
    }

    .code {
        background-color: rgb(66, 185, 131);
        text-indent: 0;
        padding: 2px 5px 2px 5px;
        margin: 2px;
        color: black;
        border-radius: 4px;
        display: inline-block;
        
    }

    .component {
        padding: 20px;
        text-indent: 2em;
        line-height: 22px;
        text-align: left;
    }

    .component>h1 {
        font-size: 1.2em;
    }

    .line-through {
        text-decoration: line-through;
    }

    .img {
        text-align: center;
    }

    img {
        width: 960px;
    }

    .right-bottom {
        font-size: 0.8em;
        position: absolute;
        right: 10px;
        bottom: 8vh;
        background-color: #BEEDC7;
        border-radius: 4px;
    }

    .right-bottom>ul {
        padding: 0px;
        list-style: none;
        text-align: center;
    }
</style>