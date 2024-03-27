require("dotenv").config();
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");
const multer = require("multer");
const upload = multer();

const middleware = async (req, res, next) => {
  try {
    ClerkExpressWithAuth();

    const contentType = req.headers["content-type"];

    if (contentType?.includes("multipart/form-data")) {
      upload.any()(req, res, next);
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token or request format" });
  }
};

module.exports = middleware;
