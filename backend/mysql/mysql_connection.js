const mysql = require('mysql');
const options = require('../mysql/option');

const loginData = {
    host: options.storageConfig.HOST,
    user: options.storageConfig.user,
    password: options.storageConfig.password                                                         
};

// DB 연결
const connection = mysql.createConnection({
host: loginData.host,
port:3306,
user:loginData.user,
password:loginData.password,
database:'diyfood'
})
connection.connect();


module.exports = connection;