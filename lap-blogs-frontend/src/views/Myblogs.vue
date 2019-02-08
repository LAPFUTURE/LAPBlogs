<template>
    <div>
        myBlogs
    </div>
</template>

<script>
    export default {
        name: 'myblogs',
        components: {},
        methods: {

        },
        created(){
            if(!this.$store.getters.isAuthenticated){
                this.$message({
                    type:"warning",
                    message:"请先登录",
                    center:true
                });
                this.$router.push("/login");
            }
        }
    }
</script>