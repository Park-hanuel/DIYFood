const router = require('express').Router();
const connection = require('../mysql/mysql_connection')
router.post('/signin', function(req, res, next) {
  res.send('Got a Post request')
  connection.query("select * from user", function(err,result){
    console.log(result);
  });

  // const sql = 'insert into user set ?';
  // connection.query(sql,user, function (error, results) {
  //   if (error) console.log(error);
  //   res.send(results);
  // });
});


/*
passport.use(
  new LocalStrategy(
    {
      emailField: "email",
      passwordField: "password",
      session: true,
      passReqToCallback: false,
    },
    async function (email, password, done) {
      console.log(email, password);
      try {
        const result = await user.findOne({
          where: { email: email, password: password },
        });
        if (!result)
          return done(null, false, { message: "존재하지않는 아이디요" });
        if (email == result.password) {
          return done(null, result);
        } else {
          return done(null, false, { message: "비번틀렸어요" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializeUser ", user);
  done(null, user.user_id);
});

passport.deserializeUser(async function (id, done) {
  console.log("deserializeUser id ", id);
  var userinfo = await user.findOne({
    where: { user_id: id },
  });
  done(null, userinfo);
});

function checkLogin(req, res, next) {
  if (req.user) {
    console.log("login checked");
    next();
  } else {
    console.log("login first");
    res.send("로그인 안하셨는데요?");
  }
}
router.get('/logout', (req, res) => {
    res.send('This is logout page');
});
router.post("/signup", async(req, res)=>{
  const {emial, password, name}=req.body;

  try{
      //간단한 에러 핸들링. username이 중복된 요청이 들어온다든가 하는 경우 에러가 발생함
      const result=await userInfoInsert(username, password);
      res.send("유저 정보 삽입 성공");
  }
  catch(err){
      res.send("에러 발생");
  }
});
*/
module.exports = router;