const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();

const models = require('../models');

router.get('/test', async function(req, res, next){
//  레시피 별 재료 갯수 확인 오류나는 중 ㅠ
        const recipeIngredientCountList = [];
        const recipeIngredientCount = await models.Recipe.findAll({
            attributes : [[sequelize.fn('count', sequelize.col('foodCode')),'count']],
            group: [ 'foodCode' ],
            order: ['foodCode'],
        });

        recipeIngredientCountList.sort();
        console.log(recipeIngredientCount[1].dataValues.count);

});

//유저 선택 재료 기반 레시피 선정
router.get('/userlist', async function(req, res, next){  
    try{
        //1.유저 재료 리스트 만들기
        //const userId = res.locals.user.id;
        const userId = 6;
        const userIngredientList  = [];

        
        const userList = await models.UserIngredient.findAll({
            attributes : [sequelize.fn('DISTINCT', sequelize.col('itemCode')), 'itemCode'],
            where: { userId : userId },
        });
        const existList = await models.ExistIngredient.findAll({
            attributes : ['itemCode'],
            where: { userId : userId },
        });

        userList.forEach((item,idx)=>{
            userIngredientList.push(item.itemCode)
        });
        existList.forEach((item,idx)=>{
            userIngredientList.push(item.itemCode)
        });

        const userListSet = new Set(userIngredientList);
        const uniqueList = [...userListSet];
        uniqueList.sort();

        //레시피 별 재료 갯수 확인 오류나는 중 ㅠ
        const recipeIngredientCountList = [];
        const recipeIngredientCount = await models.Recipe.findAll({
            attributes : [[sequelize.fn('count', sequelize.col('foodCode')),'count']],
            group: [ 'foodCode' ],
            order: ['foodCode'],
        });

        recipeIngredientCount.forEach((item,idx)=>{
            recipeIngredientCountList.push(item.dataValues.count)
        });
        console.log(recipeIngredientCountList);

        //사용자의 userIngredient list 중 한개라도 포함된 foodCode를 배열로 받아온다.
        foodCodeList =[];
        const foodCode = await models.Recipe.findAll({
            attributes: [sequelize.fn('DISTINCT', sequelize.col('foodCode')), 'foodCode'],
            where: {itemCode: uniqueList}
        })
        foodCode.forEach((item,idx)=>{
            foodCodeList.push(item.foodCode)
        });

        for(let i = 0 ; i< 2 ; i++){
            const foodItemCode = await models.Recipe.findAll({
                attributes: ['itemCode'],
                where: {foodCode: foodCodeList[i]}
            })
            foodIngredientList = [];
            foodItemCode.forEach((item,idx)=>{
                foodIngredientList.push(item.itemCode)
            });

            let intersectionIngredientList  = uniqueList.filter(x => foodIngredientList.includes(x));

            const persent = (intersectionIngredientList.length/10) * 100;

            console.log(persent)

            //db 수정 후 진행 예정
            // const foodNut = await models.RecipeNutrient.findOne({
            //     where: {foodCode : foodCodeList[i]},
            // })

            // console.log(foodNut.foodName);

            // const recipe = {
            //     foodName : foodName,
            //     foodImageURL : foodImageURL,
            //     foodIngredient : foodIngredient,
            //     intersectionIngredientList : intersectionIngredientList,
            //     persent : persent,
            // }
            // }


        //각 음식별로 
        //res.send(uniqueList);

        //res.send(list[0]);
        // 응답 데이터
        // {
        //     "foodName": "칼륨 듬뿍 고구마죽",
        //     "count": 2
        // },
        // {
        //     "foodName": "누룽지 두부 계란죽",
        //     "count": 6
        // },

        // res.send(await models.ExistIngredient.findAll({
        //     attributes : ['itemCode', [sequelize.fn('count', sequelize.col('itemCode')), 'cnt']],
        //     group: [ 'itemCode' ],
        // }));
        }
    }catch(err){
        console.error(err);
    }
})

//레시피 별 재료 갯수 확인
async function checkIngredientCount(){
    try{
        const recipeCount = await models.Recipe.findAll({
            attributes : [[sequelize.fn('count', sequelize.col('foodCode')),'count']],
            group: [ 'foodCode' ],
            order: ['foodCode'],
        })
        res.send(recipeCount)
        const userCount = await models.ExistIngredient.findAll({
            attributes : ['foodName', [sequelize.fn('count', sequelize.col('foodName')), 'count']],
            group: [ 'foodName' ],
        });
        // 응답 데이터
        // {
        //     "foodName": "칼륨 듬뿍 고구마죽",
        //     "count": 2
        // },
        // {
        //     "foodName": "누룽지 두부 계란죽",
        //     "count": 6
        // },
        
 
    }catch(err){
        console.error(err);
    }
}

module.exports = router;
