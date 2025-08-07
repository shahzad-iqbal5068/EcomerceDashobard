const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
  
    if (!token) {
      return res.status(403).json({ error: "Please add a token in the header" });
    }
  
    token = token.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(" Token verification failed");   
        return res.status(401).json({ error: "Token expired or invalid" });
      }
  
      console.log("Token verification successful");
      req.user = decoded; // Store decoded user info
      next();
    });
    
  } catch (error) {
    console.error("Middleware Error:", error);
    return res.status(500).json({ error });
  }
};

module.exports = verifyToken;
