const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../Schema/userSchema");
const Otp = require("../Schema/otpSchema");
const generateOTP = require("../Service/generateOtp");
const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const Signin = async (req, res, next) => {
  try {
    const user = await Otp.findOne({ phone_no: req.body.phone_no });
    if (user) res.status(200).send("user already exists");

    const numericOTP = Math.floor(Math.random() * 900000) + 100000;
    const phone_no = req.body.phone_no;
    console.log(numericOTP, "otp");

    const otp = new Otp({ phone_no: phone_no, otp: numericOTP });

    const result = await otp.save();
    const message = await client.messages.create({
      // body: `Your OTP is: ${numericOTP}`,
      // from: process.env.TWILIO_PHONE_NUMBER,
      // to: req.body.phone_no,
    });
    console.log("OTP sent via Twilio:", message.sid);

    const newUser = new User({
      generatedOTP: numericOTP,
    });

    const newRegUser = new User({
      frist_name: req.body?.frist,
      last_name: req.body?.last_name,
      email: req.body?.email,
      phone_no: req.body.phone_no,
    });
    const savedUser = await newRegUser.save();
    return res.status(200).send("OTP sent successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
//verifyOtp :
const verifyOtp = async (req, res) => {
  try {
    const otpHolder = await Otp.findOne({
      $or: [{ phone_no: req.body.phone_no }, { otp: req.body.otp }],
    });
    console.log(otpHolder, "registerUser");
    if (otpHolder.length === 0) {
      return res.status(400).send("You used an expired OTP");
    }
    // const registerUser = await User.findOne({ phone_no: req.body.phone_no });
    // const rightOtpFind = otpHolder[otpHolder.length - 1];
    // console.log(rightOtpFind, "rightOtpFind");
    // if (otpHolder.otp === req.body.otp && !registerUser) {
    //   res.status(200).send("Otp found");
    // }
    console.log(
      otpHolder.phone_no === req.body.phone_no &&
        otpHolder.otp === req.body.otp,
      "otpotoptoptotpotptotptotp"
    );
    if (
      otpHolder.phone_no === req.body.phone_no &&
      otpHolder.otp === req.body.otp
    ) {
      const existingUser = await User.findOne({ phone_no: req.body.phone_no });

      if (existingUser) {
        const token = jwt.sign(
          { user_id: existingUser._id, phone_no: existingUser.phone_no },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        return res.status(200).json({
          message: "User already exists",
          token,
          data: existingUser,
        });
      } else {
        // const userdata = new User(req.body);
        // const savedata = await userdata.save();
        return res.status(400).json({
          message: "User not registered",
        });
        // if (savedata) {
        //   const token = jwt.sign(
        //     { user_id: savedata._id, phone_no: savedata.phone_no },
        //     process.env.SECRET_KEY,
        //     { expiresIn: "24h" }
        //   );
        //   return res.status(200).json({
        //     message: "OTP verified successfully",
        //     token,
        //     data: savedata,
        //   });
        // }
      }
    } else {
      return res.status(400).send("Invalid OTP");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("An error occurred");
  }
};
module.exports = {
  Signin,
  verifyOtp,
};
