const express = require('express');
const passport = require('passport');
const pbkdf2 = require('crypto');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  const {email, password, name} = req.body;
  try{
    const exUser = await User.findOne({where:{email}});
    if(exUser){
      return res.redirect('/join?error=exist');
    }
    await insertUserInfo(email,password,name);
    res.send('유저 정보 삽입 성공');
  }catch(err){
    console.log(err);
    next(err)
  }
});

const encryprtPassword = async function(password){
  const randomSalt = pbkdf2.randomBytes(32).toString("hex");
  const cryptedPassword = pbkdf2.pbkdf2Sync(password, randomSalt, 65536, 64,"sha512").toString('hex');
  const passwordWithSalt = cryptedPassword + "$" + randomSalt;
  return passwordWithSalt;
}

const insertUserInfo = async(email, password, name) =>{
  const randomSalt = pbkdf2.randomBytes(32).toString("hex");
  const cryptedPassword = pbkdf2.pbkdf2Sync(password, randomSalt, 65536, 64,"sha512").toString('hex');
  const passwordWithSalt = cryptedPassword + "$" + randomSalt;

  User.create({
    email : email,
    password : passwordWithSalt,
    name : name,
  }).then(_ => console.log("created!"))  
};


//중복값을 확인하여 t/f 반환 
router.get('/checkemail',async(req, res) => {
  const email= req.query.email;
  const user = await User.findOne({where: {email:email}});
    if(user){
      res.send('0');
    }else{
      res.send('1');
    }
});


router.post('/login', isNotLoggedIn, async (req, res, next)=>{
  await passport.authenticate('local', (authError, user, info)=>{
    //local 미들웨어가 로컬 로그인 전략 수행
    //성공하거나 실패시 콜백 함수가 실행됨, authError면 실패, 두번째 매개변수가 있으면 성공, 그러면 req.login메서드 실행
    //Passport는 req 객체에 login, logout 메서드를 추가함, req.login은 Passport.serialzeUSer 호출!
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError)=>{
      //req.login이 serializeUser 호출
      if(loginError){
        console.error(loginError);;
        return next(loginError);
      }
      return res.send(true);
    });
  })(req,res,next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

//회원정보 조회
router.get('/info', isLoggedIn, (req, res)=>{
  res.send(req.user);
})

//회원정보 수정
router.patch('/info', async (req, res)=>{
  const {email, password, name} = req.body;
  await modifyUserInfo(email, password, name);
  res.send('0');
});

const modifyUserInfo = async (email,password,name) =>{
  const passwordWithSalt = await encryprtPassword(password);
  await User.update({
      password : passwordWithSalt,
      name : name,
    },{
      where : {email : email}
  });
}

//회원 정보 삭제
router.delete('/info',async(req, res)=>{
  await deleteUserInfo(req.user.email);
  res.send('0');
})

const deleteUserInfo = async(email)=>{
  await User.destroy({
    where: {email : email}
  });
}
//회원 리스트 조회
router.get('/admin', isAdmin, async (req, res, next)=>{
  const userList = await User.findAll({
    attributes : ['email','name','createdAt']
  });
  res.send(userList);
})

module.exports = router;