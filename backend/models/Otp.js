const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const Otp = sequelize.define('Otp', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    book_id: { type: Sequelize.STRING, allowNull: false },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
},
);
  
module.exports = Otp;