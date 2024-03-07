const jwt = require("jsonwebtoken");

const options = {
  expiresIn: 3 * 24 * 60 * 60,
};

module.exports.generateToken = async (id) => {
  try {
    const token = await jwt.sign({ id }, "trmo-app-key", {
      options: options,
    });
    return token;
  } catch (error) {
    return error;
  }
};
