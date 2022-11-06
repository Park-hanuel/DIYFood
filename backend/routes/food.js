const express = require('express');
const router = express.Router();

const FoodController = require('../controllers/food');

router.get("/list", FoodController.getFoodList);

router.get("/userlist", FoodController.getUserFoodList);
router.put("/userlist", FoodController.setUserFoodList);
router.delete("/userlist", FoodController.deleteUserFoodList);


module.exports = router;

