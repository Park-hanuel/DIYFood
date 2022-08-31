const express = require('express');
const router = express.Router();

const ingredient = require('./ingredient');
const user = require('./user')
const recipe = require('./recipe')

//해당 라우터 모든 요청에 대해 값 집어넣기
router.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
})

router.use('/user', user);
router.use('/ingredient',ingredient);
router.use('/recipe', recipe);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Hi');
});

module.exports = router;
