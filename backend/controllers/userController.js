require("dotenv").config();
const httpStatusCodes = require("../utils/constants").httpStatusCodes;
const User = require("../models/User");
const { hashPassword, generateToken } = require("../utils/helper");

async function handleLogin(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    try {
      req.body = JSON.parse(body);
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (user && (await user.comparePassword(password))) {
        const token = generateToken(user);
        res.statusCode = httpStatusCodes.OK;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "User login successfully", token }));
        return;
      } else {
        res.statusCode = httpStatusCodes.UNAUTHORIZED;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Invalid username or password" }));
      }
    } catch (error) {
      res.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: error.message }));
    }
  });
}

async function handleRegister(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    try {
      req.body = JSON.parse(body);
      const { username, password, email } = req.body;
      const hashedPassword = await hashPassword(password);
      const newUser = new User({ username, password: hashedPassword, email }); // Save to database
      await newUser.save();
      res.statusCode = httpStatusCodes.CREATED;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "User register successfully" }));
      return;
    } catch (error) {
      if (!res.headersSent) {
        res.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: error.message }));
      }
    }
  });
}

module.exports = {
  handleLogin,
  handleRegister,
};
