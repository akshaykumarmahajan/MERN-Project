const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const checkUserAuth = require("../middlewares/authmiddleware");

router.use("/getUserDetail", checkUserAuth);
router.use("/updateUserDetail", checkUserAuth);
router.use("/changeUserPassword", checkUserAuth);

router.get("/getUserDetail", UserController.getUserDetail);
router.post("/updateUserDetail", UserController.updateUserDetail);
router.post("/changeUserPassword", UserController.changeUserPassword);

module.exports = router;
