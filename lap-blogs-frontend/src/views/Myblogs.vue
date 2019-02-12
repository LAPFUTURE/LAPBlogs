<template>
    <div>
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
                    console.log(res.data.blogArray);
                    let blogArray = res.data.blogArray.filter((item)=>{
                        return item.detail === null ? false : true;
                    });//剔掉空值blog
                    this.userBlogs = blogArray.map((item)=>{return item.detail});
                    console.log(this.userBlogs);

                })
                .catch((err)=>{
                    this.userBlogs = [];
                    console.log(err);
                })
            };
        }
    }
</script>