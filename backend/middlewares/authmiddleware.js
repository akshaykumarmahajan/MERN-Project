const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const {STATUS, MESSAGE}= require('../lib/constants')  

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get tokem from header
      token = authorization.split(" ")[1];
      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //Get User from token
      req.user = await UserModel.findById(userID).select("-password");
      if (req.user) {
        next();
      } else {
        res.status(401).send({ status: STATUS.failed, message: MESSAGE.unauthorizedUser });
      }
    } catch (error) {
      res.status(401).send({ status: STATUS.failed, message: MESSAGE.unauthorizedUser });
    }
  }
  if (!token) {
    res.status(401).send({ status: STATUS.failed, message: MESSAGE.unauthorizedUserNoToken });
  }
};

module.exports = checkUserAuth;
