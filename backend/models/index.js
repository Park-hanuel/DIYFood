const Sequelize = require('sequelize');
const User = require('./user');

const Ingredient = require('./ingredient');
const ExistIngredient = require('./existIngredient');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.ExistIngredient = ExistIngredient;
db.Ingredient = Ingredient;

User.init(sequelize);
ExistIngredient.init(sequelize);
Ingredient.init(sequelize);

User.associate(db);
ExistIngredient.associate(db);
Ingredient.associate(db);

module.exports = db;