const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const middleware = async (req, res, next) => {
  try {
    ClerkExpressRequireAuth();

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { middleware: middleware };
