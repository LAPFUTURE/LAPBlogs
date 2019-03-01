<template>
    <div class="python">
        <h1>Python
            <span style="float: right;margin-right:-90px;">
                <el-badge :value="value" :max="999" class="item" type="primary">
                    <el-button size="small">浏览数</el-button>
                </el-badge>
            </span>
        </h1>
        <ul align="left">
            <li><span><a href="#mean">What is Django?</a></span> <a href="https://docs.djangoproject.com/zh-hans/2.0/"><el-button type="primary" size="mini">官方文档</el-button></a></li>
            <li><span><a href="#reason">Why is Django?</a></span></li>
            <li><span><a href="#route">路由</a></span></li>
            <li><span><a href="#operation">操作MongoDB</a></span><a href="http://api.mongodb.com/python/current/api/pymongo/"><el-button type="primary" size="mini">官方文档</el-button></a></li>
            <li><a href="#others">Others...</a></li>
        </ul>
        <div class="right-bottom">
            <ul>
                <li><span><a href="#mean">What is Django?</a></span></li>
                <li><span><a href="#reason">Why is Django?</a></span></li>
                <li><span><a href="#route">路由</a></span></li>
                <li><span><a href="#operation">操作MongoDB</a></span></li>
                <li><a href="#others">Others...</a></li>
            </ul>
        </div>
        <div class="component" id="mean">
            <h1 align="left">What is Django?</h1>
            <p>
                Python下有许多款不同的 Web 框架。Django是重量级选手中最有代表性的一位。许多成功的网站和APP都基于Django。
                Django是一个开放源代码的Web应用框架，由Python写成。Django采用了MVC的软件设计模式，即模型M，视图V和控制器C。
            </p>
            <br>
            <p>
                由于Django是要跑在python环境下的，所以还是要先安装好python，然后使用pip install django。安装整体上挺简单的，但具体安装还是看文档吧，
                Django+Uwsgi+Nginx是常用技术栈，要是有时间和兴趣的还是可以鼓捣一下。
            </p>
            <br>
            <P>
                许多有名的框架都是基于mvc的，我使用过的是ThinkPhp5和Django,如果有一些框架使用经验应该会更好入门。
                其实如果只是入个门的话两个小时就可以参照文档写个小东西。反正<strong>一开始学习一个新东西</strong>我的理念就是：<strong>只求会用，不求甚解</strong>。
                因为对于新手而言，没必要一开始就钻研内部原理，先会用熟悉之后，过了新手期再慢慢攀登,再回去理解是事半功倍的。所以这只是我的个人理解，大佬勿喷。引起不适请自动忽略。
            </P>
            <br>
            <P>
                我对ThinkPhp5和Django的使用体验是Django比tp5更轻。并且他们一开始都是做模板渲染的，
                但是我这里只是用django做后台专门处理请求，所以理解或许有失偏颇。这个后台你用java,php,nodejs,python来做都无所谓，
                原生或框架都随个人喜欢。
            </P>
        </div>
        <div class="component" id="reason">
            <h1 align="left">Why is Django?</h1>
            <P>个人使用过(菜鸡哪里敢写熟悉!)的后台语言和后台框架是:
                <br>
                    php->ThinkPhp5,虽然也有段时间没写了，但对php的熟练程度还是大于python，所以为什么没有选择php做LAPBlogs的后台呢？
                <br>
                    nodejs->Express，由于本来就是搞前端的，js看家本领不得磨练磨练？不然怎么去搬砖？
                <br>
                    python->Django,写LAPBlogs之前：花了几个小时入门django然后又花一个周末写了个django模板渲染的小网站作为python期末作业，这里要感谢老师
                    还给了80分，之后同学碰到了关于django的问题，我又帮忙写了几个页面和几个接口。这就是我使用django的所有经验。所以说，<strong>不要怂，直接干！官方文档一把梭!</strong>。大佬请无视。
                <br>
                <span style="text-decoration: line-through;">java</span>,虽然是学了这个，但没有拿来写东西，所以很虚，所以还是忽略吧。
            </P>
            <br>
            <p>
                由于对于python和django有了一点点理解，所以就想巩固一下，
                所以就没有选择熟练程度更高一些的php作为后台，现在感觉php又不会写了。。。
                平时技术栈是使用vue+apache+php+mysql的，但这次用的是vue+nginx+express+python+mongodb,
                虽然开发速度比不上用熟悉的技术栈,但毕竟可以学新东西，之间过程虽然不好走，但有收获就行，与君共勉。
            </p>
        </div>
        <div class="component" id="route">
            <h1 align="left">路由</h1>
            <p>
                在settings.py文件中有一个ROOT_URLCONF设置，设置的是在访问网址时通过哪一个url文件去匹配所请求的网址;
                然后就是在urls.py设置路由处理请求。然后我在项目目录下新建一个blog_api文件夹，在这个文件夹下要新建一个__init__.py,
                表示这是一个包，里面可以什么都不写，但必须要有这个文件。在这个文件夹下再新建处理请求的文件。
            </p>
            <br>
            <p>urls.py处理http请求:</p>
            <textarea disabled="disabled">
            from django.conf.urls import url
            from .blog_api import users #引入blog_api这个包下的users.py
            urlpatterns = [
             url(r'^login$', users.login), #users.py的login函数处理该请求
            ]
            </textarea>
            <p>
                题外话，如果是处于不同的域的,浏览器直接请求django，也会发生跨域，这个时候也要pip install django-cors-headers,
                然后在setting.py添加下面配置=>链接：<a href="https://blog.csdn.net/liuanpingfirst/article/details/86684029">之前写的关于django处理跨域和403的博客</a>,这里也对预检请求有设置，
                前面在讲NodeJs时就讲了处理预检请求，这里如果直接作为后台也要对此进行处理。
            </p>
            <br>
            <p>由于在LAPBlogs中是nodejs请求django，所以这里不会涉及到跨域的问题。
            </p>
        </div>
        <div class="component" id="operation">
            <h1 align="left">操作MongoDB</h1>
            <p>
                首先要有取舍，Django有一个Django Admin管理工具，这就相当于它有一个后台数据库管理界面了，可以便捷管理数据。
                Django 对各种数据库提供了很好的支持，包括：PostgreSQL、MySQL、SQLite、Oracle。Django 为这些数据库提供了统一的调用API。
                也就是说使用MongoDB是没有Django admin管理工具的，自己取舍吧。不过好像有个django-mongonaut<a href="https://django-mongonaut.readthedocs.io/en/latest/index.html#features"><el-button type="primary" size="mini">官方文档</el-button></a>的包重写了django的admin模块，
                但仅限于mongodb的使用,由于我也没有用过这个，不知道具体效果如何。首先<span class="code">pip install pymongo</span>,然后在需要使用MongoDB的地方引入并连接数据库，下面是例子:
            </p>
            <textarea disabled="disabled">
                import pymongo
                mongo_client = pymongo.MongoClient(host="127.0.0.1",port=27017)
                LAPBlogs = mongo_client["lap_blogs"]
                Blogs = LAPBlogs['blogs']
                Users = LAPBlogs['users']
            </textarea>
            <p>
                又是愉快的增删改查(CURD)时间了。下面是简单的例子，具体的复杂操作可以查看官方文档。
            </p>
            <br>
            <p>
            <strong>查询:</strong>利用find_one()或find()方法进行查询，其中find_one()查询得到的是单个结果，find()则返回一个生成器对象。
            </p>
            <span class="line-code">blog = Blogs.find_one(ObjectId(userBlogsId))#根据ObjectId查询</span>
            <span class="line-code">users = Users.find({'age': {'$gt': 20}})#查询age>20</span>
            另外也可以使用正则
            <br>
            <strong>插入:</strong>使用insert_one()和insert_many()方法来分别插入单条记录和多条记录,
            insert_one()返回的是InsertOneResult对象，可以调用其inserted_id属性获取_id；insert_many()返回的是InsertManyResult，
            调用inserted_ids属性可以获取插入数据的_id列表。
            <span class="line-code">user = {</span>
            <span class="line-code"> "email":"1314@qq.com",</span>
            <span class="line-code"> "name":"LAPFUTURE",</span>
            <span class="line-code"> "password":789</span>
            <span class="line-code">}</span>
            <span class="line-code">result = Users.insert_one(user)</span>
            <span class="line-code">print(result.inserted_id)</span>
            <br>
            <span class="line-code">user1 = {"name":"user1"}</span>
            <span class="line-code">user2 = {"name":"user2"}</span>
            <span class="line-code">result = Users.insert_many([user1,user2])</span>
            <span class="line-code">print(result.inserted_ids)</span>
            <strong>更新:</strong>update_one()方法和update_many()方法,返回结果是UpdateResult类型。
            <span class="line-code">user = Users.find_one({'name': 'LAPFUTURE'})</span>
            <span class="line-code">user['age'] = 18</span>
            <span class="line-code">result = Users.update_one({'name': 'LAPFUTURE'}, {'$set': user})</span>
            <br>
            <span class="line-code">result = Blogs.update_many({'type': "python"}, {'$set': {'star':
                999}})#将所有类型为python的博客的star置为999</span>
            <strong>删除:</strong>delete_one()和delete_many(),delete_one()会删除第一条符合条件的数据，delete_many()会删除所有符合条件的数据。
            它们的返回结果都是DeleteResult类型。可以使用deleted_count属性来获取删除的数据条数。
            <span class="line-code">result = Users.delete_one({'name': 'LAPFUTURE'})</span>
            <span class="line-code">print(result)</span>
            <span class="line-code">print(result.deleted_count)</span>
            <br>
            <span class="line-code">result = Blogs.delete_many({'type: "python"})</span>
            <span class="line-code">print(result.deleted_count)</span>
            上面都是简单的操作方法，还有排序，计数等等，大家可以查看文档。
        </div>
        <div class="component" id="others">
            <h1 align="left">Others</h1>
            就是做到现在，压根就没有怎么使用Django的大部分功能，所以说实在是太菜了。希望以后可以慢慢发掘Django的功能，
            这点半吊子实在不够看。我想起一句话：<strong>弱水三千，只取一瓢饮</strong>。为什么只取一瓢，因为自己目前就只能装那么多啊，哎，好好努力！
        </div>
        <router-link to="/nodejs">
            <el-button type="primary" icon="el-icon-d-arrow-left">上一篇(NodeJs)</el-button>
        </router-link>
        &nbsp;
        <el-button @click="clickStar" type="primary" icon="el-icon-star-on">{{ star }}</el-button>
        &nbsp;
        <router-link to="/mongodb">
            <el-button type="primary" icon="el-icon-d-arrow-right">下一篇(MongoDB)</el-button>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'python',
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
                        "type": "python",
                        "star": "decrease"
                    });
                } else {
                    this.handleStar({
                        "type": "python",
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
            this.getNumbers("python");
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
        color:rgb(245,245,245);
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