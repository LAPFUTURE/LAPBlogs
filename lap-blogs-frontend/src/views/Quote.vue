<template>
    <div class="quote-container">
        <!-- <div :style="{backgroundImage: 'url(' + (img.address) + ')'}" class="img">
        </div> -->
        <img v-bind:src="img.address" alt="" class="img" align="left">
        <div style="align-self: flex-start;">
            <img src="../assets/open.png" alt="这是一张图片" class="open">
            <span style="float: right;padding-top: 40px;">
                    <el-badge :value="value" :max="999" class="item" type="primary">
                        <el-button size="small">浏览数</el-button>
                    </el-badge>
            </span>
            <p class="content">{{ img.content }}</p>
            <div style="display: flex;justify-content: space-between;">
                <p>{{ img.translation }}</p>
                <p>--{{ img.author }}</p>
                
            </div>
            
        </div>
        <!-- <div style="position: absolute;right: 35px;bottom:8vh;">
            <el-badge :value="value" :max="999" class="item" type="primary">
                <el-button size="small">浏览数</el-button>
            </el-badge>
        </div> -->
    </div>
</template>
    
<script>
export default {
    name: 'quote',
    components: {
    },
    data(){
        return {
            img:{
                address:'',
                content:'',
                author:'',
                translation:''
            },
            value:0
        }
    },
    methods:{
        getNumbers(name){
            this.$axios.get(this.host + "/api/ip/ipAccess?type=" + name)
            .then((res)=>{
                if(res.data.status === 1){
                    this.value = res.data.accessTime;
                }else{
                    this.$message({
                        type:"warning",
                        message:"，服务器繁忙,获取浏览数失败!",
                        center:true
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    created(){
        this.getNumbers("quote");
    },
    mounted(){
        this.$axios.get(this.host + "/api/quote/getQuote")
        .then((res)=>{
            let data = res.data.data;
            if(data){
                this.img.content = data.content;
                this.img.address = data.origin_img_urls[0];
                this.img.author = data.author;
                this.img.translation = data.translation;
            }})
        .catch((err)=>{
            console.log(err);
        })
    }
}
</script>

<style scoped>
    .quote-container{
        height:100%;
        display: flex;
        align-items: center;
    }
    .img{
        width:25%;
        min-width:250px;
        margin:25px;
        border-radius: 4px;
    }
    .open{
        width: 50px;
        height:50px;
        margin:25px auto;
    }
    .content{
        padding: 20px;
        min-width: 500px;
    }
</style>
      