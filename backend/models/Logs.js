const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const Logs = sequelize.define("Log_db", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  operation_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  register_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  book_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isbn: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  publisher: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  edition: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mode_of_operation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: { type: Sequelize.BLOB("medium"), allowNull: true },
});

module.exports = Logs;
