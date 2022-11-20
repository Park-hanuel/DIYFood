const dotenv = require('dotenv');
dotenv.config();

  const development = {
    dialect: 'mysql',
    host : process.env.DB_HOST,
    port: 3306,
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB
 }
 
 const production = {
  dialect: 'mysql',
  host : process.env.DB_HOST,
  port: 3306,
  username : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD,
  database : process.env.DB
 }
 
 const test = {
    dialect: 'mysql',
    host : process.env.DB_HOST,
    port: 3306,
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB
 }
 
exports.development = development;
exports.production =  production;
exports.test =test;