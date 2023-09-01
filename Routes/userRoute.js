const express = require("express");
const router = express.Router();
const {
  Signin,
  verifyOtp,
  CreateUser,
  SaveRestaurant,
} = require("../Controller/userController");
const validate = require("../Middleware/validate");
const {
  SigninValidation,
  verifyOtpValidation,
  CreateUserValidation,
} = require("../Validation/userValidation");
const { auth } = require("../Middleware/auth");

router
  .post("/signin", validate(SigninValidation), Signin)
  .post("/verifyotp", validate(verifyOtpValidation), verifyOtp)
  .post("/createuser", validate(CreateUserValidation), CreateUser)
  .post("/save/restaurant", auth(), SaveRestaurant);
module.exports = {
  route: router,
};
