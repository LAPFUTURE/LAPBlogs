const JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require("passport-jwt").ExtractJwt;
const key = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.Key;

module.exports = (passport)=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
                
            }
        )
    )
}