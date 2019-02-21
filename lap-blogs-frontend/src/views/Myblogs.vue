<template>
    <div>
        <br>
        <h1>我的博客</h1>
        <br>
        <div v-for="blog in userBlogs">
            <router-link :to="{ name: 'myblog', params: { blogId: blog._id}}">
                <div class="blog">
                    <span class="blog-insert-time">{{ blog.insertTime }}</span>
                    <span class="blog-title">{{ blog.title }}</span>
                    <span class="blog-user-name">from {{ blog.userName }}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'myblogs',
        components: {},
        data(){
            return{
                userBlogs:[]
            }
        },
        methods: {
            isLogin(){
                if(!this.$store.getters.isAuthenticated){
                    this.$message({
                        type:"warning",
                        message:"请先登录",
                        center:true
                    });
                    this.$router.push("/login");
                    return false;
                }else{
                    return true;
                }
            }
        },
        created(){
            if(this.isLogin()){
                let userBlogs = this.$store.getters.userInfo.userBlogs;//发送请求获得blog的详细信息
                let sendTo = {
                    userBlogs:userBlogs
                };
                this.$axios.post(this.host + "/api/blogs/userBlogs",sendTo)
                .then((res)=>{
                    let blogArray = [];
                    if(res.data.blogArray){
                        blogArray = res.data.blogArray.filter((item)=>{
                            return item.detail === null ? false : true;
                        });//剔掉空值blog
                        this.userBlogs = blogArray.map((item)=>{return item.detail});
                    }else{
                        this.userBlogs = [];
                    }
                    
                })
                .catch((err)=>{
                    this.userBlogs = [];
                    console.log(err);
                })
            };
        }
    }
</script>
<style scoped>
h1{
    font-size: 2em;
}
.blog{
    display: flex;
    justify-content: space-between;
    background-color:rgb(250,250,250);
    height:50px;
    line-height: 50px;
    color:#24292e;
    width:80%;
    margin: 15px auto;
    border-radius: 4px;
    cursor: pointer;
}
.blog-insert-time{
    margin-left:5px;
}
.blog-user-name{
    margin-right:5px;
}
</style>