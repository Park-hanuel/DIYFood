const Sequelize = require('sequelize');
const User = require('./user');
const Grocery = require('./grocery')

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;

User.init(sequelize);
Grocery.init(sequelize);

User.associate(db);
Grocery.associate(db);
  
module.exports = db;