(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8e3a4a7c"],{"0eb5":function(e,t,s){"use strict";var r=s("2cc4"),a=s.n(r);a.a},"2cc4":function(e,t,s){},a55b:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"vertical"},[s("el-row",{staticStyle:{border:"1px silver solid","border-radius":"4px"}},[s("el-col",{attrs:{span:18,offset:3}},[s("h1",{staticStyle:{height:"80px","line-height":"80px","font-size":"20px"}},[e._v("Login")])]),s("el-col",{attrs:{span:18,offset:3}},[s("el-form",{ref:"loginUser",staticClass:"demo-ruleForm",attrs:{model:e.loginUser,rules:e.rules,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[s("el-input",{model:{value:e.loginUser.email,callback:function(t){e.$set(e.loginUser,"email",t)},expression:"loginUser.email"}})],1),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{attrs:{type:"password"},model:{value:e.loginUser.password,callback:function(t){e.$set(e.loginUser,"password",t)},expression:"loginUser.password"}})],1),s("el-col",{attrs:{span:24}},[s("router-link",{staticClass:"route-link",attrs:{to:"/registe"}},[e._v("\n                        没有账号,去注册=>\n                    ")])],1),s("el-form-item",[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.submitForm("loginUser")}}},[e._v("登录")]),s("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(t){e.resetForm("loginUser")}}},[e._v("重置")])],1)],1)],1)],1)],1)},a=[],o=s("a4bb"),i=s.n(o),l=s("7618"),n=(s("6b54"),s("cadf"),s("551c"),s("097d"),s("04e1")),c=s.n(n),m=s("72fe"),u=s.n(m),p={name:"home",data:function(){return{loginUser:{email:"",password:""},rules:{email:[{type:"email",required:!0,message:"邮箱格式不正确",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"},{min:6,max:30,message:"长度在6-20个字符之间",trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var s={email:t.loginUser.email,password:u()(t.loginUser.password).toString()};t.$axios.post("/api/users/login",s).then(function(e){if(1===e.data.status){var s=e.data,r=s.token,a=s.userInfo;localStorage.setItem("eleToken",r),localStorage.setItem("title",a.temporarySave.title),localStorage.setItem("content",a.temporarySave.content),localStorage.setItem("saveTime",a.temporarySave.saveTime),localStorage.setItem("lastLoginTime",a.lastLoginTime);var o=c()(r);t.$store.dispatch("setAuthenticated",!t.isEmpty(o)),t.$store.dispatch("setUser",o),t.$store.commit("SET_USERINFO",a),t.$message({message:"登录成功",type:"success",center:!0}),t.$router.push("/")}else-1===e.data.status&&t.$message({message:e.data.msg,type:"error",center:!0})})}})},resetForm:function(e){this.$refs[e].resetFields()},isEmpty:function(e){return void 0===e||null===e||"object"===Object(l["a"])(e)&&0===i()(e).length||"string"===typeof e&&0===e.trim().length}}},g=p,d=(s("0eb5"),s("2877")),f=Object(d["a"])(g,r,a,!1,null,"2d19c10c",null);t["default"]=f.exports}}]);