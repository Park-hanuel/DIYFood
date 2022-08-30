const Sequelize = require('sequelize');
const User = require('./user');
const RecipeNutrient = require('./recipenutrient');
const Recipe = require('./recipe');
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
db.RecipeNutrient = RecipeNutrient;
db.Recipe = Recipe;

User.init(sequelize);
ExistIngredient.init(sequelize);
LiveIngredient.init(sequelize);
Ingredient.init(sequelize);
UserIngredient.init(sequelize);
RecipeNutrient.init(sequelize);
Recipe.init(sequelize);

User.associate(db);
ExistIngredient.associate(db);
Ingredient.associate(db);
LiveIngredient.associate(db);
UserIngredient.associate(db);
RecipeNutrient.associate(db);
Recipe.associate(db);

module.exports = db;