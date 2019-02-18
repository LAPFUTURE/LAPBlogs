const express = require("express");
const router = express.Router();
const md5 = require("crypto-js/md5");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const request = require("request");

router.post("/test",(req,res)=>{
    res.json({psth:"/test",env:8010});
});

router.post("/login",(req,res)=>{
    let url = 'http://127.0.0.1:8015/login';
    let password = (md5(req.body.password+key.Salt)).toString();
    let person = {
        email:req.body.email,
        password:password
    };
    request.post({url:url, form: person}, function(err,httpResponse,body){
        if(err){
            return res.json({"status":-2,"msg":"后台出错,请稍后再试!"});
        }else{
            body = JSON.parse(body);
            if(body.status === 1){ //登录成功,分发jwt
                let user =  JSON.parse(body.user);
                const rule = {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                };
                let userInfo = {
                    temporarySave:user.temporarySave,
                    lastLoginTime:user.lastLoginTime,
                    userBlogs:user.blog
                }; 
                jwt.sign(rule,key.Key,{expiresIn:3600},(err,token)=>{//过期时间为3600秒,一小时
                    if(err){
                        return res.json({"status":-2,"msg":"后台返回token出错"});
                    }else{
                        return res.json({"status":1,"msg":"登录成功","userInfo":userInfo,"token":"Bearer " + token});
                    }
                });
            }else if(body.status === -3){ //账号未注册,不分发jwt
                return res.json({"status":-1,"msg":"此账号未注册!"});
            }else if(body.status === -4){ //密码错误,不分发jwt
                return res.json({"status":-1,"msg":"密码错误!"});
            }
        }
    })
});

router.post("/registe",(req,res)=>{
    let url = 'http://127.0.0.1:8015/registe';
    let password = (md5(req.body.password+key.Salt)).toString(); //前台传过来的已md5加密一次，加盐后再md5加密
    let person = {
        name:req.body.name,
        email:req.body.email,
        password:password
    };
    request.post({url:url, form: person}, function(err,httpResponse,body){
        if(err){
            console.log(err);
            return res.json({"status":-2,"msg":"服务器出错,请稍后再试!"});
        }else{
            body = JSON.parse(body);
            if(body.status === -1){
                return res.json({"status":-1,"msg":"账号已被注册!"});
            }else if(body.status === 1){
                return res.json({"status":1,"msg":"注册成功!"});
            }
        }
    });
});
    
module.exports = router;