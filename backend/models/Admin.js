// models/Admin.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const Admin_Info = sequelize.define("admin_details", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.BLOB("medium"),
    allowNull: true,
  },
});

module.exports = Admin_Info;
