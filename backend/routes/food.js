const express = require('express');
const router = express.Router();

const FoodController = require('../controllers/food');

router.get("/list", FoodController.getFoodList);

router.get("/userlist", FoodController.getUserFoodList);
router.post("/userlist", FoodController.setUserFoodList);
router.delete("/userlist", FoodController.deleteuserFoodList);


module.exports = router;

