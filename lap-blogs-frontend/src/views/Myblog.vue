<template>
    <div class="detail-container">
        {{ $route.params.blogId }}
        <p style="display: flex;justify-content: space-between"><span>{{ insertTime }}</span><span>{{ title }}</span><span>{{
                userName }}</span></p>
        <editor disabled="disabled" v-model="content" api-key="px3f3ogu2ob3hoqc6oiosfldxiju2f4br3s695fd1v4ssvi6"
            v-bind:init="init">
        </editor>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue';
    import {
        Loading
    } from 'element-ui';

    export default {
        name: 'myblog',
        components: {
            'editor': Editor
        },
        data() {
            return {
                Loading: '',
                insertTime: '',
                title: '',
                content: '',
                userName: '',
                init: {
                    height: 550,
                }
            }
        },
        methods: {
            findBlog(blog, blogId) { //blog数组类型，blogId:{"$oid":""}
                for (let i = 0, length = blog.length; i < length; i++) {
                    if (blog[i].$oid === blogId.$oid) {
                        console.log(blog[i]);
                        return blog[i];
                    };
                }
            },
            askblog(){
                this.$axios.post(this.host + "/api/blogs/userBlog",{blogId:this.$route.params.blogId.$oid})
                .then((res)=>{
                    console.log(res);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        },
        created() {
            this.askblog();
            this.Loading = this.$loading({
                lock: true,
                text: '加载中，请稍后!',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        },
        mounted() {
            let timer = setInterval(() => { //将tinymce首部去掉，第一次进入无法找到这个元素，
                //所以用了一下定时器，并且不能用select.style.display="none",因为要在这个元
                //素上有内联样式display才可以通过style获取
                let select = document.querySelector(".detail-container div[class~='mce-top-part']")
                if (select) {
                    select.setAttribute("style", "display:none;");
                    this.Loading.close();
                    clearInterval(timer);
                    // console.log(this.$store.getters.userInfo.userBlogs);
                    // let blog = this.findBlog(this.$store.getters.userInfo.userBlogs,this.$route.params.blogId);
                    // console.log("blog",blog);
                    // this.title = ;
                    // this.content = ;
                }
            }, 30);
        }
    }
</script>
<style scoped>
    .detail-container {
        padding: 10px 30px 10px 30px;
    }
</style>