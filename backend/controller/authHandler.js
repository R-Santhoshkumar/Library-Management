const Admin_Info = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function LoginHandler(req, res) {
  const { username, password } = req.body;
  try {
    const isAvailable = await Admin_Info.findOne({
      where: { username: username },
    });

    if (!isAvailable) {
      return res.status(400).send({ message: "User not found" });
    }

    const passMatch = await bcrypt.compare(password, isAvailable.password);

    if (!passMatch) {
      return res.status(400).send({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ username: username, email: isAvailable.email }, process.env.JSECRET, { expiresIn: '10h' });
    res.cookie("token", token, {
      httpOnly: true
    });
    const isAdminAuthenticated = true;
    console.log("isAdminAuthenticated:", isAdminAuthenticated);


    // Manually set the cookie in the Set-Cookie header
    console.log("Login Successful!");

    res.status(200).send({ success: true, token: token, message: "Admin login successful" });
  } catch (err) {
    console.error("Error during admin login:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function logoutHandler(req, res) {
  try {
    // Clear the cookie manually
    res.setHeader('Set-Cookie', 'sessionId=; HttpOnly; Max-Age=0; Secure');
    console.log("Session ID cleared!");
    
    console.log("Logout Successful!");
    return res
      .status(200)
      .send({ success: true, message: "Successfully logged out" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}

async function CheckAuthentication(req,res) {
  
}

module.exports = {
  LoginHandler: LoginHandler,
  logoutHandler: logoutHandler
};
