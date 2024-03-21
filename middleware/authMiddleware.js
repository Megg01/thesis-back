const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  try {
    // const authorizationHeader = req.header("Authorization");
    // if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    //   return res.status(401).json({ message: "Invalid token" });
    // }
    // const token = req.headers.authorization?.split(" ")[1];
    // if (!token) {
    //   return res.status(401).json({ message: "Authentication required" });
    // }
    // const decoded = jwt.verify(token, "trmo_app_key");
    // req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { jwtMiddleware };
