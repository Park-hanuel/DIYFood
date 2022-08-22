const express = require('express');
const router = express.Router();
//해당 라우터 모든 요청에 대해 값 집어넣기
router.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
  })
  
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Hi');
});

module.exports = router;
