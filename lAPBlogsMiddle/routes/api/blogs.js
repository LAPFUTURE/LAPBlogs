const express = require("express");
const router = express.Router();
const md5 = require("crypto-js/md5");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const http = require("http");
// const qs = require("querystring");
const passport= require("passport");
const request = require("request");

router.post("/test",(req,res)=>{
    res.json({psth:"/test",env:8010});
});

router.post("/insertBlog",passport.authenticate("jwt",{session:false}),(req,res)=>{
    console.log(req.body);
    let blog = {
        "belongTo":req.body._id,
        "userName":req.body.userName,
        "title":req.body.title,
        "content":req.body.content,
        "type":req.body.type
    };
    request.post({url:url, form: blog}, function(err,httpResponse,body){
        
    })
    res.json({"status":1,"msg":"success!",body:req.body});
});

// router.post("/registe",(req,res)=>{
//     let url = 'http://127.0.0.1:8015/registe';
//     let password = (md5(req.body.password+key.Salt)).toString(); //前台传过来的已md5加密一次，加盐后再md5加密
//     let person = {
//         name:req.body.name,
//         email:req.body.email,
//         password:password
//     };
//     request.post({url:url, form: person}, function(err,httpResponse,body){
//         if(err){
//             console.log(err);
//             return res.json({"status":-2,"msg":"服务器出错,请稍后再试!"});
//         }else{
//             body = JSON.parse(body);
//             if(body.status === -1){
//                 return res.json({"status":-1,"msg":"账号已被注册!"});
//             }else if(body.status === 1){
//                 return res.json({"status":1,"msg":"注册成功!"});
//             }
//         }
//     });
// });
    
module.exports = router;