const userService = require("../services/userService");
const {STATUS}= require('../lib/constants')  

exports.getUserDetail = async (req, res) => {
  try {
    await userService.getUserDetail(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: STATUS.failed, message: err.message });
  }
};

exports.updateUserDetail = async (req, res) => {
  try {
    await userService.updateUserDetail(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: STATUS.failed, message: error.message });
  }
};

exports.changeUserPassword = async (req, res) => {
  try {
    await userService.changeUserPassword(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: STATUS.failed, message: error.message });
  }
};

exports.updateProfileImage = async (req, res) => {
  try {
    await userService.updateProfileImage(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: STATUS.failed, message: error.message });
  }
};

