const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const Question_Mgmt = sequelize.define("QuestionBank", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  programme: { type: Sequelize.STRING, allowNull: false },
  year: { type: Sequelize.STRING, allowNull: false },
  course_id: { type: Sequelize.STRING, allowNull: false, unique: true },
  course_name: { type: Sequelize.STRING, allowNull: false },
  sem: { type: Sequelize.STRING, allowNull: false },
  ques_link: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Question_Mgmt;
