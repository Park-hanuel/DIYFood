const express = require('express');
const passport = require('passport');
const router = express.Router();

const pbkdf2 = require('crypto');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
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
router.get('/checkemail/:email',async function(req, res) {
  const email= req.body.email;
  connection.query('select email from user where email=?', email, (error, rows,fields) => {
    let checkEmail = false;
    if(rows.length == 0){
      checkEmail = true;
    }
    
    res.send(checkEmail);
    
  });
});

router.post('/login', isNotLoggedIn, (req, res, next)=>{
  passport.authenticate('local', (authError, user, info)=>{
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

module.exports = router;