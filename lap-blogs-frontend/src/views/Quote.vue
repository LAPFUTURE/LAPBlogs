<template>
    <div class="quote-container">
        <!-- <div :style="{backgroundImage: 'url(' + (img.address) + ')'}" class="img">
        </div> -->
        <img v-bind:src="img.address" alt="" class="img" align="left">
        <div style="align-self: flex-start;">
            <img src="../assets/open.png" alt="这是一张图片" class="open">
            <p class="content">{{ img.content }}</p>
            <div style="display: flex;justify-content: space-between;">
                <p>{{ img.translation }}</p>
                <p>--{{ img.author }}</p>
            </div>
        </div>
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
            }
        }
    },
    mounted(){
        this.$axios.get("/api/quote/getQuote")
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
      