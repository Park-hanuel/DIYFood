const express = require('express');
const router = express.Router();

const IngredientController = require('../controllers/ingredient')

//원재료 전일 시세 정보 리스트 제공
router.get('/list', IngredientController.getLiveList);

//새로운 원재료(시세포함) 관련 정보 리스트 제공
router.get('/userlist', IngredientController.getUserList);
router.post('/userlist', IngredientController.setUserList)

router.get('/userexistlist', IngredientController.getUserExistList)

//보유 원재료 관련 정보 리스트 제공
router.get('/existlist', IngredientController.getExistList);
router.post('/existlist', IngredientController.setExistList);
module.exports = router;
