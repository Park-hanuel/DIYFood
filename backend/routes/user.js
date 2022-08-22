const express = require('express');
const passport = require('passport');
const router = express.Router();

const pbkdf2 = require('crypto');

const { isLoggedIn, isNotLoggedIn, isAdmin } = require('./middlewares');
const User = require('../models/user');

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

const insertUserInfo = async(email, password, name) =>{
  const randomSalt = pbkdf2.randomBytes(32).toString("hex");
  const cryptedPassword = pbkdf2.pbkdf2Sync(password, randomSalt, 65536, 64,"sha512").toString('hex');
  const passwordWithSalt = cryptedPassword + "$" + randomSalt;
  console.log(passwordWithSalt);

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
    console.log(user);
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError)=>{
      if(loginError){
        console.error(loginError);;
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req,res,next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});


router.get('/admin', isAdmin, async (req, res, next)=>{
  return await User.findAll({});
})

module.exports = router;