<template>
        <div class="vertical">
            <el-row style="border:1px silver solid;border-radius: 4px;">
                <el-col :span="18" :offset="3">
                        <h1 style="height:80px;line-height: 80px;font-size: 20px;">Login</h1>
                </el-col>
                <el-col :span="18" :offset="3">
                <el-form :model="loginUser" :rules="rules" ref="loginUser" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="loginUser.email"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="loginUser.password" type="password"></el-input>
                        </el-form-item>
                        <el-col :span="24">
                            <router-link to="/registe" class="route-link">
                                没有账号,去注册=>
                            </router-link>
                        </el-col>
                        <el-form-item>
                            <el-button type="primary" size="small" @click="submitForm('loginUser')">登录</el-button>
                            <el-button type="warning" size="small" @click="resetForm('loginUser')">重置</el-button>
                        </el-form-item>
                </el-form>
            </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :span="12" :offset="6">
                    <h1 style="height:40px;line-height: 40px;font-size: 20px;">Login</h1>
                </el-col>
                <el-col :span="12" :offset="6">
                        <span style="height:50px;width: 100%;display: inline-block;"></span>
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
                        <router-link to="/registe" class="route-link">
                            还没有账号,去注册=>
                        </router-link>
                </el-col>
                <el-col :span="12" :offset="6">
                    <el-button type="primary" size="small">登录<i class="el-icon-upload2 el-icon--right"></i></el-button>
                </el-col>
            </el-row> -->
        </div>
</template>
  
<script>
    import jwt_decode from 'jwt-decode';
    export default {
      name: 'home',
      data(){
        return {
                loginUser: {
                    email: "",
                    password: "",
                },
                rules: {
                    email: [{
                        type: "email",
                        required: true,
                        message: "邮箱格式不正确",
                        trigger: "blur"
                    }],
                    password: [{
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    }, {
                        min: 6,
                        max: 30,
                        message: "长度在6-20个字符之间",
                        trigger: "blur"
                    }],
                }
            }
      },
      methods:{
        submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/users/login', this.loginUser)
                            .then((res) => {
                                console.log(res.data.status);
                                if(res.data.status === 1){
                                    let { token } = res.data;
                                    localStorage.setItem('eleToken', token);//存储token
                                    let decoded = jwt_decode(token);//解析token
                                    this.$store.dispatch('setAuthenticated',!this.isEmpty(decoded)); 
                                    this.$store.dispatch('setUser',decoded);
                                    this.$message({
                                        message: '登录成功',
                                        type: 'success'
                                    });
                                    this.$router.push('/write');
                                }else{
                                    this.$message.error('请检查账号或密码');
                                }
                            })
                    }
                })
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            isEmpty(value){
                return(
                    value === undefined || 
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                )
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
  