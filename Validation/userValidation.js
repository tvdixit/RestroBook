const Joi = require("joi");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Signin User Validation :
const SigninValidation = {
  body: Joi.object().keys({
    phone_no: Joi.string().required().label("Phone number"),
  }),
};

//Verify Otp Validation :
const verifyOtpValidation = {
  body: Joi.object().keys({
    phone_no: Joi.string().required().label("Phone number"),
    otp: Joi.string().required().label("OTP"),
  }),
};

//Create User Validation :
const CreateUserValidation = {
  body: Joi.object().keys({
    first_name: Joi.string().required().label("First name"),
    last_name: Joi.string().required().label("Last name"),
    email: Joi.string().regex(emailRegex).required().label("Email"),
    address: Joi.string().required().label("Address"),
    phone_no: Joi.string().required().label("Phone number"),
  }),
};

module.exports = {
  CreateUserValidation,
  verifyOtpValidation,
  SigninValidation,
};
