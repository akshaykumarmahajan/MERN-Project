const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const UserController = require("../controllers/userController");
const checkUserAuth = require("../middlewares/authmiddleware");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../backend/public/images/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
  });

router.use("/getUserDetail", checkUserAuth);
router.use("/updateUserDetail", checkUserAuth);
router.use("/changeUserPassword", checkUserAuth);
router.use("/updateProfileImage", checkUserAuth);

router.get("/getUserDetail", UserController.getUserDetail);
router.post("/updateUserDetail", UserController.updateUserDetail);
router.post("/changeUserPassword", UserController.changeUserPassword);
router.post("/updateProfileImage", upload.single('profile_image'), UserController.updateProfileImage);

module.exports = router;
