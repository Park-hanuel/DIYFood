const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();

const models = require('../models');
const { count } = require('../models/user');

//유저 선택 재료 기반 레시피 선정
router.get('/userlist', async function(req, res, next){  
    try{
        res.send(await models.ExistIngredient.findAll({
            attributes : ['itemCode', [sequelize.fn('count', sequelize.col('itemCode')), 'cnt']],
            group: [ 'itemCode' ],
        }));
    }catch(err){
        console.error(err);
    }

})

//레시피 별 재료 갯수 확인
function checkRecipeIngredientCount(){
    models.Recipes.findAll({
        attributes : [foodName, [sequelize.fn('count', sequelize.col('count'))]],
        group: [ foodName ],
    })
    User.findAll({
        attributes: ['field', [sequelize.fn('count', sequelize.col('field')), 'cnt']],
        group: ['field'],
  })
}

module.exports = router;
