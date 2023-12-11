const authService = require("../services/authService");
const {STATUS}= require('../lib/constants')  

exports.userRegister = async (req, res) => {
  try {
    await authService.userRegister(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: STATUS.failed, message: error.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    await authService.userLogin(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: STATUS.failed, message: error.message });
  }
};

exports.userActicate = async (req, res) => {
  try {
    await authService.userActicate(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: STATUS.failed, message: error.message });
  }
};

exports.userForgetPassword = async (req, res) => {
  try {
    await authService.userForgetPassword(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: STATUS.failed, message: error.message });
  }
};


exports.userResetPassword = async (req, res) => {
  try {
    await authService.userResetPassword(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: STATUS.failed, message: error.message });
  }
};
