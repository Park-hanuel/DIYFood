const Sequelize = require('sequelize');
const User = require('./user');
const Recipe = require('./recipe');
const RecipeNutrient = require('./recipenutrient');
const Ingredient = require('./ingredient');
const ExistIngredient = require('./existIngredient');
const LiveIngredient = require('./liveIngredient');
const UserIngredient = require('./userIngredient');
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
db.Recipe = Recipe;
db.RecipeNutrient = RecipeNutrient;

User.init(sequelize);
ExistIngredient.init(sequelize);
LiveIngredient.init(sequelize);
Ingredient.init(sequelize);
UserIngredient.init(sequelize);
Recipe.init(sequelize);
RecipeNutrient.init(sequelize);

User.associate(db);
ExistIngredient.associate(db);
Ingredient.associate(db);
LiveIngredient.associate(db);
UserIngredient.associate(db);
Recipe.associate(db);
RecipeNutrient.associate(db);

module.exports = db;