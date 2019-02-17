<template>
    <div class="nginx">
        <h1>Nginx
            <span style="float: right;margin-right:-90px;">
                <el-badge :value="value" :max="999" class="item" type="primary">
                    <el-button size="small">浏览数</el-button>
                </el-badge>
            </span>
        </h1>
        <ul align="left">
            <li><span><a href="#mean">What is Nginx?</a></span></a></li>
            <li>
                <span><a href="#download">下载与安装</a></span> 
            </li>
            <li><span><a href="#proxy">正向代理和反向代理</a></span></li>
            <li><span><a href="#affect">Nginx在这个网站的作用</a></span></li>
            <li><a href="#others">Others...</a></li>
        </ul>
        <div class="right-bottom">
            <ul>
                <li><span><a href="#mean">What is Nginx?</a></span></a></li>
            <li>
                <span><a href="#download">下载与安装</a></span> 
            </li>
            <li><span><a href="#proxy">正向代理和反向代理</a></span></li>
            <li><span><a href="#affect">Nginx在这个网站的作用</a></span></li>
            <li><a href="#others">Others...</a></li>
            </ul>
        </div>
        <div class="component" id="mean">
            <h1 align="left">What is Nginx?</h1>
            <p>
                借用菜鸟教程的一段话：<strong>Nginx("engine x")是一款是由俄罗斯的程序设计师Igor Sysoev所开发高性能
                的 Web和 反向代理 服务器，也是一个 IMAP/POP3/SMTP 代理服务器。
                在高连接并发的情况下，Nginx是Apache服务器不错的替代品。</strong>妈耶，逼格好高啊，
                又是高并发，又是反向代理什么的，感觉好难啊！no，no，no，花点时间看完这篇文章，
                你就是入门了，起码知道做一些简单的配置，可以让网站跑起来。反正我也是入门小菜鸡，
                大家一起学呗，反正大冬天的不学习还能干啥？是吧。<br>
                借用官网的一段话建立起对nginx的整体认识：<strong>Nginx 是一个高性能的 Web 和反向代理服务器, 它具有有很多非常优越的特性:
                作为 Web 服务器：相比 Apache，Nginx 使用更少的资源，支持更多的并发连接，体现更高的效率，这点使 Nginx 尤其受到虚拟主机提供商的欢迎。能够支持高达 50,000 个并发连接数的响应，感谢 Nginx 为我们选择了 epoll and kqueue 作为开发模型.
                作为负载均衡服务器：Nginx 既可以在内部直接支持 Rails 和 PHP，也可以支持作为 HTTP代理服务器 对外进行服务。Nginx 用 C 编写, 不论是系统资源开销还是 CPU 使用效率都比 Perlbal 要好的多。
                作为邮件代理服务器: Nginx 同时也是一个非常优秀的邮件代理服务器（最早开发这个产品的目的之一也是作为邮件代理服务器），Last.fm 描述了成功并且美妙的使用经验。
                Nginx 安装非常的简单，配置文件 非常简洁（还能够支持perl语法），Bugs非常少的服务器: Nginx 启动特别容易，并且几乎可以做到7*24不间断运行，即使运行数个月也不需要重新启动。你还能够在 不间断服务的情况下进行软件版本的升级。</strong>
            </p>
            <p>
                我的使用体验：为什么会用nginx呢?原来我是用apache的，我对apache的体验就是：重！各位大佬不要喷我，小菜鸡的话不要往心里去。
                然后由于nodejs的原因，感觉绕不开nginx, 于是去入个门。不用还好，一用不得了，真香！用下来的第一感觉就是轻便，配置不难，灵活度大。
                建议各位没用nginx的赶紧用用，绝对不亏。虽然我现在也只是菜鸡水平，不过谁不是从菜鸡过来的呢？
                与君共勉，希望我的言语可以起到抛砖引玉的作用，不胜荣幸！
            </p>
        </div>
        <div class="component" id="download">
            <h1 align="left">下载与安装</h1>
            网上教程遍地开花，所以我就不浪费大家时间了。请根据自家电脑和服务器的系统（linux,windows）自行goole，百度，必应。。。嘻嘻。
            安装好后使用下面几条命令简单操作nginx：
            开启nginx:windows:<span class="code">start nginx</span>,linux:<span class="code">nginx</span>;
            退出nginx:<span class="code">nginx -s quit</span>,如果你的是windows，nginx -s quit没有用的话就用.\nginx -s quit试一下;
            重启nginx:<span class="code">nginx -s reload</span>;

        </div>
        <div class="component" id="proxy">
            <h1 align="left">正向代理和反向代理</h1>
            既然要学nginx,那么就得知道正向代理和反向代理的意思。因为nginx主要就是干反向代理的。言归正传：<br>
            正向代理：vpn大家都用过吧，它就是正向代理的例子：
            <br>
            <div class="img">
                <img src="../assets/proxyserver.jpg" alt="">
            </div>
            <br>
            我们无法直接请求到server,需要先请求proxy,然后proxy再请求server,
            server把响应数据返回给proxy,然后proxy再把数据(可能封装了)返回给客户端。
            而我们使用vpn的用途就是访问国外的资源（该资源无法直接请求获得），
            这时vpn起到了就是正向代理的作用。举个例子：比如我们在AWS上买了一个
            在日本的服务器，然后这个服务器是可以访问google的服务的。我们就先
            访问该服务器，然后该服务器再去请求google服务，于是就绕开了墙。
            简言之，<strong>正向代理就是proxy服务器代理的是客户端</strong>，这个例子希望可以帮助你理解正向代理。
            <br>
            然后我们现在讲反向代理：
            <br>
            <div class="img">
                <img src="../assets/reverseproxy.jpg" alt="">
            </div>
            从图中可以看出,<strong>反向代理就是proxy服务器代理的是服务器</strong>。
            服务器们对外提供一个统一的入口，客户端的请求先经过代理服务器，具体客户端访问
            哪个服务器是由nginx控制的。服务器一般组成一个集群，然后nginx负责把请求
            分发给集群，这就是nginx的功能负载均衡。
        </div>
        <div class="component" id="affect">
            <h1 align="left">Nginx在这个网站的作用</h1>
            在讲作用nginx在这个LAPBlogs体现的作用之前，我们先把几段伪代码展示一下：
            <span class="line-code">server{</span>
            <span class="line-code">    listen 80;</span>
            <span class="line-code">    server_name lapBlogs.connectyoume.top;</span>
            <span class="line-code">    location / {</span>
                <span class="line-code">       route html;</span>
                <span class="line-code">       index lapblogs/index.html</span>
                <span class="line-code">    }</span>
            <br>
            <span class="line-code">server{</span>
            <span class="line-code">    listen 80;</span>
            <span class="line-code">    server_name node_api.connectyoume.top;</span>
            <span class="line-code">    location / {</span>
            <span class="line-code">        proxy_pass http://localhost:8010;</span>
            <span class="line-code">    }</span>
            <span class="line-code">}</span>

            这里我们再讲nginx在LAPBlogs这个站点的作用:客户端访问
            lapblogs.connectyoume.top,这个请求匹配的是
            nginx listen 80和server_name lapBlogs.connectyoume.top，
            然后nginx直接返回一个html/lapblogs/index.html(将vue打包后index.html的放在这个路径)，
            之后index.html与后台通信时,发请求给node_api.connectyoume.top，
            这个请求会被代理到http://localhost:8010，比如说：
            http://node_api.connectyoume.top/user/login这个请求会被代理到
            http://localhost:8015/user/login。
        </div>
        <div class="component" id="others">
            <h1 align="left">Others</h1>
            gzip,适配PC或移动设备(根据不同的设备响应不同的文件)，对于错误页面（404，500等）的处理。
            <br>
            对于gzip，apache和nginx都可以配置。
            我的使用体验:gzip简直就是优化利器。我们知道单页面应用的
            一个缺点就是初始化时间长，首屏渲染给用户的体验差一些。
            拿LAPBlogs举例，没开gzip之前，LAPBlogs首屏加载要7秒(可能网速确实太慢)，
            开了gzip之后，在相同网速条件下时间只要1.3秒(虽然还是很长)，但是gzip的效果是
            立竿见影的。在nginx开启gzip是很简单的：只要在nginx.conf中添加如下代码：
            <span class="line-code">gzip  on;#开启gzip</span>
            <span class="line-code">gzip_min_length 1k;#对大于1k的文件进行gzip压缩</span>
            <span class="line-code">gzip_comp_level 7;#压缩等级1-9，越大说明压缩程度越高同时也越消耗服务器资源</span>
            <span class="line-code">gzip_types text/plain application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png image/webp;#要进行压缩的文件格式</span>
            还有一些配置项，但这里也就展开说明上述入门配置。
            <br>
            对于适配，我们知道http的request的headers会携带许多信息，而这里要用到的就是
            user-agent。nginx根据user-agent判断是pc还是移动端，从而将请求处理（或转发或响应不同的文件），由于LAP现在只做好了pc,并且样式还丑，大家凑合着看吧，
            从移动端访问则只有一个静态网页（当然也有可能你手机型号并没有在我的处理名单中，就会翻车）。
            在nginx的nginx.conf文件添加如下配置：
            <span class="line-code">server{</span>
            <span class="line-code">    listen 80;</span>
            <span class="line-code">    server_name  lapBlogs.connectyoume.top;</span>
            <span class="line-code">    location / {</span>
            <span class="line-code">        root   html;</span>
            <span class="line-code">        if ($http_user_agent ~* 'Android|webOS|iPhone|iPod|BlackBerry|mobile|nokia|samsung|htc|huawei') {</span>
            <span class="line-code">            root  mobile;#<strong>如果user-agent是移动端，则让root目录为mobile，跟下面的index连起来就是移动端的响应文件是mobile/lapBlogs/index.html,pc端的响应文件是html/lapBlogs/index.html</strong></span>
            <span class="line-code">        }</span>
            <span class="line-code">        index  lapBlogs/index.html;</span>
            <span class="line-code">    }</span>
            <span class="line-code">    error_page 404 /lapBlogs/index.html;#这里则是让404页面也指向index.html页面，有点偷懒</span>
            <span class="line-code">}</span>
            权限限制，nginx可以控制哪些文件可以被访问;
            <br>
            还有负载均衡，需要定义一个上游服务器集群:
            <span class="line-code">upstream <strong>back_servers</strong>{</span>
            <span class="line-code">    server 127.0.0.1:8001;</span>
            <span class="line-code">    server 127.0.0.1:8002;</span>
            <span class="line-code">    server 127.0.0.1:8003;</span>
            <span class="line-code">}</span>
            <span class="line-code">server{</span>
            <span class="line-code">    listen 80;</span>
            <span class="line-code">    server_name lapblogs.connectyoume.top;</span>
            <span class="line-code">    proxy_pass <strong>http:back_servers</strong></span>
            <span class="line-code">}</span>
            上述代码的意思就是将lapblogs.connectyoume.top的请求由nginx的负载均衡策略分发给服务器们。
            这个策略可以自己调。LAPBlogs这个小网站就没有去弄服务器集群了，
            这破网站都要负载均衡了，那我不得要上天？
        </div>
        
        <router-link to="/vue">
            <el-button type="primary" icon="el-icon-d-arrow-left">上一篇(Vue)</el-button>
        </router-link>
        &nbsp;
        <router-link to="/nodejs">
            <el-button type="primary" icon="el-icon-d-arrow-right">下一篇(NodeJs)</el-button>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'nginx',
        data() {
            return {
                value: 0
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
            }
        },
        created() {
            this.getNumbers("nginx");
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
        margin-right:125px;
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
    .img{
        text-align: center;
    }
    img {
        width:960px;
    }
    .right-bottom{
        font-size:0.8em; 
        position: absolute;
        right: 10px;
        bottom: 8vh;
        background-color:#BEEDC7;
        border-radius: 4px;
    }
    .right-bottom>ul{
        width:110px;
        padding:0px;
        list-style: none;
        text-align: center;
    }
</style>