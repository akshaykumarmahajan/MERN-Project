const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
router.post("/register", AuthController.userRegister);
router.post("/login", AuthController.userLogin);
router.get("/userActicate", AuthController.userActicate)
router.post("/userForgetPassword", AuthController.userForgetPassword)
router.post("/userResetPassword/:id/:token", AuthController.userResetPassword)

module.exports = router;
