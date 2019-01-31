const express = require("express");
const http = require('http');
const port = process.env.PORT || 8010;
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

// //路由
const users = require("./routes/api/users");
// const profile = require("./routes/api/profile");
// const food = require("./routes/api/food");

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "*");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("Content-Type", "application/json;charset=utf-8");
    next();  
});

app.get("/",(req,res)=>{
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
// app.use("/api/profile",profile);
// app.use("/api/food",food);

//passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);


app.listen(port,()=>{
    console.log(`Server is running in ${port}`);
})