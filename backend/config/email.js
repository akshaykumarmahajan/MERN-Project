const nodemailer = require("nodemailer");
const emailConfig = require("./config");

let transporter = nodemailer.createTransport({
  service: emailConfig.EMAIL_SERVICE,
  auth: {
    user: emailConfig.EMAIL_USER,
    pass: emailConfig.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
