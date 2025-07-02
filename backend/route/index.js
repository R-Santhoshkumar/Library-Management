const express = require("express");
const authRoute = require("./auth");
const taskRoute = require("./task");
const authenticateToken = require("../middleware/auth");
let route = express.Router();
route.use('/auth', authRoute);
route.use('/task', taskRoute);

module.exports = route;
