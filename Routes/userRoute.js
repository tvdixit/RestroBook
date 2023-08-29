const express = require("express");
const router = express.Router();
const { Signin, verifyOtp } = require("../Controller/userController");
const validate = require("../Middleware/validate");

router.post("/signin", Signin).post("/verifyotp", verifyOtp);
module.exports = {
  route: router,
};
