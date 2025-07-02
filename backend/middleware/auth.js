const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // const authHeader = req.headers['authorization']; // Get the authorization header
  // const token = authHeader && authHeader.split(' ')[1];
  // const token = localStorage.getItem("token");
  //       if (!token) {
  //         // If no token found, redirect to login
  //         navigate('/LoginPage');
  //         return;
  //       }// Extract the token from the header
  // If there's no token, return Unauthorized
  const token = req.cookies.token;
  console.log("Cookies : ", req.cookies);
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Attach the user info to the request object
    next(); 
  
} catch (error) {
    res.clearCookie("token");
    return res.redirect("/LoginPage")
}
  // Proceed to the next middleware or route handler
 
}

module.exports = authenticateToken;
