const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

module.exports = sequelize.define("todos", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  text: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: "text",
  },
  completed: {
    type: Sequelize.TINYINT(1),
    field: "completed",
  },
});
