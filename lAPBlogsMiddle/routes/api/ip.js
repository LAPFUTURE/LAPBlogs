const express = require("express");
const router = express.Router();
const request = require("request");


router.get("/quote",(req,res)=>{
    let url = 'http://127.0.0.1:8015/ipQuote ';;
    let headers = req.headers;
    let ip = {
        "origin":headers.origin || "no origin",
        "referer":headers.referer,
        "user-agent":headers["user-agent"],

    }
    request.post({url:url, form: ip}, function(err,httpResponse,body){
        body = JSON.parse(body);
        console.log(body);
        // if(body.status === 1){
        //     res.json({"status":1,"msg":"上传成功!"});
        // }else if(body.status === -5){
        //     res.json({"status":-5,"msg":"请使用post方式请求!"});
        // }        
        res.json({"status":1,"msg":"ip ok","ip":ip});
    })

    
});
    
module.exports = router;