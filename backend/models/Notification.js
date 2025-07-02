const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../models/index");

const Notification = sequelize.define("notification_db", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    request_id: {
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
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Notification;
