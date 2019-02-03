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
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    };
    request.post({url:url, form: person}, function(err,httpResponse,body){
        if(err){
            return console.error("error"+error);
        }else{
            console.log("body"+body);
            res.json({"msg":"success","data":body.toString()})
        }
    })
    // let person = {
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    // };
    // let content = qs.stringify(person);
    // let options = {
    //     hostname: "127.0.0.1",  
    //     port: 8015,  
    //     path: "/login",  
    //     method: "POST",  
    //     headers: {  
    //         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    //     }  
    // };
    
    // let request = http.request(options,(result)=>{
    //     let body;
    //     result.on('data',function(chunk){
    //         body = chunk;
    //     });
    //     result.on('end',()=>{
    //         // body = qs.parse(body);
    //         console.log(body.toString());
    //         res.json({"msg":"success","data":body.toString()});
    //     })
    // })
    // request.on('error',(e)=>{
    //     console.log("error:"+e);
    // })
    // request.write(content);
});
    
    // let md5Password =  MD5(MD5(req.body.password) + "lap");
    // const rule = {
    //     id:"user._id",
    //     name:"user.name",
    //     avatar:"user.avatar",
    //     identity:"user.identity"
    // };
    //     jwt.sign(rule,key.Key,{expiresIn:3600},(err,token)=>{
    //             if(!err){
    //                 return res.json({"status":1,"msg":"登录成功","token":"Bearer " + token,"req.body":req.body.password});
    //             }else{
    //                 return res.json({"status":-2,"msg":"后台返回token出错"});
    //             }
    //         }
    //     )
    // });

module.exports = router;