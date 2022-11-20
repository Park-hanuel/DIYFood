const Sequelize = require('sequelize');
const User = require('./User');
const RecipeNutrient = require('./RecipeNutrient');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const ExistIngredient = require('./ExistIngredient');
const LiveIngredient = require('./LiveIngredient');
const Food = require('./Food');
const UserMeal = require('./UserMeal');
const UserIngredient = require('./UserIngredient');
const UserRecipe = require('./UserRecipe');
const UserInfo = require('./UserInfo');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.ExistIngredient = ExistIngredient;
db.Ingredient = Ingredient;
db.LiveIngredient = LiveIngredient;
db.UserIngredient = UserIngredient;
db.RecipeNutrient = RecipeNutrient;
db.Recipe = Recipe;
db.Food = Food;
db.UserMeal = UserMeal;
db.UserRecipe = UserRecipe;
db.UserInfo = UserInfo;

User.init(sequelize);
ExistIngredient.init(sequelize);
LiveIngredient.init(sequelize);
Ingredient.init(sequelize);
UserIngredient.init(sequelize);
RecipeNutrient.init(sequelize);
Food.init(sequelize);
UserMeal.init(sequelize);
Recipe.init(sequelize);
UserRecipe.init(sequelize);
UserInfo.init(sequelize);

User.associate(db);
ExistIngredient.associate(db);
Ingredient.associate(db);
LiveIngredient.associate(db);
UserIngredient.associate(db);
RecipeNutrient.associate(db);
Food.associate(db);
UserMeal.associate(db);
Recipe.associate(db);
UserRecipe.associate(db);
UserInfo.associate(db);

module.exports = db;