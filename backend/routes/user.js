const express = require('express');
const passport = require('passport');
const pbkdf2 = require('crypto');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('./middlewares');
const models = require('../models');
const { RecipeNutrient } = require('../models');
const sequelize = require("sequelize");
const router = express.Router();

const Op = sequelize.Op;

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  const {email, password, name} = req.body;
  try{
    const exUser = await models.User.findOne({where:{email}});
    if(exUser){
      return res.redirect('/join?error=exist');
    }
    await insertUserInfo(email,password,name);
    res.send('유저 email 삽입 성공');
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

  await models.User.create({
    email : email,
    password : passwordWithSalt,
    name : name,
  });
  console.log("created!") ; 
};


//중복값을 확인하여 t/f 반환 
router.get('/checkemail',async(req, res) => {
  const email= req.query.email;
  if(email !== undefined){
    const user = await models.User.findOne({where: {email:email}});
    if(user){
      res.send('0');
    }else{
      res.send('1');
    }
  }else{
    res.send('fail');
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
      return res.send(info.message);
    }
    return req.login(user, (loginError)=>{
      //req.login이 serializeUser 호출
      if(loginError){
        console.error(loginError);;
        return next(loginError);
      }
      console.log('login suscess');
      return res.send({user:user});
    });
  })(req,res,next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  req.session.destroy(()=>{
    res.clearCookie('connect.sid');
  });
});

//회원정보 조회
router.get('/info', isLoggedIn, (req, res)=>{
  res.send(res.locals.user);
})

//회원정보 수정
router.patch('/info', async (req, res)=>{
  try{
    const {email, password, name} = req.body;
    await modifyUserInfo(email, password, name);
    res.send('0');
  }catch(err){
    res.send(err.message);
  }
});

const modifyUserInfo = async (email,password,name) =>{
  const passwordWithSalt = await encryprtPassword(password);
  await models.User.update({
      password : passwordWithSalt,
      name : name,
    },{
      where : {email : email}
  });
}

//회원 정보 및 전체 정보 삭제
router.delete('/info',async(req, res)=>{
  const id = req.user.email;
  await deleteAllInfo(id); 
  res.send('0');
})

const deleteAllInfo = async(email)=>{
  const user = await models.User.findOne({
    where: {email:email}
  })
  await models.ExistIngredient.destroy({
    where: {userId : user.id}
  })
  await models.UserIngredient.destroy({
    where: {userId : user.id}
  })
  await models.UserRecipe.destroy({
    where: {userId : user.id}
  })
  await models.User.destroy({
    where: {email : email}
  });
}

//회원 리스트 조회
router.get('/admin', isAdmin, async (req, res, next)=>{
  const userList = await models.User.findAll({
    attributes : ['email','name','createdAt']
  });
  res.send(userList);
})

//회원 월별 식단 리스트 제공
router.get('/recipelist',  async (req, res, next)=>{
  const userId = res.locals.user;
  const month = req.query.month;
  const recipeList = await models.UserRecipe.findAll({
    include: [
      {
        model: RecipeNutrient,
        attributes: ['foodImage', 'foodName']
      }
    ],
    where: {userId : userId,
          date: {[Op.like]: `%${month}%`}} 
  })
  res.send(recipeList);
})

//사용자 식단 삭제
router.delete('/recipelist',async (req, res, next)=>{
  const userId = res.locals.user;
  const date = req.query.date;
  await models.UserRecipe.destroy({
    where: {
      userId : userId,
      date: date} 
  })
  res.status(200);
})

//사용자 레시피 삭제
router.delete('/recipe',async (req, res, next)=>{
  const userId = res.locals.user;
  const date = req.query.date;
  const foodCode = req.query.foodCode;

  await models.UserRecipe.destroy({
    where: {
      userId : userId,
      date: date,
      foodCode : foodCode
    }
  })
  res.status(200);
})
module.exports = router;