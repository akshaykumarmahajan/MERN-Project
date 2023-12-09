const express = require("express");
const router = express.Router();

router.use("/api/auth", require("./auth.js"));
router.use("/api/user", require("./user.js"));

module.exports = router;
