
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const mysql = require('mysql');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
  
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
  
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  
  module.exports = db;


// console.log(config);

// const sequelize = new Sequelize(config.database, config.username, config.password, config);
// const sequelize = new Sequelize('diyfood', 'root', 'root',{
//   host: 'localhost',
//   dialect:  'mysql'
// });
// (async () => {
//     try {
//         await sequelize.authenticate();
//         const user = await user.findAll();
//         console.log(users.every(user => user instanceof User));
//         console.log('Connection has been established successfully.');
//     } catch (e) {
//         console.error('Unable to connect to the database:', e);
//     }
// })();


// module.exports = sequelize;