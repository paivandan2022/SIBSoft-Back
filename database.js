const { acceptsCharset } = require("express/lib/request");
const mysql = require("mysql2");
const configs = require("./configs");

// const dotenv = require("dotenv");
// dotenv.config();

// const {
//   MYSQL_HOST,
//   MYSQL_PORT,
//   MYSQL_DATABASE,
//   MYSQL_USER,
//   MYSQL_PASSWORD,
//   MYSQL_CHARSET,
// } = process.env;

const dbConnection = mysql
  .createPool({
    host: configs.MYSQL_HOST, // MYSQL HOST NAME
    user: configs.MYSQL_USER, // MYSQL USERNAME
    password: configs.MYSQL_PASSWORD, // MYSQL PASSWORD
    database: configs.MYSQL_DATABASE, // MYSQL DB NAME
    port: configs.MYSQL_PORT,
    charset: configs.MYSQL_CHARSET,
  })
  .promise();
module.exports = dbConnection;
