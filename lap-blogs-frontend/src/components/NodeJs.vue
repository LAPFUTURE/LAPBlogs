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
            返回的数据，最后将数据返回给前台。
        </div>
        <router-link to="/nginx">
            <el-button type="primary" icon="el-icon-d-arrow-left">上一篇(Vue)</el-button>
        </router-link>
        &nbsp;
        <router-link to="/python">
            <el-button type="primary" icon="el-icon-d-arrow-right">下一篇(NodeJs)</el-button>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'nodejs',
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
        padding:0px;
        list-style: none;
        text-align: center;
    }
</style>