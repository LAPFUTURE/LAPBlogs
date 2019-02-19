const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/ipAccess",(req,res)=>{
    let url = 'http://127.0.0.1:8015/ipAccess';
    let headers = req.headers;
    let ip = {
        "origin":headers.origin || "no origin",
        "referer":headers.referer,
        "user-agent":headers["user-agent"],
        "type":req.query.type
    }
    request.post({url:url, form: ip}, function(err,httpResponse,body){
        body = JSON.parse(body);
        if(body.status === 1){
            res.json({"status":1,"msg":"请求成功!","accessTime":body.accessTime,"star":body.star});
        }else if(body.status === -5){
            res.json({"status":-5,"msg":"请使用post方式请求!"});
        }else if(body.status === -2){
            res.json({"status":-2,"msg":"服务器出错!"});
        }        
    })
});

router.post("/addStar",(req,res)=>{
    let url = 'http://127.0.0.1:8015/addStar';
    // console.log(req.body);
    request.post({url:url, form: req.body}, function(err,httpResponse,body){
        body = JSON.parse(body);
        if(body.status === 1){
            res.json({"status":1,"msg":"addStar成功!",});
        }else if(body.status === -5){
            res.json({"status":-5,"msg":"请使用post方式请求!"});
        }else if(body.status === -2){
            res.json({"status":-2,"msg":"服务器出错!"});
        }        
    })
})

router.post("/handleStar",(req,res)=>{
    let url = 'http://127.0.0.1:8015/handleStar';
    request.post({url:url, form: req.body}, function(err,httpResponse,body){
        body = JSON.parse(body);
        if(body.status === 1){
            res.json({"status":1,"msg":body.message,"starNumbers":body.starNumbers});
        }else if(body.status === -5){
            res.json({"status":-5,"msg":"请使用post方式请求!"});
        }else if(body.status === -2){
            res.json({"status":-2,"msg":"服务器出错!"});
        }        
    })
})

module.exports = router;