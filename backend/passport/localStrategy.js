const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pbkdf2 = require('crypto');

const User = require('../models/user');
module.exports = () => {
    passport.use( // 로그인 인증
    new LocalStrategy(
    {
      emailField: "email",
      passwordField: "password",
      session: true,
      passReqToCallback: false,
    },
    async (email, password, done) => {
        try{
            const exUser = await User.findOne({where:email});
            if(exUser){ //유저가 있으면
                //비밀번호 암호화 대조
                const [encrypted , salt] = exUser.password.split("$");
                const givenEncrypted = pbkdf2.pbkdf2Sync(password, salt, 65536, 64, "sha512").toString("hex");
                const result = await userInfoFilteredByID(email);  
                if(givenEncrypted === encrypted){
                    done(null, exUser);
                  }else{
                    done(null, false, {message : '비밀번호가 일치하지않습니다.'});
                  }
                }
        }catch(error){
                console.error(error);
                done(error);
        }    
    }
    )
)};
