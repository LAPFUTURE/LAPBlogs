const express = require("express");
const router = express.Router();
const md5 = require("crypto-js/md5");
// const qs = require("querystring");
const passport= require("passport");
const request = require("request");

router.post("/test",(req,res)=>{
    res.json({psth:"/test",env:8010});
});

router.get("/requestBlogs",(req,res)=>{
    let url = 'http://127.0.0.1:8015/requestBlogs';
    request.get(url, function(error, httpResponse, body){
        if(error){
            return res.json({"msg":"服务器出错",status:-2});
        }else{
            body = JSON.parse(body);
            if(body.status === 1){
                return res.json({"msg":"success",
                                  "status":1,
                                  "blogs":JSON.parse(body.blog)});
            }
        }
    });
})

router.post("/userBlogs",passport.authenticate("jwt",{session:false}),(req,res)=>{
    let url = 'http://127.0.0.1:8015/userBlogs';
    console.log(req.body.userBlogs);
    
    let userBlogs = {
        "userBlogs":req.body.userBlogs
    }
    request.post({url:url, form: userBlogs}, function(err,httpResponse,body){
        body = JSON.parse(body);
        console.log(body);
        // if(body.status === 1){
        //     res.json({"status":1,"msg":"上传成功!"});
        // }else if(body.status === -5){
        //     res.json({"status":-5,"msg":"请使用post方式请求!"});
        // }        
    })
    res.json({"msg":"ok","userBlogs":req.body.userBlogs,"status":1,});
})

router.post("/insertBlog",passport.authenticate("jwt",{session:false}),(req,res)=>{
    let blog = {
        "belongTo":req.body._id,
        "userName":req.body.userName,
        "title":req.body.title,
        "content":req.body.content,
        "type":req.body.type
    };
    let url = 'http://127.0.0.1:8015/insertBlogs';
    request.post({url:url, form: blog}, function(err,httpResponse,body){
        body = JSON.parse(body);
        if(body.status === 1){
            res.json({"status":1,"msg":"上传成功!"});
        }else if(body.status === -5){
            res.json({"status":-5,"msg":"请使用post方式请求!"});
        }        
    })
});

router.post("/temporarySave",passport.authenticate("jwt",{session:false}),(req,res)=>{
    let blog = {
        "belongTo":req.body.belongTo,
        "title":req.body.title,
        "content":req.body.content,
    };
    let url = 'http://127.0.0.1:8015/temporarySave';
    request.post({url:url, form: blog}, function(err,httpResponse,body){
        body = JSON.parse(body);
        if(body.status === 1){
            res.json({"status":1,"msg":"保存成功!"});
        }else if(body.status === -5){
            res.json({"status":-5,"msg":"请使用post方式请求!"});
        }else if(body.status === -2){
            res.json({"status":-2,"msg":"服务器出错!"});
        }
    })
});


    
module.exports = router;