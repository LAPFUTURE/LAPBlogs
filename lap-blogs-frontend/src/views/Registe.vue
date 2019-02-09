<template>
        <div class="vertical">
            <el-row style="border:1px silver solid;border-radius: 4px;">
                <el-col :span="18" :offset="3">
                        <h1 style="height:50px;line-height: 50px;font-size: 20px;">Registe</h1>
                </el-col>
                <el-col :span="18" :offset="3">
                <el-form :model="registerUser" :rules="rules" ref="registerUser" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="name"><el-input v-model="registerUser.name" aria-placeholder="请输入用户名"></el-input></el-form-item>
                        <el-form-item label="邮箱" prop="email"><el-input v-model="registerUser.email"></el-input></el-form-item>
                        <el-form-item label="密码" prop="password"><el-input v-model="registerUser.password" type="password"></el-input></el-form-item>
                        <el-form-item label="确认密码" prop="password2"><el-input v-model="registerUser.password2" type="password"></el-input></el-form-item>
                        <el-col :span="24">
                                <router-link to="/login" class="route-link">
                                    已有账号,去登录=>
                                </router-link>               
                        </el-col>
                        <el-col :span="24">
                            <el-form-item>
                                <el-button type="primary" size="small" @click="submitForm('registerUser')">注册</el-button>
                                <el-button type="warning" size="small" @click="resetForm('registerUser')">重置</el-button>
                            </el-form-item>
                        </el-col>
                </el-form>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :span="12" :offset="6">
                    <h1 style="height:40px;line-height: 40px;font-size: 20px;">Registe</h1>
                </el-col>
                <el-col :span="12" :offset="6">
                        <span style="height:50px;width: 100%;display: inline-block;"></span>
                </el-col>
                <el-col :span="12" :offset="6">
                    <el-input placeholder="请输入昵称" v-model="name">
                        <template slot="prepend">昵称:</template>
                    </el-input>
                </el-col>
                <el-col :span="12" :offset="6">
                    <span style="height:10px;width: 100%;display: inline-block;"></span>
                </el-col>
                <el-col :span="12" :offset="6">
                    <el-input placeholder="请输入邮箱" v-model="email">
                        <template slot="prepend">邮箱:</template>
                    </el-input>
                </el-col>
                <el-col :span="12" :offset="6">
                    <span style="height:10px;width: 100%;display: inline-block;"></span>
                </el-col>
                <el-col :span="12" :offset="6">
                        <el-input placeholder="请输入密码" v-model="password">
                            <template slot="prepend">密码:</template>
                        </el-input>
                </el-col>
                <el-col :span="12" :offset="6">
                        <span style="height:10px;width: 100%;display: inline-block;"></span>
                    </el-col>
                <el-col :span="12" :offset="6">
                        <el-input placeholder="请再次输入密码" v-model="password">
                            <template slot="prepend">确认密码:</template>
                        </el-input>
                </el-col>
                <el-col :span="12" :offset="6">
                    <router-link to="/login" class="route-link">
                        已有账号,去登录=>
                    </router-link>               
                </el-col>
                <el-col :span="12" :offset="6">
                    <el-button type="primary" size="small">注册<i class="el-icon-upload2 el-icon--right"></i></el-button>
                </el-col>
            </el-row> -->
        </div>
</template>
  
<script>
    import md5 from 'crypto-js/md5';
    export default {
        name: 'home',
        data(){
        let validatePass = (rule,value,callback)=>{
                if(value !==this.registerUser.password){
                    callback(new Error("两次密码输入不一致"));
                }else{
                    callback(); //一定要带这个回调，不然浪费调试时间
                }
            };
            return {
                registerUser:{
                    name:"",
                    email:"",
                    password:"",
                    password2:"",
                },
                rules:{
                    name:[{
                            required:true,
                            message:"用户名不能为空",
                            trigger:"blur"
                        },{
                            min:3,
                            max:20,
                            message:"长度在3-20个字符之间",
                            trigger:'blur'
                        }],
                    email:[{
                            type:"email",
                            required:true,
                            message:"邮箱格式不正确",
                            trigger:"blur"
                        }],
                    password:[{
                            required:true,
                            message:"密码不能为空",
                            trigger:"blur"
                        },{
                            min:6,
                            max:30,
                            message:"长度在6-20个字符之间",
                            trigger:"blur"
                        }],
                    password2:[{
                            required:true,
                            message:"确认密码不能为空",
                            trigger:"blur"
                        },{
                            min:6,
                            max:30,
                            message:"长度在6-20个字符之间",
                            trigger:"blur"
                        },{
                            validator: validatePass,
                            trigger:"blur"
                        }],
                }
            }
      },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        let user = {"email":this.registerUser.email,
                                    "name":this.registerUser.name,
                                    "password":md5(this.registerUser.password).toString()
                                    };
                        this.$axios.post(this.host + '/api/users/registe',user)
                        .then((res) => {
                            console.log(res);
                            if(res.data.status === -1){
                                this.$message({
                                    message:res.data.msg,
                                    type:'warning',
                                    center:true
                                });
                            }else if(res.data.status === 1){
                                this.$message({
                                    message:res.data.msg,
                                    type:'success',
                                    center:true
                                });
                                this.$router.push('/login');
                            }
                        })
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
    .vertical{
        height: 75%;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .route-link{
        display: inline-block;
        font-size: 12px;
        margin:10px 0px 10px 0px;
        float: right;
        color:#409EFF;
        cursor: pointer;
    }
</style>
  