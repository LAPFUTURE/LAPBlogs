<template>
    <div class="detail-container">
        <p style="display: flex;justify-content: space-between">
            <span style="line-height: 32px;">{{ insertTime }}</span>
            <span style="min-width:50%;">
                <el-input v-model="title" size="small" placeholder="请编辑标题"></el-input>
            </span>
            <span style="line-height: 32px;">{{ userName }}</span>
        </p>
        <div class="editor-container">
            <editor v-model="content" api-key="px3f3ogu2ob3hoqc6oiosfldxiju2f4br3s695fd1v4ssvi6"
                v-bind:init="init">
            </editor>
        </div>
        <br>
        <el-select v-model="selectType" placeholder="请选择文章类型" size="small" class="margin-right">
            <el-option align="center" 
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        &nbsp;
        <!-- <el-button type="primary" size="small" @click="save">保存<i class="el-icon-time el-icon--right"></i></el-button> -->
        <el-button type="primary" size="small" @click="upload">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue';
    import { Loading } from 'element-ui';
    export default {
        name: 'myblog',
        components: {
            'editor': Editor
        },
        data() {
            return {
                loading: '',
                insertTime: '',
                title: '',
                content: '',
                userName: '',
                init: {
                    height: 440,
                    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                    toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        
                },
                type: [{
                    value: 'JavaScript',
                    label: 'JavaScript'
                    }, {
                    value: 'NodeJs',
                    label: 'NodeJs'
                    }, {
                    value: 'Php',
                    label: 'Php'
                    }, {
                    value: 'Python',
                    label: 'Python'
                    }, {
                    value: 'Java',
                    label: 'Java'
                    }],
                    selectType: ''
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
            // save(){
            // },
            upload(){
                let blog = {
                    "blogId":this.$route.params.blogId.$oid,
                    "title":this.title,
                    "content":this.content,
                    "type":this.selectType
                };
                this.$axios.post(this.host + "/api/blogs/editBlog",blog)
                .then((res)=>{
                    let data = res.data;
                    if(data.status === 1){
                        this.$message({
                            message: data.msg,
                            type: "success",
                            center: true
                        });
                        //请求数据并更新本地状态
                        this.$axios.get(this.host + "/api/blogs/requestBlogs")
                            .then((res) => {
                                this.$store.commit("SET_BLOG",res.data.blogs);
                            }).catch((error) => {
                                this.$message({
                                    message: "出错了,请稍后再试!",
                                    type: "error",
                                    center: true
                                });
                            });
                    }else if(data.status === -2){
                        this.$message({
                            message: data.msg,
                            type: "error",
                            center: true
                        })
                    }else if(data.status === -5){
                        this.$message({
                            message: data.msg,
                            type: "error",
                            center: true
                        })
                    };

                }).catch((error)=>{
                    console.log(error);
                })
            },
            askblog(){
                this.$axios.post(this.host + "/api/blogs/userBlog",{blogId:this.$route.params.blogId.$oid})
                .then((res)=>{
                    let data = res.data;
                    if(data.status === 1){
                        this.insertTime = data.blog.insertTime;
                        this.title = data.blog.title;
                        this.userName = data.blog.userName;
                        this.content = data.blog.content;
                        this.selectType = data.blog.type;
                    }else if(data.status === -2){
                        this.$message({
                            message: data.msg,
                            type: "error",
                            center: true
                        })
                    }else if(data.status === -5){
                        this.$message({
                            message: data.msg,
                            type: "error",
                            center: true
                        })
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        },
        created() {
            this.askblog();
            
        },
        mounted() {
            this.loading = Loading.service({
                lock: true,
                text: '加载中,请稍后!',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let timer = setInterval(()=>{ //将tinymce首部去掉，第一次进入无法找到这个元素，
                //所以用了一下定时器，并且不能用select.style.display="none",因为要在这个元
                //素上有内联样式display才可以通过style获取
                let select = document.querySelector(".detail-container div[class~='mce-top-part']")
                if (select) {
                    // select.setAttribute("style", "display:none;");
                    this.loading.close();
                    clearInterval(timer);
                }
            }, 30);
        }
    }
</script>
<style scoped>
    .detail-container {
        padding: 10px 30px 10px 30px;
    }
    .editor-container{
        min-height:540px;
    }
</style>