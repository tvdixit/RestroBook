const Joi = require("joi");
const { Schema, model } = require("mongoose");

const otpSchema = new Schema(
  {
    phone_no: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Otp = model("Otp", otpSchema);

module.exports = Otp;
