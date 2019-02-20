<template>
    <div class="mongodb">
        <h1>MongoDb
            <span style="float: right;margin-right:-90px;">
                <el-badge :value="value" :max="999" class="item" type="primary">
                    <el-button size="small">浏览数</el-button>
                </el-badge>
            </span>
        </h1>
        <ul align="left">
            <li><span><a href="#mean">What is MongoDb?</a></span></a></li>
            <li>
                <span><a href="#download">Why is MongoDb?</a></span>
            </li>
            <li><span><a href="#operation">操作MongoDb</a></span></li>
            <li><a href="#others">Others...</a></li>
        </ul>
        <div class="right-bottom">
            <ul>
                <li><span><a href="#mean">What is MongoDb?</a></span></a></li>
                <li>
                    <span><a href="#reason">Why is MongoDb?</a></span>
                </li>
                <li><span><a href="#operation">操作MongoDb</a></span></li>
                <li><a href="#others">Others...</a></li>
            </ul>
        </div>
        <div class="component" id="mean">
            <h1 align="left">What is MongoDb?</h1>
            借用网上对MongoDb的介绍：MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。
            在高负载的情况下，添加更多的节点，可以保证服务器性能。
            MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。
            MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。
            <br>
            安装也是很快很简单，根据自己电脑系统按图索骥。
            <br>
            讲一下个人对mysql和mongodb的使用体验：之前一直使用的是mysql，所以就觉得数据库就应该是
            这样，规规范范，整整齐齐，数据被安排地明明白白,当然缺点就是太整齐了，你想要插入新的字段是不可能的，
            除非改变表的结构。然后对于mongodb就不存在这样的问题，可扩展性高，举个例子：每个用户的购物车里的商品
            的数量，信息是不一样的，这些数据不经常更新，添加和删除居多，这些数据就可以存在MongoDb里。
            据说京东的购物车就是存在MongoDB里，如果不是就当我没说。
        </div>
        <div class="component" id="reason">
            <h1 align="left">Why is MongoDb?</h1>
            照理说，这个小破站使用关系型数据库理应更好，涉及到大量的修改操作，肯定也是mysql比mongodb更快更好。
            选MongoDb的原因主要是：<strong>"为什么要使用MongoDb,因为它就在那里。"</strong>,现在对我而言，
            用它最大的动力是学会使用它了解它，如果一直空谈理论，我啥也不会，虚的一批，<strong>即使只是入门，但我就是入门了，比不入门好许多</strong>,
            如引起不适请自动忽略。
            <br>
            MongoDB每一条记录都有一个_id,这是插入时数据库自动生成的。
            MongoDb的关系表示多个文档之间在逻辑上的相互联系。文档间可以通过嵌入和引用来建立联系。
            嵌入：数据保存在单一的文档中，可以比较容易的获取和维护数据，但数据量不断变大，会影响读写性能。
            引用：通过引用文档的 id 字段来建立关系(像是关系型数据库的使用方式)。
            LAPBlogs使用了嵌入和引用。比如说下面就同时使用了嵌入和引用就是：
            <span class="line-code">{</span>
            <span class="line-code"> "_id":ObjectId("62efc37ad85232f936100007"),</span>
            <span class="line-code"> "type": "php",</span>
            <span class="line-code"> "blogs": [</span>
            <span class="line-code"> {</span>
            <span class="line-code"> "title": "PHP 是世界上最好的语言 ",</span>
            <span class="line-code"> "content": "不服来战！",</span>
            <span class="line-code"> "insertTime": "20190220",</span>
            <span class="line-code"> "comments":[</span>
            <span class="line-code"> ObjectId("62efc37ad85232f936100002"),</span>
            <span class="line-code"> ObjectId("62efc37ad85232f936100003")</span>
            <span class="line-code"> ]</span>
            <span class="line-code"> },</span>
            <span class="line-code"> {</span>
            <span class="line-code"> "title": "PHP 是世界上第二好的语言(谁敢称第一) ",</span>
            <span class="line-code"> "content": "不服来战！",</span>
            <span class="line-code"> "insertTime": "20190220",</span>
            <span class="line-code"> "only":"独有字段"</span>
            <span class="line-code"> "comments":[</span>
            <span class="line-code"> ObjectId("62efc37ad85232f936100004"),</span>
            <span class="line-code"> ObjectId("62efc37ad85232f936100005")</span>
            <span class="line-code"> ]</span>
            <span class="line-code"> }]</span>
            <span class="line-code">}</span>
            使用引用式关系，需要两次查询可以找到所需数据。
        </div>
        <div class="component" id="operation">
            <h1 align="left">操作MongoDb</h1>
            如果想装可视化工具管理MongoDb,可以试试adminmongo，Robomongo，MongoBooster等等。
            如果习惯命令行的话就使用命令行，坏处就是记录多了之后密密麻麻的，看得眼睛累。
            <span class="line-code">查看数据库：show dbs</span>
            <span class="line-code">查看当前连接在哪个数据库下：db</span>
            <span class="line-code">切换数据库：use 数据库名</span>
            <span class="line-code">查看数据表：show collections</span>
            <span class="line-code">在当前数据库删除本数据库：db.dropDatabase() </span>
            <span class="line-code">查看集合（表）：show collections( show tables)</span>
                <span class="line-code">创建集合：db.createCollection(name,options)</span>
                <span class="line-code">删除集合：db.集合名.drop()</span>
                <span class="line-code">往集合里插入记录：db.集合名.inser({})</span>
                <span class="line-code">查看集合里的记录：db.集合名.find()</span>
                <span class="line-code">更新记录：db.集合名.update({ 查询条件 },{ 更新的数据 })，例如：db.lap_blogs.update({
                name:"LAPFUTURE" },{ $set:{name:"LAP"} })</span>
            经常使用的简单操作就是上面这些，高级使用还是得翻官方文档。
        </div>
        <div class="component" id="others">
            这次使用MongoDB不仅仅是学到了如何简单操作MongoDb,
            最大的收获应该是学习到了新的东西，然后对现在的我有了改造。
            一个优秀的人之所以优秀，有一部分因素是旁边的人或物潜移默化地造成了影响。
            我并不是说我是那个优秀的人，但是我会向之前进。
        </div>
        <router-link to="/python">
            <el-button type="primary" icon="el-icon-d-arrow-left">上一篇(Python)</el-button>
        </router-link>
        &nbsp;
        <el-button @click="clickStar" type="primary" icon="el-icon-star-on">{{ star }}</el-button>
        &nbsp;
        <el-button type="primary" icon="el-icon-d-arrow-right" disabled="disabled">下一篇</el-button>
    </div>
</template>
<script>
    export default {
        name: 'mongoDb',
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
                        "type": "mongodb",
                        "star": "decrease"
                    });
                } else {
                    this.handleStar({
                        "type": "mongodb",
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
            this.getNumbers("mongodb");
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

    .mongodb {
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
        width: 110px;
        padding: 0px;
        list-style: none;
        text-align: center;
    }
</style>