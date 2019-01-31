const express = require("express");
const router = express.Router();
const MD5 = require("crypto-js/md5");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const passport= require("passport");

router.get("/test",(req,res)=>{
    res.json({psth:"/test",env:8010});
})

router.post("/login",(req,res)=>{
    let md5Password =  MD5(MD5(req.body.password) + "lap");
    const rule = {
        id:"user._id",
        name:"user.name",
        avatar:"user.avatar",
        identity:"user.identity"
    };
        jwt.sign(rule,key.Key,{expiresIn:3600},(err,token)=>{
                if(!err){
                    return res.json({"status":1,"msg":"登录成功","token":"Bearer " + token});
                }else{
                    return res.json({"status":-2,"msg":"后台返回token出错"});
                }
            }
        )
    });

module.exports = router;