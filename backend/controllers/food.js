const models = require("../models");
const axios = require("axios");
const dotenv = require("dotenv");
const sequelize = require("sequelize");
const connection = require("../server/mysql");
const Op = sequelize.Op;
dotenv.config();

const food = {
    //검색어로 검색하여 리스트 반환
    // @TODO 페이징 기능 구현 
    getFoodList : async (req, res) => {
        const foodName = req.body.foodname;

        // 레시피와 음식 TB UNION
        const query = `
        select foodCode, foodName, manufacturer, foodEnergy, foodCarbohydrate, foodProtein, foodFat,foodNatrium
        from Foods
        where foodName like '%${foodName}%'
        order by foodCode
        union
        select foodCode, foodName, null manufacturer, foodEnergy, foodCarbohydrate, foodProtein, foodFat,foodNatrium
        from RecipeNutrients
        where foodName like '%${foodName}%
        order by foodCode';
        `;

        connection.query(query, (error, results) => {
            if (error) {
              return res.status(404).send(error);
            }
            res.send(results);
        });

        // return Value : Array of 
        // {
        //     "foodcode": "D000378",
        //     "foodname": "잣죽",
        //     "manufacturer" : null,
        //     "foodenergy": 874,
        //     "foodcarbohydrate": 155,
        //     "foodprotein": 19,
        //     "foodfat": 20,
        //     "foodnatrium": 879
        // }
    }, 

    //사용자 리스트 조회
    getUserFoodList : async (req, res) => {
        const userId = res.locals.user.id;
        const mealTime = req.body.mealTime;
        const date = req.body.date;

        const foodList = await models.Usermeal.findAll(
            { where : {
                userId : userId,
                mealTime : mealTime,
                date : date
            }}
        );
        res.send(foodList);
    },

    //사용자 리스트 저장 또는 업데이트
    setUserFoodList :async (req, res) => {
        const userId = res.locals.user.id;
       
        //front에서 받을 값
        // userMeal []
        //     date : date,
        //     mealTime : mealTime,
        //     foods : [{
        //         foodCode : foodCode,
        //         servingSize : servingSize
        //     },
        //     ..]
        // }
        const userMeal = req.body.userMeal;
        
        //삭제 후 새로 저장
        await models.Usermeal.destroy(
          {where :  { 
            userId : userId,
            date : userMeal.date,
            mealTime : userMeal.mealTime }
        });
    
        //foodCode들로 음식 리스트 찾기 where 조건으로
        // selectCode는 영문 포함 여부로 확인
        for(food of userMeal.food){
            const selectCode = 0;
            if(isNaN(food.foodCode.charAt(0))){
                select = 1;
            }
            await models.Usermeal.create({
                foodCode : foodCode,
                date : userMeal.date,
                mealTime : userMeal.mealTime,
                servingSize : food.servingSize,
                selectCode : selectCode,
                userId : userId
            })
        }
    },

    //식단 일괄 삭제
    deleteFoodList : async (req, res) => {
        const userId = res.locals.user.id;
        const mealTime = req.body.mealTime;
        const date = req.body.date;
        await models.Usermeal.destroy(
            { where : {
                userId : userId,
                mealTime : mealTime,
                date : date
            }}
        );
    }    
};

module.exports = food;
