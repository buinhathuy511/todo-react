const jwt = require("jsonwebtoken");
const User = require("../models/User");
const httpStatusCodes = require("../utils/constants").httpStatusCodes;
const jwtConfig = require("../config/jwtConfig");

const authMiddleware = (handler) => {
  return async (req, res) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwtConfig.secretKey);
        req.user = await User.findById(decoded.id).select("-password");
        return handler(req, res);
      } catch (error) {
        res.statusCode = httpStatusCodes.UNAUTHORIZED;
        res.setHeader("Content-Type", "application/json");
        return res.end(
          JSON.stringify({ message: "Not authorized, token failed" })
        );
      }
    }

    if (!token) {
      res.statusCode = httpStatusCodes.UNAUTHORIZED;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ message: "Not authorized, no token" }));
    }
  };
};

module.exports = authMiddleware;
