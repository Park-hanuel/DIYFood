const { Op } = require("sequelize");
const models = require('../models');
const connection = require("../server/mysql");

const dietanalysis = {
    getUserInfo: async (req, res) => {
        try {
            const userId = res.locals.user.id;
            const existUserInfo = await models.UserInfo.findOne({
                where: {
                    userId: userId
                }
            });
            if (existUserInfo) {
                const resultInfo = {
                    gender: existUserInfo.dataValues.gender,
                    age: existUserInfo.dataValues.age,
                    weight: existUserInfo.dataValues.weight,
                    height: existUserInfo.dataValues.height,
                    purpose: existUserInfo.dataValues.purpose,
                    activeMass: existUserInfo.dataValues.activeMass,
                };
                res.send(resultInfo);
            } else {
                console.log('X');
            }
        } catch (error) {
            console.error(error);
        }
    },
    setUserInfo: async (req, res) => {
        try {
            const userId = res.locals.user.id;
            // userinfo에 정보 있는지 확인
            const myId = await models.UserInfo.findOne({
                attribute: ['userId'],
                where: {
                    userId: userId
                }
            });
            if (myId !== null) {
                await models.UserInfo.update({
                    'gender': req.body.gender,
                    'age': req.body.age,
                    'weight': req.body.weight,
                    'height': req.body.height,
                    'purpose': req.body.purpose,
                    'activeMass': req.body.activeMass,
                },
                    { where: { userId: userId } }
                );
                res.send('유저 정보 업데이트 완료');
            } else {
                await models.UserInfo.create({
                    'gender': req.body.gender,
                    'age': req.body.age,
                    'weight': req.body.weight,
                    'height': req.body.height,
                    'purpose': req.body.purpose,
                    'activeMass': req.body.activeMass,
                    'userId': res.locals.user.id,
                });
                res.send('유저 정보 저장완료');
            }

        } catch (error) {
            console.error(error);
        }
    },

    getUserRecipeAnalysis: async (req, res) => {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const userId = res.locals.user.id;

        let sumNutrient = {
            energy: 0,
            carbohydrate: 0,
            protein: 0,
            fat: 0,
            natrium: 0
        };

        const userSelectFood = await models.UserMeal.findAll({
            attribute : ['foodCode', 'selectCode'],
            where: {
                [Op.and]: [{ userId: userId },
                { date: { [Op.between]: [startDate, endDate] } }]
            }
        });

        if(userSelectFood == null){
            res.status(404).send("기간 내 등록된 식단이 없습니다.");
        }

        // selectCode에 따라서 조회하는 테이블이 달라짐
        // Recipe : 0 / Food : 1
        for (const food of userSelectFood) {
            let foodNutrients;
            if(food.dataValues.selectCode == 0){
                foodNutrients = await models.RecipeNutrient.findAll({
                    attribute: ['foodCode'],
                    where: { foodCode: food.dataValues.foodCode }
                });
            }else{
                foodNutrients = await models.Food.findAll({
                    attribute: ['foodCode'],
                    where: { foodCode: food.dataValues.foodCode }
                });
            }
            
            for (const item of foodNutrients) {
                sumNutrient.energy += item.dataValues.foodEnergy;
                sumNutrient.carbohydrate += item.dataValues.foodCarbohydrate;
                sumNutrient.protein += item.dataValues.foodProtein;
                sumNutrient.fat += item.dataValues.foodFat;
                sumNutrient.natrium += item.dataValues.foodNatrium;
            }
        }

        const userInformation = await models.UserInfo.findOne({
            where: {
                userId: userId
            }
        });

        let activeMass, purpose;
        const userInfo = {
            maintainCalorie: 0,
            basicMetabolicRate: 0,
            dailyNeedEnergy: 0
        };

        //활동량 0~4단계에 따라 가중치 부여
        const activeMassValue = [1.2, 1.375, 1.55, 1.725, 1.9];
        const activeLevel = userInformation.dataValues.activeMass;
        activeMass = activeMassValue[activeLevel];

        //목적 0~2단계에 따라 가중치 부여
        const purposeValue = [1.1, 1, 0.9];
        const purposeLevel = userInformation.dataValues.purpose;
        purpose = purposeValue[purposeLevel];

        // 1일 권장 칼로리 
        if (userInformation.dataValues.gender == 'male') {
            userInfo.basicMetabolicRate = 66 + (13.7 * userInformation.dataValues.weight) + (5 * userInformation.dataValues.height) - (6.8 * userInformation.dataValues.age); 
        } else {
            userInfo.basicMetabolicRate = 655 + (9.6 * userInformation.dataValues.weight) + (1.7 * userInformation.dataValues.height) - (4.7 * userInformation.dataValues.age);
        }
        userInfo.maintainCalorie = userInfo.basicMetabolicRate * activeMass;
        userInfo.dailyNeedEnergy = userInfo.maintainCalorie * purpose;

        // 탄수화물 50%, 단백질 30%, 지방 20%
        const dailyNeed = {
            carbohydrate: userInfo.dailyNeedEnergy * 0.5 / 4,
            protein: userInfo.dailyNeedEnergy * 0.3 / 4,
            fat: userInfo.dailyNeedEnergy * 0.2 / 9,
            natrium: 2000
        };

        const dailyNutrientTotal = sumNutrient.carbohydrate + sumNutrient.fat + sumNutrient.protein;
        let percentCarbohydrate = sumNutrient.carbohydrate / dailyNutrientTotal * 100;
        let percentProtein = sumNutrient.protein / dailyNutrientTotal * 100;
        let percentFat = sumNutrient.fat / dailyNutrientTotal * 100;

        let BMIrate;
        const BMI = userInformation.dataValues.weight / ((userInformation.dataValues.height / 100) * (userInformation.dataValues.height / 100));

        switch (true){
            case (BMI < 18.5) : BMIrate = '저체중'; break;
            case (BMI < 23) : BMIrate = '정상'; break;
            case (BMI < 25) : BMIrate = '과체중'; break;
            case (BMI < 30) : BMIrate = '비만'; break;
            default : BMIrate = '고도비만'; break;
        }

        //1일 영양소 평균값을 계산
        const averageNutrient = {
            protein: sumNutrient.protein / 7,
            carbohydrate: sumNutrient.carbohydrate / 7,
            fat: sumNutrient.fat / 7,
            natrium : sumNutrient.natrium / 7,
            energy : sumNutrient.energy / 7,
        };

        const needNutrient = {
            protein: dailyNeed.protein - averageNutrient.protein,
            carbohydrate: dailyNeed.carbohydrate - averageNutrient.carbohydrate,
            fat: dailyNeed.fat - averageNutrient.fat
        };
    
        const query = `select foodName, foodCode, foodEnergy, foodCarbohydrate, foodFat, foodProtein
        from RecipeNutrients
        order by ABS(foodProtein - ${needNutrient.protein}), 
        ABS(foodCarbohydrate- ${needNutrient.carbohydrate}), ABS(foodFat - ${needNutrient.fat})
        limit 3;`;

        await connection.query(query, (error, results) => {
            if (error) {
                return res.status(404).send(error);
            }
            const recommandList = results;
            const result = {
                userInfo: userInfo,
                dailyNeed: dailyNeed,
                averageNutrient: averageNutrient,
                percentCarbohydrate: percentCarbohydrate,
                percentProtein: percentProtein,
                percentFat: percentFat,
                BMI: BMI,
                BMIrate: BMIrate,
                recommandList: recommandList
            }
            res.send(result);
        });
    },
};

module.exports = dietanalysis;