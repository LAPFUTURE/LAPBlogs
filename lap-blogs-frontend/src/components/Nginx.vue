<template>
    <div class="nginx">
        <h1>Nginx</h1>
        <ul align="left">
            <li><span><a href="#mean">What is Nginx?</a></span></a></li>
            <li><span><a href="#dowload">下载与安装</a></span> 
                <!-- <a href="http://element-cn.eleme.io/#/zh-CN">官方文档</a> -->
            </li>
            <li><span><a href="#proxy">正向代理和反向代理</a></span></li>
            <li><span><a href="#affect">Nginx在这个网站的作用</a></span></li>
            <li><a href="#others">Others...</a></li>
        </ul>
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
            网上教程遍地开花，所以我就不浪费大家时间了。请根据自家电脑和服务器的系统（linux,windows）自行goole，百度，必应。。。嘻嘻
        </div>
        <div class="component" id="proxy">
            <h1 align="left">正向代理和反向代理</h1>
            既然要学nginx,那么就得知道正向代理和反向代理的意思。因为nginx主要就是干反向代理的。言归正传：<br>
            正向代理：vpn大家都用过吧，它就是正向代理的例子。
        </div>


        <router-link to="/vue">
            <el-button type="primary" icon="el-icon-d-arrow-left">上一篇(Vue)</el-button>
        </router-link>
        &nbsp;
        <router-link to="/nginx">
            <el-button type="primary" icon="el-icon-d-arrow-right">下一篇(NodeJs)</el-button>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'nginx',
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

    #vue {
        border-radius: 4px;
        background: rgb(248, 248, 248);

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
        overflow-x: scroll;
    }
</style>