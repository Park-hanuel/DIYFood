const express = require("express");
const router = express.Router();
const RecipeCotroller = require("../controllers/recipe");

router.get("/list", RecipeCotroller.getList);
router.get("/list/:foodCode", RecipeCotroller.getRecipe);

router.get("/recommendlist", RecipeCotroller.getRecommendList);
router.post("/recommendlist", RecipeCotroller.setRecommendList);

module.exports = router;
