const jwt = require("jsonwebtoken");

const options = { expiresIn: "3d" };

module.exports.generateToken = async (_id) => {
  try {
    const id = _id.toHexString();

    const token = await jwt.sign({ id }, "trmo_app_key", options);
    return token;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    throw error;
  }
};
