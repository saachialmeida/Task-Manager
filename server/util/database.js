const Sequelize = require("sequelize");

const sequelize = new Sequelize("task_manager_react", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
