const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const Books = sequelize.define("books", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  book_id: { type: Sequelize.STRING, allowNull: false },
  title: { type: Sequelize.STRING, allowNull: false },
  isbn: { type: Sequelize.STRING, allowNull: false, unique: true },
  publisher: { type: Sequelize.STRING, allowNull: false },
  author: { type: Sequelize.STRING, allowNull: false },
  edition: { type: Sequelize.STRING, allowNull: false },
  year: { type: Sequelize.STRING, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false },
  image: { type: Sequelize.BLOB("medium"), allowNull: true },
  image_link: { type: Sequelize.STRING, allowNull: true },
});

module.exports = Books;
