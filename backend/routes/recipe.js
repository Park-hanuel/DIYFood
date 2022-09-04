const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();
const models = require('../models');
const axios = require('axios');
const server = require('../server');
const dotenv = require('dotenv');
dotenv.config();

//각 레시피 상세 조회 페이지
router.get('/list', async function(req, res){
    const recipeId = req.query.foodCode;
    const url = `https://openapi.foodsafetykorea.go.kr/api/${process.env.RECIPE_APIKEY}/COOKRCP01/json/${recipeId}/${recipeId}/`
    try{
        const response = await axios.get(url);
        const itemData = response.data.COOKRCP01.row;
        console.log(itemData);
        res.send(itemData);
    }catch(err){
        console.error(err);
    }
})


//유저 선택 재료 기반 레시피 선정
router.get('/userlist', async function(req, res, next){  
    try{
        //1.유저 재료 리스트 만들기
        const userId = res.locals.user.id;
        // const userId = 4; 
        const userIngredientList  = [];

        // 기존 재료와 선택 재료 리스트를 합칩니다.
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

        //2. 레시피 별 재료 갯수 확인
        const recipeIngredientCountList = [];
        const recipeIngredientCount = await models.Recipe.findAll({
            attributes : [[sequelize.fn('count', sequelize.col('*')),'count']],
            group: [ 'foodCode' ],
            order: ['foodCode'],
        });


        recipeIngredientCount.forEach((item,idx)=>{
            recipeIngredientCountList.push(item.dataValues.count)
        });

        console.log(recipeIngredientCountList);

        //3. 사용자의 userIngredient list 중 한개라도 포함된 foodCode를 배열로 받아온다.
        foodCodeList =[];
        const query = `select foodCode from Recipes where itemCode in (?) group by foodCode having count(*) >= 4 order by foodCode`;
        const foodCode = await sequelize.query(query, {type: QueryTypes.SELECT, replacements: [uniqueList]});

        foodCode.forEach((item,idx)=>{
            foodCodeList.push(item.foodCode)
        });

        const recipeList =[];

        //foodCodeList.length 
        for(let i = 0 ; i< 100  ; i++){
            const foodItemCode = await models.Recipe.findAll({
                attributes: ['itemCode'],
                where: {foodCode: foodCodeList[i]}
            })
            foodIngredientList = [];
            foodItemCode.forEach((item,idx)=>{
                foodIngredientList.push(item.itemCode)
            });

            let intersectionIngredientList  = uniqueList.filter(x => foodIngredientList.includes(x));

            const percent = (intersectionIngredientList.length/recipeIngredientCountList[foodCodeList[i]]) * 100;

            const foodNut = await models.RecipeNutrient.findOne({
                where: {foodCode : foodCodeList[i]},
            })

            const recipe = {
                foodCode : foodCodeList[i],
                foodName : foodNut.foodName,
                foodImage : foodNut.foodImage,
                foodIngredient : foodNut.foodIngredient,
                intersectionIngredientList : intersectionIngredientList,
                percent : percent,
            }
            recipeList.push(recipe);
            }

            let recipeResult;
            recipeResult = recipeList.sort(function(a,b){
                return b.percent - a.percent;
            });

            res.send(recipeResult);
    }catch(err){
        console.error(err);
    }
})

router.post('/userlist', async function(req, res, next){ 
    const userId = res.locals.user.id;
    const userRecipeList = req.body.recipeList;
    const date = req.body.date;

    for(let i = 0 ; i<userRecipeList.length;i++){
        await models.UserRecipe.create({
            userId : userId,
            foodCode : userRecipeList[i],
            date : date,   
        })
    }
})
module.exports = router;
