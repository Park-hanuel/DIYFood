var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//DB 연결
const port = 3306;
var options = require('./option');
 
var loginData = {
        host: options.storageConfig.HOST,
        user: options.storageConfig.user,
        password: options.storageConfig.password                                                         
};
 
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: loginData.host,
  port:3306,
  user:loginData.user,
  password:loginData.password,
  database:'octodog'
})
connection.connect();

// user create
// CREATE TABLE user ( 
//   id int NOT NULL auto_increment PRIMARY KEY,
//   email varchar(45) not null,
//   name varchar(10) not null,
//   reg_date varchar(45),
//   password varchar(150) not null);

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * from user', function (error, results, fields) {
    if (error) console.log(error);
    res.send(results);
});
});

module.exports = router;
