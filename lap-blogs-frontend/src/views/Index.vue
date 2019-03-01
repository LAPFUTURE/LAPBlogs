<template>
    <el-container>
        <el-header height="8vh" style="justify-content: space-between">
            <div class="d-flex">
                <router-link to="/">
                    <p class="blog">LAPBlogs</p>
                </router-link>
                <p>
                    <el-input size="small" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search">
                    </el-input>
                </p>
                <p>
                    <el-button icon="el-icon-search" circle size="small" @click="clickSearch"></el-button>
                </p>
            </div>
            <div>
                <div class="d-flex">
                    {{ user }}
                    <el-col :span="12" style="margin:auto 5px;">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item align="center">
                                    <router-link to="/login">
                                        登录
                                    </router-link>
                                </el-dropdown-item>
                                <el-dropdown-item align="center">
                                    <router-link to="/registe">
                                        注册
                                    </router-link>
                                </el-dropdown-item align="center">
                                <el-dropdown-item align="center">
                                    <span @click="loginout">注销</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <img class="avatar" v-bind:src="avatar_addr" alt="" height="20" width="20">
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-openeds="['1', '3']">
                    <router-link to="/">
                        <el-menu-item index="0">
                            <i class="el-icon-menu"></i><span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/write">
                        <el-menu-item index="1">
                            <i class="el-icon-edit"></i><span slot="title">书写</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-setting"></i>技术</template>
                        <el-menu-item-group>
                            <router-link to="/technology/JavaScript">
                                <el-menu-item index="2-1">JavaScript</el-menu-item>
                            </router-link>
                            <router-link to="/technology/NodeJs">
                                <el-menu-item index="2-2">NodeJs</el-menu-item>
                            </router-link>
                            <router-link to="/technology/Php">
                                <el-menu-item index="2-3">Php</el-menu-item>
                            </router-link>
                            <router-link to="/technology/Python">
                                <el-menu-item index="2-4">Python</el-menu-item>
                            </router-link>
                            <router-link to="/technology/Java">
                                <el-menu-item index="2-5">Java</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    </el-submenu>
                    <router-link to="/experience">
                        <el-menu-item index="3">
                            <i class="el-icon-sort"></i><span slot="title">心路</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-more-outline"></i>网站结构</template>
                        <el-menu-item-group>
                            <router-link to="/schema">
                                <el-menu-item index="4-1">
                                    0.图示
                                </el-menu-item>
                            </router-link>
                            <router-link to="/vue">
                                <el-menu-item index="4-2">
                                    1.Vue
                                </el-menu-item>
                            </router-link>
                            <router-link to="/nginx">
                                <el-menu-item index="4-3">
                                    2.Nginx
                                </el-menu-item>
                            </router-link>
                            <router-link to="/nodejs">
                                <el-menu-item index="4-4">
                                    3.NodeJs
                                </el-menu-item>
                            </router-link>
                            <router-link to="/python">
                                <el-menu-item index="4-5">
                                    4.Python
                                </el-menu-item>
                            </router-link>
                            <router-link to="/mongodb">
                                <el-menu-item index="4-6">
                                    5.MongoDB
                                </el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-news"></i>用户</template>
                        <el-menu-item-group>
                            <router-link to="/myblogs">
                                <el-menu-item index="5-1">
                                    <i class="el-icon-document"></i>我的博客
                                </el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main style="padding: 0px;">
                    <div class="box">
                        <router-view></router-view>
                    </div>
                </el-main>
                <el-footer height="8vh">
                    <span v-bind:style="{ color:color }" style="float: left;font-family: PingFang SC;font-size: 0.8em;">学识决定眼界,眼界决定格局,格局决定人生.</span>
                    <span @click="show" style="float: right;cursor: pointer;">Powered By LAPFUTURE</span>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import {
        Message
    } from 'element-ui';
    export default {
        name: 'home',
        data() {
            return {
                color: "#24292e",
                search: '',
                avatar_addr: "https://avatars2.githubusercontent.com/u/37266366?s=40&v=4",
            }
        },
        methods: {
            show() {
                this.color = "white";
            },
            loginout() {
                localStorage.clear();
                this.$store.dispatch("clearCurrentState");
                this.$router.push("/");
            },
            clickSearch() {
                Message.success({
                    message: '尚在开发,敬请期待！',
                    center: true,
                    duration: 2000
                });
            }
        },
        computed: {
            user() {
                return this.$store.getters.user["name"];
            }
        }

    }
</script>
<style>
    .el-header {
        line-height: 8vh;
        display: flex;
        background-color: #24292e;
        color: #fff;
    }

    .el-footer {
        text-align: center;
        line-height: 8vh;
        background-color: #24292e;
        color: #fff;
    }

    .blog {
        width: 180px;
        color: #fff;
    }

    input {
        border-radius: 4px;
    }

    .avatar {
        border-radius: 3px;
        margin: auto;
    }

    .write {
        font-size: 14px;
        color: #303133;
        cursor: pointer;
        padding: 0 20px;
    }

    .d-flex {
        display: flex;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        height: calc(100%-60px);
        line-height: 8vh;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }

    .el-main p {
        border: 1px silver solid;
        padding: 10px;
    }

    .box {
        height: 84vh;
        overflow: scroll;
        scroll-behavior: smooth;
    }

    /*滚动条整体样式*/
    .box::-webkit-scrollbar {
        width: 10px;
        height: 1px;
    }

    /*滚动条滑块*/
    .box::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #303133;
    }

    /*滚动条轨道*/
    .box::-webkit-scrollbar-track {
        border-radius: 10px;
        background: #eee;
    }
</style>