const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();
const models = require('../models');
const axios = require('axios');
const server = require('../server');
const dotenv = require('dotenv');
const { QueryTypes } = require('sequelize');
dotenv.config();

//레시피 리스트 조회 페이지 (진행중)
router.get('/alllist', async function(req, res){
    try{
        const result = await getRecipeList(1,1000);
        const result2 = await getRecipeList(1001,1500);
        console.log( Object.keys(result).length);
        console.log(result2);
        console.log(Object.keys(result2).length)
        Object.assign(result,result2);
        const total = Object.keys(result).length;
        console.log(total);
    }catch(err){
        console.error(err);
    }
})

const getRecipeList = async function(startId, endId){
    try{
        const url = `https://openapi.foodsafetykorea.go.kr/api/${process.env.RECIPE_APIKEY}/COOKRCP01/json/${startId}/${endId}/`;
        const response = await axios.get(url);
        const itemData = response.data.COOKRCP01.row;
        return itemData;
    }catch(err){
        console.log(err);
    }
}

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
        const date = req.query.date;
        const category = req.query.category;

        const foodCategory =  ['밥', '반찬', '국&찌개', '일품', '기타', '후식'];
        //1.유저 재료 리스트 만들기
        const userId = res.locals.user.id;
        const userIngredients  = [];

        // 기존 재료와 선택 재료 리스트를 합칩니다.
        const userQuery = `select itemCode from UserIngredients where date = ${date} AND userId = ${userId} union select itemCode from ExistIngredients where userId = ${userId}`;
        const userList = await sequelize.query(userQuery);

        userList[0].forEach((item,idx)=>{
            userIngredients.push(item.itemCode);
        });
        
        if(userIngredients.length < 2){
            res.send('최소 2개 이상의 재료를 담아주세요!');
        }
        userIngredients.sort();

        //2. 레시피 별 재료 갯수 확인
        const recipeIngredientCountList = [];
        const recipeIngredientCount = await models.Recipe.findAll({
            attributes : [[sequelize.fn('count', sequelize.col('*')),'count']],
            where: { foodCategory : foodCategory[category]},
            group: [ 'foodCode' ],
            order: ['foodCode'],
        });


        recipeIngredientCount.forEach((item,idx)=>{
            recipeIngredientCountList.push(item.dataValues.count)
        });

        //3. 사용자의 userIngredient list 중 2개 이상 포함된 foodCode를 배열로 받아온다.
        foodCodeList =[];
        const query = `select foodCode from Recipes where itemCode in (?) AND foodCategory = '${foodCategory[category]}' group by foodCode having count(*) >= 2 order by foodCode`;
        const foodCode = await sequelize.query(query, {type: QueryTypes.SELECT, replacements: [userIngredients]});

        foodCode.forEach((item,idx)=>{
            foodCodeList.push(item.foodCode)
        });

        if(foodCodeList.length == 0){
            res.send('레시피를 찾을 수 없습니다.재료를 더 추가해주세요.')
        }
        const recipeList =[];

        //foodCodeList.length 
        for(let i = 0 ; i< foodCodeList.length ; i++){
            const foodItemCode = await models.Recipe.findAll({
                attributes: ['itemCode'],
                where: {foodCategory : foodCategory[category],
                        foodCode: foodCodeList[i]}
            })
            foodIngredientList = [];
            foodItemCode.forEach((item,idx)=>{
                foodIngredientList.push(item.itemCode)
            });

            let intersectionIngredientList  = userIngredients.filter(x => foodIngredientList.includes(x));

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
            if(recipeResult == null){
                res.send('일치하는 레시피가 없습니다!');
            }else{
                res.send(recipeResult);
            }

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
