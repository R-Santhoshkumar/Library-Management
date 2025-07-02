const { LoginHandler, logoutHandler } = require("../controller/authHandler");
const express = require("express");
const authenticateToken = require("../middleware/auth");
let route = express.Router();
route.post("/login", LoginHandler);
route.get("/logout", logoutHandler);
// route.get("/protect-route", authenticateToken);

module.exports = route;