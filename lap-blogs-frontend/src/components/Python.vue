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

            <router-link to="/mongodb">
                <el-button type="primary" icon="el-icon-d-arrow-left">上一篇(NodeJs)</el-button>
            </router-link>
            &nbsp;
            <el-button @click="clickStar" type="primary" icon="el-icon-star-on">{{ star }}</el-button>
            &nbsp;
            <router-link to="/mongodb">
                <el-button type="primary" icon="el-icon-d-arrow-right">下一篇(Vue)</el-button>
            </router-link>
        </div>
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

    p {
        text-indent: 2em;
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

    .code {
        background-color: rgb(66, 185, 131);
        text-indent: 0;
        padding: 2px 5px 2px 5px;
        margin: 2px;
        color: black;
        border-radius: 4px;
        display: inline-block;
    }

    .img {
        text-align: center;
    }

    img {
        width: 960px;
    }
</style>