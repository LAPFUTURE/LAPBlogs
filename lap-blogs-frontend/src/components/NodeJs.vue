<template>
    <div class="nginx">
        <h1>NodeJs
            <span style="float: right;margin-right:-90px;">
                <el-badge :value="value" :max="999" class="item" type="primary">
                    <el-button size="small">浏览数</el-button>
                </el-badge>
            </span>
        </h1>
        <ul align="left">
            <li><span><a href="#express">What is Express?</a></span> <a href="http://www.expressjs.com.cn/">官方文档</a></li>
            <li><span><a href="#cors">CORS</a></span></li>
            <li><span><a href="#jwt">JsonWebToken</a></span> <a href="https://www.npmjs.com/package/jsonwebtoken">官方文档</a></li>
            <li><span><a href="#route">路由</a></span></li>
            <li><span><a href="#request">request</a></span> <a href="https://www.npmjs.com/package/request">官方文档</a></li>
            <li><a href="#others">Others...</a></li>
        </ul>
        <div class="right-bottom">
            <ul>
                <li><span><a href="#express">What is Express?</a></span></li>
                <li><span><a href="#cors">CORS</a></span></li>
                <li><span><a href="#jwt">JsonWebToken</a></span></li>
                <li><span><a href="#route">路由</a></span></li>
                <li><span><a href="#request">request</a></span></li>
                <li><a href="#others">Others...</a></li>
            </ul>
        </div>
        <div class="component" id="express">
            <h1 align="left">What is Express?</h1>
            借用网上的一段话来介绍：<strong>Express 是一个简洁而灵活的 node.js Web应用框架,
                提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
                使用 Express 可以快速地搭建一个完整功能的网站。</strong>
            <br>
            其实对于LAPBlogs而言，主要使用的是express路由中间件功能，以及一些
            其它的协同功能，它并没有向客户端动态渲染html模板，它的作用就是
            承担前哨和缓冲，响应前台的ajax并向真正的后台发出请求并进一步处理后台
            返回的数据，最后将数据返回给前台。由于同源策略只存在于浏览器中，nodejs
            发送请求给后台是不会有跨域错误的。
            <br>
            安装express:<span class="code">npm install express</span>
            <br>
            使用express:
            <span class="line-code">const express = require("express");</span>
            <span class="line-code">const app = express();</span>
            <span class="line-code">app.get('/', function (req, res) {</span>
            <span class="line-code"> res.send('Hello World')</span>
            <span class="line-code">})</span>
            <span class="line-code">app.listen(8010,()=>{</span>
            <span class="line-code">console.log("Server is running in 8010"))</span>
        </div>
        <div class="component" id="cors">
            <h1 align="left">CORS</h1>
            前台发送请求给nodejs,如果前台和nodejs不是同域，那么浏览器就会报错。
            于是现在先设置好后台的cors,俗话说得好，只要cors设得好，跨域它就不会报。
            下面会解释代码并且会涉及到<strong>预检请求</strong>:
            <span class="line-code">app.all('*', function(req, res, next) {</span>
            <span class="line-code"> if(req.headers.origin === "http://127.0.0.1:8081" || req.headers.origin ===
                "http://lapblogs.connectyoume.top"){ </span>
            <span class="line-code"> res.header("Access-Control-Allow-Origin", req.headers.origin);</span>
            <span class="line-code"> } //<strong>作用于简单跨域请求和非简单跨域请求</strong></span>
            <span class="line-code"> res.header("Access-Control-Allow-Headers", "*"); //<strong>作用于非简单跨域请求，表示允许正式请求定义任意头部字段</strong>
            </span>
            <span class="line-code"> res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS"); <strong>//作用于非简单跨域请求，表示允许正式请求的请求方法为post,get,options</strong>
            </span>
            <span class="line-code"> res.header("Content-Type", "application/json;charset=utf-8");</span>
            <span class="line-code"> next(); </span>
            <span class="line-code">});</span>
            首先用all函数定义了中间件，所有请求都必须先通过此中间件。
            前台发送的跨域请求分为简单跨域请求和非简单跨域请求，区别在于非简单跨域请求会在
            发出正式请求前会先发出一个方法为options的预检请求来探路。
            <br>
            为什么非简单请求需要先发送预检请求：
            <br>
            首先我们要知道浏览器是如何限制跨域的：
            <br>
            <strong>1.在发送请求前就把跨域请求拦截；</strong>
            <br>
            <strong>2.拦截跨域请求的响应（数据已经是后台返回了只是被浏览器拦下，无法得到）。</strong>
            <br>
            而大部分浏览器是通过第2种方式限制跨域的。但这时就会出现一个问题：
            即使浏览器拦截了跨域请求的响应，但后台已经响应跨域请求了，
            并可能已经对数据库有了操作，这时浏览器的拦截跨域请求的响应岂不是无用功?
            Of course not!这时非简单跨域请求就会用到预检请求探路。
            <br>
            <strong>简单跨域请求</strong>：请求方法为POST，GET,HEAD,并且当请求方法为POST时，Content-Type必须是
            application/x-www-form-urlencoded, multipart/form-data或着text/plain中的其中一个值。
            并且请求中没有自定义HTTP首部。满足上述条件的就是简单跨域请求，其余的都是非简单跨域请求。
            对于简单跨域请求，浏览器会在HTTP请求中添加Origin首部。
            <br>
            <strong>非简单跨域请求</strong>：非简单跨域请求 = 所有跨域请求 - 简单跨域请求，毕竟简单跨域请求好记。
            那么浏览器对于非简单跨域请求会做什么呢？首先就是正式发送前会先发送一个方法为options(获取服务器对于跨域请求的限制)的预检请求。
            预检请求有几个首部字段:
            <br>
            origin对应服务器响应的Access-Control-Allow-Origin,
            <br>
            Access-Control-Request-Method对应服务器响应的Access-Control-Allow-Methods,
            <br>
            Access-Control-Request-Headers对应服务器响应的Access-Control-Allow-Headers,
            <br>
            另外，服务器端还可以加入Access-Control-Max-Age，允许浏览器在指定时间内，无需再发送预检请求进行协商
            <br>
            最后下面有详细的字段解析，看完之后再回去理解预检请求就轻而易举：
            <span class="line-code">1. Origin。HTTP请求头，任何涉及CORS的请求都必需携带。</span>
            <span class="line-code">2. Access-Control-Request-Method。HTTP请求头，在带预检(Preflighted)的跨域请求中用来表示真实请求的方法。</span>
            <span class="line-code">3.
                Access-Control-Request-Headers。HTTP请求头，在带预检(Preflighted)的跨域请求中用来表示真实请求的自定义Header列表。</span>
            <span class="line-code">4.
                Access-Control-Allow-Origin。HTTP响应头，指定服务器端允许进行跨域资源访问的来源域。可以用通配符*表示允许任何域的JavaScript访问资源，但是在响应一个携带身份信息(Credential)的HTTP请求时，Access-Control-Allow-Origin必需指定具体的域，不能用通配符。</span>
            <span class="line-code">5. Access-Control-Allow-Methods。HTTP响应头，指定服务器允许进行跨域资源访问的请求方法列表，一般用在响应预检请求上。</span>
            <span class="line-code">6. Access-Control-Allow-Headers。HTTP响应头，指定服务器允许进行跨域资源访问的请求头列表，一般用在响应预检请求上。</span>
            <span class="line-code">7.
                Access-Control-Max-Age。HTTP响应头，用在响应预检请求上，表示本次预检响应的有效时间。在此时间内，浏览器都可以根据此次协商结果决定是否有必要直接发送真实请求，而无需再次发送预检请求。</span>
            <span class="line-code">8.
                Access-Control-Allow-Credentials。HTTP响应头，凡是浏览器请求中携带了身份信息，而响应头中没有返回Access-Control-Allow-Credentials:
                true的，浏览器都会忽略此次响应。</span>
        </div>
        <div class="component" id="jwt">
            <h1 align="left">JsonWebToken</h1>
            jwt(JsonWebToken)是什么？网上关于jwt的文章太多了，这里就不误人子弟了。
            看几篇文章就可以建立起对jwt的认识。这里主要讲jwt在LAPBlogs的简单使用，毕竟
            也是看着文档和别人的代码鼓捣的，大佬勿喷。
            <br>
            安装：<span class="code">npm install jsonwebtoken</span>
            <br>
            首先，LAPBlogs是通过登录请求后台派发token，随后大部分前台请求都要在
            HTTP请求的头信息Authorization字段携带token，这就是vue的axios封装拦截请求。
            在nodejs的登录接口：
            <span class="line-code">const express = require("express");</span>
            <span class="line-code">const router = express.Router();</span>
            <span class="line-code">const md5 = require("crypto-js/md5");</span>
            <span class="line-code">const jwt = require("jsonwebtoken");</span>
            <span class="line-code">const key = require("../../config/keys");</span>
            <span class="line-code">const request = require("request");</span>
            <span class="line-code">router.post("/login",(req,res)=>{</span>
            <span class="line-code"> let url = 'http://127.0.0.1:8015/login';</span>
            <span class="line-code"> let password = (md5(req.body.password+key.Salt)).toString();</span>
            <span class="line-code"> let person = {</span>
            <span class="line-code"> email:req.body.email,</span>
            <span class="line-code"> password:password</span>
            <span class="line-code"> };</span>
            <span class="line-code"> request.post({url:url, form: person}, function(err,httpResponse,body){</span>
            <span class="line-code"> if(err){</span>
            <span class="line-code"> return res.json({"status":-2,"msg":"后台出错,请稍后再试!"});</span>
            <span class="line-code"> }else{</span>
            <span class="line-code"> body = JSON.parse(body);</span>
            <span class="line-code"> if(body.status === 1){ //登录成功,分发jwt</span>
            <span class="line-code"> let user = JSON.parse(body.user);</span>
            <strong><span class="line-code"> const rule = {</span>
                <span class="line-code"> id:user._id,</span>
                <span class="line-code"> name:user.name,</span>
                <span class="line-code"> email:user.email,</span>
                <span class="line-code"> };</span></strong>
            <span class="line-code"> let userInfo = {</span>
            <span class="line-code"> temporarySave:user.temporarySave,</span>
            <span class="line-code"> lastLoginTime:user.lastLoginTime,</span>
            <span class="line-code"> userBlogs:user.blog</span>
            <span class="line-code"> }; </span>
            <strong><span class="line-code"> jwt.sign(rule,key.Key,{expiresIn:3600},(err,token)=>{//过期时间为3600秒,一小时</span>
                <span class="line-code"> if(err){</span>
                <span class="line-code"> return res.json({"status":-2,"msg":"后台返回token出错"});</span>
                <span class="line-code"> }else{</span>
                <span class="line-code"> return res.json({"status":1,"msg":"登录成功","userInfo":userInfo,"token":"Bearer "
                    + token});</span>
                <span class="line-code"> }</span>
                <span class="line-code"> });</span></strong>
            <span class="line-code"> }else if(body.status === -3){ //账号未注册,不分发jwt</span>
            <span class="line-code"> return res.json({"status":-1,"msg":"此账号未注册!"});</span>
            <span class="line-code"> }else if(body.status === -4){ //密码错误,不分发jwt</span>
            <span class="line-code"> return res.json({"status":-1,"msg":"密码错误!"});</span>
            <span class="line-code"> }</span>
            <span class="line-code"> }</span>
            <span class="line-code"> })</span>
            <span class="line-code">});</span>
            上面代码的含义：处理前台的登录请求，然后向后台验证用户，若通过验证则向前台派发token。
            <br>
            那么当前台发送携带token的请求，nodejs如何处理？
            这里用到了passport，passport是express框架的一个针对密码的中间件,
            passport用于用户名和密码的验证登陆，passport是使用"策略"来验证请求,
            这里用的策略是passport-jwt。
            <br>
            <span class="line-code">const passport = require("passport");</span>
            <span class="line-code">//passport初始化</span>
            <span class="line-code">app.use(passport.initialize());</span>
            <span class="line-code">require("./config/passport")(passport);</span>
            <br>
            另外新建passport.js，在这里使用passport-jwt，上面require("./config/passport")(passport)的
            "./config/passport"就是这个新建的passport.js。
            <br>
            <span class="line-code">//<a href="https://www.npmjs.com/package/passport-jwt">文档地址:https://www.npmjs.com/package/passport-jwt</a></span>
            <span class="line-code">//passport-jwt是一个针对jsonwebtoken的插件</span>
            <span class="line-code">const JwtStrategy = require('passport-jwt').Strategy;</span>
            <span class="line-code">ExtractJwt = require("passport-jwt").ExtractJwt;</span>
            <span class="line-code">const key = require("./keys");</span>
            <span class="line-code">const request = require("request");</span>
            <span class="line-code">const opts = {};</span>
            <span class="line-code">opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();</span>
            <span class="line-code">opts.secretOrKey = key.Key;</span>
            <span class="line-code">module.exports = (passport)=>{</span>
            <span class="line-code"> passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{</span>
            <span class="line-code"> let url = 'http://127.0.0.1:8015/searchUser';</span>
            <span class="line-code"> request.post({url:url, form: jwt_payload}, function(err,httpResponse,body){</span>
            <span class="line-code"> if(err){ //请求后台出错</span>
            <span class="line-code"> console.log(err);</span>
            <span class="line-code"> return done(err, false);</span>
            <span class="line-code"> }else{</span>
            <span class="line-code"> body = JSON.parse(body);</span>
            <span class="line-code"> if(body.status === 1){ //合法用户</span>
            <span class="line-code"> <strong>return done(null, body);//验证通过，会触发后面的回调函数，回调函数在后面接口定义</strong></span>
            <span class="line-code"> }else if(body.status === -1){ //非法用户，<strong>认证失败后会返回 401 Unauthorized，不会触发后面的回调</strong></span>
            <span class="line-code"> <strong>return done(null, false);</strong></span>
            <span class="line-code"> }</span>
            <span class="line-code"> }</span>
            <span class="line-code"> });</span>
            <span class="line-code"> })</span>
            <span class="line-code"> )</span>
            <span class="line-code">}</span>
            这里用一个接口来说明：
            <span class="line-code">router.post("/temporarySave",passport.authenticate("jwt",{session:false}),(req,res)=>{//<strong>这就是上面说的回调函数</strong></span>
            <span class="line-code"> let blog = {</span>
            <span class="line-code"> "belongTo":req.body.belongTo,</span>
            <span class="line-code"> "title":req.body.title,</span>
            <span class="line-code"> "content":req.body.content,</span>
            <span class="line-code"> };</span>
            <span class="line-code"> let url = 'http://127.0.0.1:8015/temporarySave';</span>
            <span class="line-code"> request.post({url:url, form: blog}, function(err,httpResponse,body){</span>
            <span class="line-code"> body = JSON.parse(body);</span>
            <span class="line-code"> if(body.status === 1){</span>
            <span class="line-code"> res.json({"status":1,"msg":"保存成功!"});</span>
            <span class="line-code"> }else if(body.status === -5){</span>
            <span class="line-code"> res.json({"status":-5,"msg":"请使用post方式请求!"});</span>
            <span class="line-code"> }else if(body.status === -2){</span>
            <span class="line-code"> res.json({"status":-2,"msg":"服务器出错!"});</span>
            <span class="line-code"> }</span>
            <span class="line-code"> })</span>
            <span class="line-code">});</span>
            只有前台携带的jwt是合法为未过期的，nodojs才会向后台请求，否则返回401。
        </div>
        <div class="component" id="route">
            <h1 align="left">路由</h1>
            Express 框架核心特性：可以设置中间件来响应 HTTP 请求。
            <span class="line-code">//路由</span>
            <span class="line-code">const users = require("./routes/api/users");</span>
            <span class="line-code">const blogs = require("./routes/api/blogs");</span>
            <span class="line-code">const quote = require("./routes/api/quote");</span>
            <span class="line-code">const ip = require("./routes/api/ip");</span>
            <span class="line-code">//使用路由中间件</span>
            <span class="line-code">app.use("/api/users",users);//前缀为/api/users的请求被导向users</span>
            <span class="line-code">app.use("/api/blogs",blogs);</span>
            <span class="line-code">app.use("/api/quote",quote);</span>
            <span class="line-code">app.use("/api/ip",ip);</span>
            然后就是在各个文件中处理请求。
        </div>
        <div class="component" id="request">
            <h1 align="left">request</h1>
            与后台通信就是使用request,周下载量挺大的（8位数），安装：<span class="code">npm install request</span>，
            上面的代码已经使用了request。LAPBlogs也就简单使用post和get。
            <br>
            post:
            <span class="line-code">router.post("/insertBlog",passport.authenticate("jwt",{session:false}),(req,res)=>{//插入博客</span>
            <span class="line-code"> let blog = {</span>
            <span class="line-code"> "belongTo":req.body._id,</span>
            <span class="line-code"> "userName":req.body.userName,</span>
            <span class="line-code"> "title":req.body.title,</span>
            <span class="line-code"> "content":req.body.content,</span>
            <span class="line-code"> "type":req.body.type</span>
            <span class="line-code"> };</span>
            <span class="line-code"> let url = 'http://127.0.0.1:8015/insertBlogs';</span>
            <span class="line-code"> request.post({url:url, form: blog}, function(err,httpResponse,body){</span>
            <span class="line-code"> body = JSON.parse(body);</span>
            <span class="line-code"> if(body.status === 1){</span>
            <span class="line-code"> res.json({"status":1,"msg":"上传成功!"});</span>
            <span class="line-code"> }else if(body.status === -5){</span>
            <span class="line-code"> res.json({"status":-5,"msg":"请使用post方式请求!"});</span>
            <span class="line-code"> } </span>
            <span class="line-code"> })</span>
            <span class="line-code">});</span>
            get:
            <span class="line-code">router.get("/requestBlogs",(req,res)=>{ //请求所有博客</span>
            <span class="line-code"> let url = 'http://127.0.0.1:8015/requestBlogs';</span>
            <span class="line-code"> request.get(url, function(error, httpResponse, body){</span>
            <span class="line-code"> if(error){</span>
            <span class="line-code"> return res.json({"msg":"服务器出错",status:-2});</span>
            <span class="line-code"> }else{</span>
            <span class="line-code"> body = JSON.parse(body);</span>
            <span class="line-code"> if(body.status === 1){</span>
            <span class="line-code"> return res.json({"msg":"success","status":1,"blogs":JSON.parse(body.blog)});</span>
            <span class="line-code"> }</span>
            <span class="line-code"> }</span>
            <span class="line-code"> });</span>
            <span class="line-code">})</span>
            这里就举两个例子，详情查看官方文档。
        </div>
        <div class="component" id="others">
            上面基本上就把server.js说完了，还有一些零碎的东西：
            安装body-parser,crypto-js并使用。
            <span class="line-code">//使用body-parser中间件</span>
            <span class="line-code">app.use(bodyParser.urlencoded({extended:false}));</span>
            <span class="line-code">app.use(bodyParser.json());</span>
            crypto-js是用来加密用户密码的：用户密码在前台md5加密一次后在这里加盐后再md5加密，然后传给后台。
            还有测试接口的话可以用postman。对了，这里前台首页还调用了扇贝英语的接口，由于同源策略，在前台直接向
            扇贝的接口请求资源会报跨域错误，但是由于用nodejs的request去请求就不会有这个问题。但是我发现一个有趣的现象：
            在微信小程序中wx.request()请求扇贝接口倒是可以直接请求，然后才知道原来是微信后端拿到wx.request调用的url、用后端请求后端，所以不会有跨域的问题。
        </div>
        <router-link to="/nginx">
            <el-button type="primary" icon="el-icon-d-arrow-left">上一篇(Nginx)</el-button>
        </router-link>
        &nbsp;
        <el-button @click="clickStar" type="primary" icon="el-icon-star-on">{{ star }}</el-button>
        &nbsp;
        <router-link to="/python">
            <el-button type="primary" icon="el-icon-d-arrow-right">下一篇(Python)</el-button>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'nodejs',
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
                        "type": "nodejs",
                        "star": "decrease"
                    });
                } else {
                    this.handleStar({
                        "type": "nodejs",
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
            this.getNumbers("nodejs");
        },
    }
</script>

<style scoped>
    h1 {
        font-size: 2em;
        padding: 10px;
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
    }

    li {
        padding: 5px;
        cursor: pointer;
    }

    li>span {
        display: inline-block;
        min-width: 100px;
    }

    .nginx {
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

    .line-code {
        /* background-color:rgb(66,185,131); */
        background-color: #BEEDC7;
        text-indent: 0;
        padding: 2px 5px 2px 5px;
        display: block;
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