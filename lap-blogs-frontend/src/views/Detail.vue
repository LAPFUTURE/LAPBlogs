<template>
    <div class="detail-container">
        <p style="display: flex;justify-content: space-between"><span>{{ insertTime }}</span><span>{{ title }}</span><span>{{
                userName }}</span></p>
        <editor disabled="disabled" v-model="content" api-key="px3f3ogu2ob3hoqc6oiosfldxiju2f4br3s695fd1v4ssvi6"
            v-bind:init="init">
        </editor>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue';
    import { Loading } from 'element-ui';

    export default {
        name: 'detail',
        components: {
            'editor': Editor
        },
        data() {
            return {
                Loading:'',
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
                    if (blog[i]._id.$oid === blogId.$oid) {
                        return blog[i];
                    };
                }
            }
        },
        created() {
            this.Loading = this.$loading({
                lock: true,
                text: '加载中，请稍后!',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            let blogs = this.$store.getters.blog;
            if (this.$route.params.blogType && this.$route.params.blogId) { //页面第一次进入的话
                let purpose = this.findBlog(blogs[this.$route.params.blogType], this.$route.params.blogId);
                this.content = purpose.content;
                this.title = purpose.title;
                this.insertTime = purpose.insertTime;
                this.userName = purpose.userName;
            } else { //转向主页
                this.$router.push("/");
            }
        },
        mounted() {
            let timer = setInterval(()=>{ //将tinymce首部去掉，第一次进入无法找到这个元素，
                //所以用了一下定时器，并且不能用select.style.display="none",因为要在这个元
                //素上有内联样式display才可以通过style获取
                let select = document.querySelector(".detail-container div[class~='mce-top-part']")
                if (select) {
                    select.setAttribute("style", "display:none;");
                    this.Loading.close();
                    clearInterval(timer);
                }
            }, 30);
        }
    }
</script>
<style scoped>
    .detail-container {
        padding: 10px 30px 10px 30px;
        ;
    }
</style>