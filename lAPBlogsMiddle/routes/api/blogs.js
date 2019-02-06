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

router.post("/insertBlog",passport.authenticate("jwt",{session:false}),(req,res)=>{
    console.log(req.body);
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