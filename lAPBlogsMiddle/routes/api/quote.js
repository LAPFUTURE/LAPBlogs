const express = require("express");
const router = express.Router();
const request = require("request");


router.get("/getQuote",(req,res)=>{
    let url = 'https://rest.shanbay.com/api/v2/quote/quotes/today/';
    
    request.get(url, function(error, httpResponse, body){
        if(error){
            return res.json({"status":-2,"msg":"后台出错,请稍后再试!"});
        }else{
            body = JSON.parse(body);
            return res.json({"status":1,"msg":"请求每日一句成功!","data":body.data});
        }
    });
});
    
module.exports = router;