const express = require("express");
const http = require("http");
const router = express.Router();
const MD5 = require("crypto-js/md5");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const qs = require("querystring");
const passport= require("passport");
const request = require("request");

router.post("/test",(req,res)=>{
    res.json({psth:"/test",env:8010});
});

router.post("/login",(req,res)=>{
    let url = 'http://127.0.0.1:8015/login';
    let person = {
        email:req.body.email,
        password:req.body.password
    };
    request.post({url:url, form: person}, function(err,httpResponse,body){
        if(err){
            return console.error("error"+error);
        }else{
            body = JSON.parse(body);
            let user =  JSON.parse(body.user);
            if(body.status === "1"){ //登录成功，分发jwt
                const rule = {
                    id:user._id,
                    name:user.name,
                    email:user.email
                };
                jwt.sign(rule,key.Key,{expiresIn:3600},(err,token)=>{
                    if(!err){
                        return res.json({"status":1,"msg":"登录成功","token":"Bearer " + token});
                    }else{
                        return res.json({"status":-2,"msg":"后台返回token出错"});
                    }
                });
            }else if(body.status === "2"){ //账号或密码错误，不分发jwt
                return res.json({"status":-1,"msg":"账号或密码错误"});
            }
        }
    })
});

router.post("/registe",(req,res)=>{
    let url = 'http://127.0.0.1:8015/registe';
    let person = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    };
    
    request.post({url:url, form: person}, function(err,httpResponse,body){
        if(err){
            console.log(err);
            return res.json({"status":-2,"msg":"服务器出错,稍后再试","person":person});
        }else{
            body = JSON.parse(body);
            if(body.status === -1){
                return res.json({"status":-1,"msg":"账号已被注册"});
            }else if(body.status === 1){
                return res.json({"status":1,"msg":"注册成功"});
            }
        }
    });

});
    
    
module.exports = router;