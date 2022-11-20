const express = require("express");
const { isLoggedIn, isNotLoggedIn, isAdmin } = require("./middlewares");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/signup", isNotLoggedIn, UserController.setUser);
router.get("/checkemail", UserController.checkEmail);

router.post("/login", isNotLoggedIn, UserController.login);
router.get("/logout", UserController.logout);

router.get("/info", isLoggedIn, UserController.getInfo);
router.patch("/info", UserController.setInfo);
router.delete("/info", UserController.deleteInfo);

router.get("/admin", isAdmin, UserController.admin);

//회원 월별 식단 리스트 제공
router.get("/recipelist", UserController.getRecipeList);

router.delete("/recipelist", UserController.deleteRecipeList);
router.delete("/recipe", UserController.deleteRecipe);

module.exports = router;
