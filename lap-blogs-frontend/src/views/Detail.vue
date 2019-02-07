<template>
    <div class="detail-container">
        <h1 style="padding:20px;">{{ title }}</h1>
        <editor disabled="disabled" v-model="content" api-key="px3f3ogu2ob3hoqc6oiosfldxiju2f4br3s695fd1v4ssvi6" v-bind:init="init">
        </editor>
    </div>
</template>

<script>
// @ is an alias to /src
import Editor from '@tinymce/tinymce-vue';

export default {
    name: 'detail',
    components: {
        'editor':Editor
    },
    data(){
        return {
            title:'',
            content:'lalla',
            init:{
                height: 550,
                plugins: 'link',
                toolbar: 'bold',
        }
        }
    },
    methods:{
        findBlog(blog,blogId){ //blog数组类型，blogId:{"$oid":""}
            for(let i = 0,length = blog.length; i < length; i++){
                if(blog[i]._id.$oid === blogId.$oid){
                    return blog[i];
                }; 
            }
        }
    },
    created(){
        let blogs = this.$store.getters.blog;
        let purpose = this.findBlog(blogs[this.$route.params.blogType],this.$route.params.blogId);
        console.log(purpose);
        this.content = purpose.content;
        this.title = purpose.title;
    },
    mounted(){
        let timer = setInterval(function(){ //将首部去掉，第一次进入无法找到这个元素，
            //所以用了一下定时器，并且不能用select.style.display="none",因为要在这个元
            //素上有内联样式display才可以通过style获取
            let select = document.querySelector(".detail-container div[class~='mce-top-part']")
            if(select){
                select.setAttribute("style","display:none;");
                window.clearInterval(timer);
            }
        },30);
    }
}
</script>
<style scoped>
    .detail-container{
        padding: 10px 30px 10px 30px;;
    }
</style>
    