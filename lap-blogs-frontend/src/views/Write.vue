<template>
    <div class="editor">
        <div class="d-title">
            <el-input placeholder="请输入标题" v-model="title">
                <template slot="prepend">标题</template>
            </el-input>
        </div>
        <editor v-model="content" api-key="px3f3ogu2ob3hoqc6oiosfldxiju2f4br3s695fd1v4ssvi6" :init="init">
        </editor>
        <div class="btn-contain">
            <el-dropdown trigger="click" class="margin">
                <span class="el-dropdown-link butt">
                        选择类别<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>JavaScript</el-dropdown-item>
                    <el-dropdown-item>NodeJs</el-dropdown-item>
                    <el-dropdown-item>Php</el-dropdown-item>
                    <el-dropdown-item>Python</el-dropdown-item>
                    <el-dropdown-item>Java</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" size="small" @click="save">保存<i class="el-icon-time el-icon--right"></i></el-button>
            <el-button type="primary" size="small" @click="upload">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
export default {
  name: 'write',
  components: {
    'editor':Editor
  },
  data(){
      return{
        init:{
            height: 380,
            plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
            toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        },
        title:"",
        content:"",
        temporarySave:"",//暂时储存区，每隔30秒储存一次
      }
  },
  methods:{
      save(){
        console.log(123);
      },
      upload(){
        console.log(this.content);
        console.log('/api');
        this.$axios.post("api/users/test",{"content":this.content}).then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
      }

  }
}
</script>

<style scoped>
    .editor{
        padding: 25px 50px 20px 25px;
    }
    .d-title{
        margin-bottom: 15px;
    }
    .margin{
        margin: 0 10px;
    }
    .btn-contain{
        margin-top: 15px;
    }
    .butt{
        line-height: 12px;
        height: 12px;
        padding:9px 15px 9px 15px;
        border: 1px #409EFF solid;
        display: inline-block;
        background-color: #409EFF;
        border-radius: 4px;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
    }
    .butt:hover{
        background-color: rgb(102,177,255);
    }
</style>

  