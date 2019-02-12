<template>
    <div class="schema" id="schema">
            <h1>LAPBlogs的网站结构</h1>
            <p align="left">前言：感谢各位看官百忙之中抽出时间来看这篇文章，文章<span>从零建站并部署
                上线</span>。当你学完此文章时，那么起码对这个网站会有一个
                <span>整体的认识</span>，并会学习到许多知识，
                这些知识都是我一个一个坑踩出来的，或许对你以后也会有帮助。由于那个是从零开始讲，
                所以一些东西可能对你看来会很简单，但是只要可以让这篇文章可以更好懂的话其它都是次要的。
                文章分为<span>五大块</span>，每一大块蕴含若干知识点。知识点覆盖广且杂，难免有疏漏，
                望各位大佬发现错误及时指出，共同进步。
                话不多说，搬好小板凳，带上瓜子，一起愉快的从零建站！</p>

            <ul align="left">
                <li><a href="/vue">Vue</a></li>
                <li><a href="/nginx">Nginx</a></li>
                <li><a href="/nodejs">NodeJs(Express)</a></li>
                <li><a href="/python">Python(Django)</a></li>
                <li><a href="/mongodb">MongoDB</a></li>
            </ul>
            <img style="width:94%;padding:10px;" src="../assets/architecture.jpg" alt="">
            <p align="left">网站整体结构：我用的是阿里云的学生机，比较便宜100块左右一年，搞个服务器加个域名再备案一下也不会要太多时间。
                阿里云的客服也是很贴心，
                客服小姐姐动不动就打电话问我需不需要帮助，帮助倒是还行，就是缺个女朋友，
                你看阿里云能不能帮忙派发一下。<br>嗯哼，正题：
                服务器上只开放80端口，其它多余的端口不需要，有些系统服务服务器它自己开启了一些端口，比如22，3389。
                我自己目前开放了80和443(https)端口。还有就是端口是要自己手动在云服务器管理控制台开启的。
                端口截图我会放在下面。在nginx的nginx.conf中，
                nginx通过listen端口加server_name来转发请求。下面代码可能不规范但主要可以说明意思就行。
                比如<span class="code">server{listen 80;server_name lapblogs.connectyoume.top;location / {
                        root   html;
                        index  lap_blogs.html;}
                    }</span>，上面代码的意思是指外界通过lapblogs.connectyoume.top:80访问服务器时，
                    nginx会将请求对应到html目录下的lap_blogs.html。上面那个lapblogs.connectyoume.top:80
                    和lapblogs.connectyoume.top是同一个意思。然后我的api端口就是node_api.connectyoume.top,
                    它在nginx的配置要用到代理。nodejs在服务器上监听端口8010，等一下，明明服务器只开放80端口，
                    开放8010外界又访问不到，这个时候就要遇到nginx的代理了<span class="code">server{
                            listen       80;
                            server_name  node_api.connectyoume.top;
                            location / {
                                proxy_pass http://localhost:8010;
                            }
                        }</span>这里就是把请求转发到8010，服务器是可以访问本机端口的。我的nodejs在整个网站的作用是
                        过滤请求和再处理后台返回的数据，没有token的是无法请求到真正的后台的。
                        数据需要nodejs再次请求python后台。python跑在localhost:8015,同样nodejs在localhost:8010可以访问到
                        python后台localhost:8015<strong>也就是说网站这里用到了两次http请求，vue->nodejs->python,
                        一个箭头是一次http请求，所以是两次。nginx的主要作用是分发请求和代理，以及一些其它作用，
                        比如说gzip，访问权限控制等。</strong>整体结构是这样，上面也有一张图。下面就讲每一个大块的细节。
                        还有得把控制台的图贴出来：
            </p>
            <div class="img">
                <img src="../assets/setting.jpg" >
            </div>
            <el-button type="primary" icon="el-icon-d-arrow-left" disabled="disabled">上一篇</el-button>
            &nbsp;
            <router-link to="/vue">
                <el-button type="primary" icon="el-icon-d-arrow-right">下一篇(Vue)</el-button>
            </router-link>
    </div>
</template>
<script>
export default {
    name: 'schema',
}
</script>

<style scoped>
    h1{font-size:2em;
        padding: 10px;
    }
    p{
        text-indent:2em;
    }
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
    .code{
        background-color:rgb(66,185,131);
        text-indent: 0;
        padding:2px 5px 2px 5px;
        margin:2px;
        color: black;
        border-radius: 4px;
        display: inline-block;
    }
    .img{
        overflow-x: scroll;
        overflow-y: hidden;
    }
</style>
  