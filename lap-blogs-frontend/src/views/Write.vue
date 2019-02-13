<template>
    <div class="editor">
        <div class="d-title">
            <el-input placeholder="请输入标题" v-model="temporarySave.title">
                <template slot="prepend">标题</template>
            </el-input>
        </div>
        <div class="tinymce-container">
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
            &nbsp;
            <el-button type="primary" size="small" @click="save">保存<i class="el-icon-time el-icon--right"></i></el-button>
            <el-button type="primary" size="small" @click="upload">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { MessageBox,Loading } from 'element-ui';
export default {
  name: 'write',
  components: {
    'editor':Editor
  },
  data(){
      return{
        Loading:'',
        init:{
            height: 415,
            plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
            toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        },
        temporarySave:{
            title:'',
            content:''
        },//暂时储存区，每隔30秒储存一次
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
        //能进入此页面说明用户已登录
        save(){
            if(this.temporarySave.title){
                if(this.temporarySave.content){
                    let user = this.$store.getters.user;
                    let blog = {
                        "belongTo":user.id.$oid,
                        "title":this.temporarySave.title,
                        "content":this.temporarySave.content
                    };
                    this.$axios.post(this.host + "/api/blogs/temporarySave",blog)
                    .then((res)=>{
                        let message = '';
                        let type = '';
                        switch(res.data.status){
                            case 1:
                                message = "保存成功";
                                type = "success";
                                break;
                            case -2:
                                message = "服务器出错,请稍后再试!";
                                type = "error";
                                break;
                            case -5:
                                message = "请求方式出错!";
                                type = "error";
                                break;
                        }
                        this.$message({
                            message: message,
                            type:type,
                            center:true
                        });
                        let date = new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
                        let userInfo = {
                            "temporarySave":{
                                "title":this.temporarySave.title,
                                "content":this.temporarySave.content,
                                "saveTime":date
                            },
                            "lastLoginTime":localStorage.lastLoginTime
                        };
                        localStorage.setItem('title',userInfo.temporarySave.title);
                        localStorage.setItem('content',userInfo.temporarySave.content);
                        localStorage.setItem('saveTime',userInfo.temporarySave.saveTime);
                        this.$store.commit('SET_USERINFO',userInfo);//维护状态
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                    
                }else{
                    this.$message({
                        message: "请书写内容!",
                        type:"warning",
                        center:true
                    });
                }
            }else{
                this.$message({
                    message: "请书写标题!",
                    type:"warning",
                    center:true
                });
            }
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
                        this.$axios.post(this.host + "/api/blogs/insertBlog",blog).then((res)=>{
                            if(res.data.status === 1){ //上传成功
                                this.$message({
                                    message: res.data.msg,
                                    type:"success",
                                    center:true
                                });
                                this.temporarySave.title = "";
                                this.temporarySave.content = "";
                                this.selectType =  '';
                                MessageBox.confirm('前往首页,继续书写?', '提示',{
                                    confirmButtonText: '前往首页',
                                    cancelButtonText: '继续书写',
                                    type: 'success',
                                    center: true
                                }).then(()=>{ //前往首页
                                    this.$router.push('/');
                                }).catch(()=>{ //留在此页面

                                })

                            }else if(res.data.status === -5){ //上传失败
                                this.$message({
                                    message: res.data.msg,
                                    type:"error",
                                    center:true
                                });
                            }
                        })
                        .catch((error)=>{
                            this.$message({
                                message: "时间已过期，请重新登录!",
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
    },
    created(){
        this.Loading = this.$loading({
            lock: true,
            text: '加载中，请稍后!',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        let userInfo = this.$store.getters.userInfo;
        if(userInfo){
            this.temporarySave.title = userInfo.temporarySave.title === "undefined" ? '' : userInfo.temporarySave.title;
            this.temporarySave.content = userInfo.temporarySave.content === "undefined" ? '' : userInfo.temporarySave.content;
        }
    },
    mounted(){
        let timer = setInterval(()=>{
            let select = document.querySelector(".tinymce-container div[class~='mce-top-part']")
            if (select) {
                this.Loading.close();
                clearInterval(timer);
            }
        }, 30);
        let temporarySaveTimer = setInterval(()=>{
            if(this.$route.path === '/write'){
                this.save();
            }
        }, 360000); //6分钟自动保存一次
    },
    beforeDestory(){
        // console.log(beforeDestory);
    }

}
</script>

<style scoped>
    .editor{
        padding: 25px 50px 20px 25px;
    }
    .tinymce-container{
        min-height: 517px;
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

  