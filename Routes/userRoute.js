const express = require("express");
const router = express.Router();
const {
  Signin,
  verifyOtp,
  CreateUser,
} = require("../Controller/userController");
const validate = require("../Middleware/validate");
const {
  SigninValidation,
  verifyOtpValidation,
  CreateUserValidation,
} = require("../Validation/userValidation");

router
  .post("/signin", validate(SigninValidation), Signin)
  .post("/verifyotp", validate(verifyOtpValidation), verifyOtp)
  .post("/createuser", validate(CreateUserValidation), CreateUser);
module.exports = {
  route: router,
};
