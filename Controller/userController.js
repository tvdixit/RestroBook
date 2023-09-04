const jwt = require("jsonwebtoken");
const User = require("../Schema/userSchema");
const Otp = require("../Schema/otpSchema");
const Restaurant = require("../Schema/restaurantSchema");
const restoSaveUnsave = require("../Schema/restoSave-unsaveSchema");
const inquiryForm = require("../Schema/inquiryFormSchema");
const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

//Signin user Api :
const Signin = async (req, res, next) => {
  try {
    const numericOTP = Math.floor(Math.random() * 900000) + 100000;
    const phone_no = req.body.phone_no;

    const existingUser = await Otp.findOne({ phone_no });

    if (existingUser) {
      existingUser.otp = numericOTP;
      const result = await existingUser.save();
      res.status(200).json({ message: "OTP updated successfully", result });
    } else {
      const newUser = new Otp({ phone_no, otp: numericOTP });
      const result = await newUser.save();
      res
        .status(200)
        .json({ message: "OTP sent successfully for new user", result });
    }
    // const message = await client.messages.create({
    //   body: `Your OTP is: ${numericOTP}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: req.body.phone_no,
    // });
    // console.log("OTP sent via Twilio:", message.sid);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
//verifyOtp Api:
const verifyOtp = async (req, res) => {
  try {
    const otpHolder = await Otp.findOne({
      $or: [{ phone_no: req.body.phone_no }, { otp: req.body.otp }],
    });
    if (
      otpHolder.phone_no === req.body.phone_no &&
      otpHolder.otp === req.body.otp
    ) {
      const existingUser = await User.findOne({ phone_no: req.body.phone_no });

      if (existingUser) {
        const token = jwt.sign(
          { user_id: existingUser._id },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        return res.status(200).json({
          message: "User already exists",
          token,
          data: existingUser,
        });
      } else {
        return res.status(400).json({
          message: "User not registered",
        });
      }
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
//Create User Api :
const CreateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ phone_no: req.body.phone_no }, { email: req.body.email }],
    });
    if (user)
      return res
        .status(200)
        .json({ message: "phone number or email already exists" });

    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    if (savedUser) {
      const token = jwt.sign(
        { user_id: savedUser._id, phone_no: savedUser.phone_no },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
      return res.status(200).json({
        message: "User registered and OTP verified successfully",
        token,
        data: savedUser,
      });
    } else {
      return res.status(400).json({ message: "User not registered" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

const SaveRestaurant = async (req, res) => {
  try {
    const datafind = await restoSaveUnsave.find({
      restaurant_id: req.query.restaurant_id,
      user_id: req.user.user_id,
    });
    if (datafind.length == 0) {
      const newSave = new restoSaveUnsave({
        user_id: req.user.user_id,
        restaurant_id: req.query.restaurant_id,
      });
      const result = await newSave.save();
      await Restaurant.findByIdAndUpdate(
        req.query.restaurant_id,
        { $push: { saved_by: result._id } },
        { new: true }
      );
      res.status(200).json({
        message: "Restaurant saved successfully",
        data: result,
      });
    } else {
      const Unsave = await restoSaveUnsave.deleteOne({
        restaurant_id: datafind[0].restaurant_id,
        user_id: datafind[0].user_id,
      });
      await Restaurant.findByIdAndUpdate(
        req.query.restaurant_id,
        { $pull: { saved_by: datafind[0]._id } },
        { new: true }
      );
      res.status(200).json({
        message: "Restaurant unsaved successfully",
        data: Unsave,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const inquiry = async (req, res) => {
  console.log(req.body, "Loading...");
  try {
    const newInquiry = new inquiryForm({
      restaurant_id: req.body.restaurant_id,
      user_id: req.user.user_id,
      ...req.body,
    });
    console.log(newInquiry, "Inquiry", req.body);
    const result = await newInquiry.save();
    res.status(200).json({ message: "Inquiry sent successfully", result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
module.exports = {
  Signin,
  verifyOtp,
  CreateUser,
  SaveRestaurant,
  inquiry,
};
