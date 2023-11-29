const userService = require("../services/userService");

exports.userRegister = async (req, res) => {
  try {
    await userService.userRegister(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: "failed", message: err.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    await userService.userLogin(req, res);
  } catch (error) {
    res.status(500);
    res.send({ status: "failed", message: err.message });
  }
};
