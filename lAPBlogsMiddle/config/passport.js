//文档地址:https://www.npmjs.com/package/passport-jwt
//passport-jwt是一个针对jsonwebtoken的插件
const JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require("passport-jwt").ExtractJwt;
const key = require("./keys");
const request = require("request");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.Key;

module.exports = (passport)=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
            // console.log(jwt_payload);
            let url = 'http://127.0.0.1:8015/searchUser';
            request.post({url:url, form: jwt_payload}, function(err,httpResponse,body){
                if(err){ //请求后台出错
                    console.log(err);
                    return done(err, false);
                }else{
                    body = JSON.parse(body);
                    if(body.status === 1){ //合法用户
                        return done(null, body);
                    }else if(body.status === -1){  //非法用户
                        return done(null, false);
                    }
                }
            });
        })
    )
}