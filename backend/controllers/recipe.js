const { sequelize } = require("../models");
const models = require("../models");
const axios = require("axios");
const server = require("../server");
const dotenv = require("dotenv");
const connection = require("../server/mysql");
const _ = require("lodash");
dotenv.config();

const recipe = {
  //레시피 리스트 조회 (진행중)
  getList: async (req, res) => {
    try {
      const result = await getRecipeList(1, 1000);
      const result2 = await getRecipeList(1001, 1500);
      console.log(Object.keys(result).length);
      console.log(result2);
      console.log(Object.keys(result2).length);
      Object.assign(result, result2);
      const total = Object.keys(result).length;
      console.log(total);
    } catch (err) {
      console.error(err);
    }
  },

  //각 레시피 상세 조회
  getRecipe: async (req, res) => {
    const recipeId = req.params.foodCode;
    const url = `https://openapi.foodsafetykorea.go.kr/api/${process.env.RECIPE_APIKEY}/COOKRCP01/json/${recipeId}/${recipeId}/`;
    try {
      const response = await axios.get(url);
      const itemData = response.data.COOKRCP01.row;
      console.log(itemData);
      res.send(itemData);
    } catch (err) {
      console.error(err);
    }
  },

  getRecommendList: (async) => {
    try {
      const date = req.query.date;
      const categoryCode = req.query.category;
      const foodCategory = ["밥", "반찬", "국&찌개", "일품", "기타", "후식"];
      const category = foodCategory[categoryCode];

      const userId = res.locals.user.id;
      const userQuery = `SELECT itemCode FROM UserIngredients WHERE date = ${date} AND userId = ${userId} UNION SELECT itemCode FROM ExistIngredients WHERE userId = ${userId} ORDER BY itemCode`;
      connection.query(userQuery, (error, results) => {
        if (error) {
          return res.status(404).send(error);
        }
        const userItemCodes = _.uniq(
          _.map(results, (el) => {
            return el.itemCode;
          })
        );
        if (userItemCodes.length < 2) {
          return res.status(400).send("최소 2개 이상의 재료를 담아주세요!");
        }
        // TODO. 쿼리에 category 적용 필요
        const totalCountQuery = `SELECT foodCode, COUNT(*) AS total_count FROM Recipes WHERE foodCategory = '${category}' GROUP BY foodCode ORDER BY foodCode;`;
        connection.query(totalCountQuery, (error2, results2) => {
          if (error2) {
            return res.status(404).send(error2);
          }
          const totalCounts = JSON.parse(JSON.stringify(results2));
          const itemCountQuery = `SELECT foodCode, COUNT(*) AS item_count FROM Recipes WHERE itemCode IN (${userItemCodes}) GROUP BY foodCode`;
          connection.query(itemCountQuery, (error3, results3) => {
            if (error3) {
              return res.status(404).send(error3);
            }
            const itemCounts = JSON.parse(JSON.stringify(results3));
            const foods = _.map(
              _.filter(
                _.merge(
                  _.keyBy(totalCounts, "foodCode"),
                  _.keyBy(itemCounts, "foodCode")
                ),
                (el) => {
                  return !_.isNil(el.total_count) && !_.isNil(el.item_count);
                }
              ),
              (el) => {
                el.percent = _.floor((el.item_count / el.total_count) * 100);
                return el;
              }
            );
            const foodCodes = _.map(foods, (food) => {
              return food.foodCode;
            });
            const foodMetadataQuery = `SELECT foodCode, foodName, foodImage, foodIngredient FROM RecipeNutrients WHERE foodCode IN (${foodCodes})`;
            connection.query(foodMetadataQuery, (error4, results4) => {
              if (error4) {
                return res.status(404).send(error4);
              }
              const foodMetadatas = JSON.parse(JSON.stringify(results4));
              const recipes = _.orderBy(
                _.filter(
                  _.merge(
                    _.keyBy(foods, "foodCode"),
                    _.keyBy(foodMetadatas, "foodCode")
                  ),
                  (el) => {
                    return !_.isNil(el.foodCode);
                  }
                ),
                ["percent"],
                ["desc"]
              );
              res.send(recipes);
            });
          });
        });
      });
    } catch (err) {
      console.error(err);
    }
  },
  
  setRecommendList: async (req, res) => {
    const userId = res.locals.user.id;
    const userRecipeList = req.body.recipeList;
    const date = req.body.date;

    for (let i = 0; i < userRecipeList.length; i++) {
      await models.UserRecipe.create({
        userId: userId,
        foodCode: userRecipeList[i],
        date: date,
      });
    }
  },
};
const getRecipeList = async function (startId, endId) {
  try {
    const url = `https://openapi.foodsafetykorea.go.kr/api/${process.env.RECIPE_APIKEY}/COOKRCP01/json/${startId}/${endId}/`;
    const response = await axios.get(url);
    const itemData = response.data.COOKRCP01.row;
    return itemData;
  } catch (err) {
    console.log(err);
  }
};

module.exports = recipe;
