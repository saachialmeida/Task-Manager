const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

module.exports = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  },
  first_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: "first_name"
  },
  last_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: "last_name"
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: true,
    unique: true,
    field: "email"
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: "password"
  }
});
