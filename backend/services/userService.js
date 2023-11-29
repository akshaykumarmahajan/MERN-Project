const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const userRegister = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.confirm_password) {
    res.status(401).send({ status: "failed", message: "All fields are required." });
  } else {
    try {
      const { firstname, lastname, email, password, confirm_password } = req.body;
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail) {
        res.status(401).send({ status: "failed", message: "Email already exisit." });
      } else {
        if (password === confirm_password) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const userObj = {
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: hashPassword,
              username: firstname + lastname,
            };
            if (req.body.role === "Admin") {
              userObj.role = req.body.role;
            }
            console.log("userObh", userObj);
            const addUser = await User.create(userObj);
            if (addUser) {
              res.status(201).send({status: "success",message: "Registration successfully."});
            } else {
              res.status(404).send({ status: "failed", message: "Unable to register." });
            }
          } catch (error) {
            res.status(404).send({ status: "failed", message: "Unable to register." });
          }
        } else {
          res.status(401).send({status: "failed",message: "Password and confirm password doesn't match."});
        }
      }
    } catch (error) {
      res.status(404).send({status: "failed",message: "Something went wrong.",error: error});
    }
  }
};

const userLogin = async (req, res) => {
  console.log("req",req.body)
  if (!req.body.email || !req.body.password) {
    res.status(401).send({ status: "failed", message: "All fields are required." });
  } else {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          const token = jwt.sign({ userID: user._id },process.env.JWT_SECRET_KEY,{ expiresIn: "5d" });
          const data ={
            _id: user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            token:token
          }
          res.status(201).send({status: "success",message: "Login Successfully.",data: data,});
        } else {
          res.status(401).send({status: "failed",message: "Invalid Credentials."});
        }
      } else {
        res.status(401).send({status: "failed",message: "You are not a registered user."});
      }
    } catch (error) {
      res.status(404).send({status: "failed",message: "Unable to login.",error: error});
    }
  }
};

module.exports = {
  userRegister,
  userLogin,
};
