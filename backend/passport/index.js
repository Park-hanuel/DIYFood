const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => { //로그인 시 실행
      done(null, user.email); //에러 발생시 사용, 저장하고 싶은 데이터
    });
    passport.deserializeUser((id, done) => {  //매 요청마다 실행
        User.findOne({
          where: { email },
        })
          .then(user => done(null, user))
          .catch(err => done(err));
      });
    
      local();
};