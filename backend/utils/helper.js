const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
  });
};

module.exports = { hashPassword, generateToken };
