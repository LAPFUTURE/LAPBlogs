const express = require("express");
const http = require('http');
const port = 8010;
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
//passport是express框架的一个针对密码的中间件

//路由
const users = require("./routes/api/users");
const blogs = require("./routes/api/blogs");
const quote = require("./routes/api/quote");
const ip = require("./routes/api/ip");

//CORS设置
app.all('*', function(req, res, next) {
    if(req.headers.origin === "http://127.0.0.1:8081" || req.headers.origin === "http://lapblogs.connectyoume.top"){  
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    res.header("Access-Control-Allow-Headers", "*");  //服务器允许请求中携带任意字段
    res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS");  //服务器允许客户端使用 POST,GET 和 OPTIONS 方法发起请求。
    res.header("Content-Type", "application/json;charset=utf-8");
    next();  
});

app.get("/",(req,res)=>{//测试接口
    http.get("http://127.0.0.1:8015/registe",(result)=>{
        result.on('data', function (data) {
            data = JSON.parse(JSON.parse(data.toString()));
            res.json({"msg":"success","data":data});
        });
    });
})

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//使用路由中间件
app.use("/api/users",users);
app.use("/api/blogs",blogs);
app.use("/api/quote",quote);
app.use("/api/ip",ip);

//passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);

app.listen(port,()=>{
    console.log(`Server is running in ${port}`);
})