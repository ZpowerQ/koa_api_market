const Sequelize = require("sequelize");
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, mySQL_DB } = require("../config/config.default.js") ;

const seq = new Sequelize(mySQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: "mysql",
});

// 验证连接
// seq
//   .authenticate()
//   .then(() => {
//     console.log("连接成功");
//   })
//   .catch(() => {
//     console.log("连接失败");
//   });

module.exports = seq;
