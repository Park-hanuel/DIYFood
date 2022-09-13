const express = require("express");
const router = express.Router();
const UserInfoController = require("../controllers/dietanalysis");

router.get("/analysis", UserInfoController.getUserInfo);
router.post("/analysis", UserInfoController.setUserInfo);
router.get("/analysis/result", UserInfoController.getUserRecipeAnalysis);

module.exports = router;