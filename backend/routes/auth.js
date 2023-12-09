const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
router.post("/register", AuthController.userRegister);
router.post("/login", AuthController.userLogin);

module.exports = router;
