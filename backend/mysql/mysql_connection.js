const mysql = require('mysql');
require("dotenv").config();

// DB 연결
const connection = mysql.createConnection({
host: process.env.DB_HOST,
port:3306,
user:process.env.DB_USER,
password:process.env.DB_PASSWORD,
database:process.env.DB});

connection.connect();


module.exports = connection;

// CREATE TABLE user ( 
//   id int NOT NULL auto_increment PRIMARY KEY,
//   email varchar(45) not null,
//   password varchar(200) not null,
//   name varchar(10) not null,
//   reg_date varchar(45)
//   );