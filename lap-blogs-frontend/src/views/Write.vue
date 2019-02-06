<template>
    <div class="editor">
        <div class="d-title">
            <el-input placeholder="请输入标题" v-model="temporarySave.title">
                <template slot="prepend">标题</template>
            </el-input>
        </div>
        <div style="min-height: 479.8px;">
            <editor v-model="temporarySave.content" api-key="px3f3ogu2ob3hoqc6oiosfldxiju2f4br3s695fd1v4ssvi6" :init="init">
            </editor>
        </div>
        <div class="btn-contain" >
            <!-- <el-dropdown trigger="click" class="margin">
                <span class="el-dropdown-link butt">
                    选择类别<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item align="center">JavaScript</el-dropdown-item>
                    <el-dropdown-item align="center">NodeJs</el-dropdown-item>
                    <el-dropdown-item align="center">Php</el-dropdown-item>
                    <el-dropdown-item align="center">Python</el-dropdown-item>
                    <el-dropdown-item align="center">Java</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
            <el-select v-model="selectType" placeholder="请选择文章类型" size="small">
                <el-option align="center" 
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
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
        temporarySave:{title:'',content:''},//暂时储存区，每隔30秒储存一次
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
    methods:{
        save(){
            console.log(123);
        },
        upload(){
            if(this.temporarySave.title){
                if(this.temporarySave.content){
                    if(this.selectType){
                        // 用户的_id,用户的name,文章content,文章title,文章type,
                        let user = this.$store.getters.user
                        let blog = {
                            "_id" : user.id.$oid,
                            "userName": user.name,
                            // "temporarySave":{"title":this.temporarySave.title,"content":this.temporarySave.content},
                            "title":this.temporarySave.title,
                            "content":this.temporarySave.content,
                            "type":this.selectType
                        };
                        this.$axios.post("api/blogs/insertBlog",blog).then((res)=>{
                            console.log(res);
                            if(res.data.status === 1){
                                this.$message({
                                    message: res.data.msg,
                                    type:"success",
                                    center:true
                                });
                            }else if(res.data.status === -5){
                                this.$message({
                                    message: res.data.msg,
                                    type:"error",
                                    center:true
                                });
                            }
                        })
                        .catch((error)=>{
                            console.log(error);
                            this.$message({
                                message: "出错了,请稍后再试!",
                                type:"error",
                                center:true
                            });
                        })
                    }else{
                        this.$message({
                            message: "请选择类型!",
                            type:"warning",
                            center:true
                        });
                    }
                }else{
                    this.$message({
                        message: "内容不能为空!",
                        type:"warning",
                        center:true
                    });
                }
            }else{
                this.$message({
                    message: "标题不能为空!",
                    type:"warning",
                    center:true
                });
            }
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

  