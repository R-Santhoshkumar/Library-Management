const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const Borrowed_Books = sequelize.define("borrowed_book", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    borrow_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    borrower_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    borrower_email: {
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
    borrow_date: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    return_date: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    book_id: {
        type: Sequelize.STRING,
        allowNull: false,
    }
   
});

module.exports = Borrowed_Books;
