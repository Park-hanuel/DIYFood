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
        const foodName = req.query.foodname;

        // 레시피와 음식 TB UNION
        const query = `
        select foodCode, foodName, manufacturer, servingSize, foodEnergy, foodCarbohydrate, foodProtein, foodFat,foodNatrium
        from Foods
        where foodName like '%${foodName}%'
        union
        select foodCode, foodName, null manufacturer, null servingSize, foodEnergy, foodCarbohydrate, foodProtein, foodFat,foodNatrium
        from RecipeNutrients
        where foodName like '%${foodName}%'
        order by foodCode;
        `;

        connection.query(query, (error, results) => {
            if (error) {
              return res.status(404).send(error);
            }
            const pageNum = Number(req.query.pageNum) || 1;
            const contentSize = 20;
            const pnSize = 5; // NOTE: 페이지네이션 개수 설정.
            const skipSize = (pageNum - 1) * contentSize;

            const totalCount = results.length;
            const pnTotal = Math.ceil(totalCount / contentSize);
            const pnStart = (Math.ceil(pageNum / pnSize) - 1) * pnSize + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호
            let pnEnd = pnStart + pnSize - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
            const pagingFoods = results.slice(
              skipSize,
              skipSize + contentSize
            );

            const result = {
              pageNum,
              pnStart,
              pnEnd,
              pnTotal,
              contents: pagingFoods,
            };

            res.send(result);
        });

    }, 

    //사용자 리스트 조회
    getUserFoodList : async (req, res) => {
        const userId = res.locals.user.id;
        const mealTime = req.body.mealTime;
        const date = req.body.date;

        const foodList = await models.UserMeal.findAll(
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
        const userMeal = req.body;
        //삭제 후 새로 저장
        await models.UserMeal.destroy(
          {where :  { 
            userId : userId,
            date : userMeal.date,
            mealTime : userMeal.mealTime }
        });
    
        //foodCode들로 음식 리스트 찾기 where 조건으로
        // selectCode는 영문 포함 여부로 확인
        for(const food of userMeal.food){
            let selectCode = 0;
            if(isNaN(food.foodCode.charAt(0))){
                selectCode = 1;
            }
            await models.UserMeal.create({
                foodCode : food.foodCode,
                date : userMeal.date,
                mealTime : userMeal.mealTime,
                servingSize : food.servingSize,
                selectCode : selectCode,
                userId : userId
            })
        }
    },

    //식단 일괄 삭제
    deleteUserFoodList : async (req, res) => {
        const userId = res.locals.user.id;
        const mealTime = req.body.mealTime;
        const date = req.body.date;
        await models.UserMeal.destroy(
            { where : {
                userId : userId,
                mealTime : mealTime,
                date : date
            }}
        );
        res.send.status(200);
    }    
};

module.exports = food;
