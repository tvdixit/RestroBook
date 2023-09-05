const express = require("express");
const router = express.Router();
const {
  Signin,
  verifyOtp,
  CreateUser,
  SaveRestaurant,
  inquiry,
} = require("../Controller/userController");
const validate = require("../Middleware/validate");
const {
  SigninValidation,
  verifyOtpValidation,
  CreateUserValidation,
} = require("../Validation/userValidation");
const { auth } = require("../Middleware/auth");

router
  .post("/signin", validate(SigninValidation), Signin) //user signin api with phone number :
  .post("/verifyotp", validate(verifyOtpValidation), verifyOtp) //user verifyotp api with phone number :
  .post("/createuser", validate(CreateUserValidation), CreateUser) //user create api :
  .post("/save/restaurant", auth(), SaveRestaurant) //user can save or unsave restaurant api :
  .post("/inquiryform", auth(), inquiry); //user inquiry form api for restaurant:

module.exports = {
  route: router,
};
