const twilio = require("twilio");
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const sendOtpViaSMS = async (phoneNo, otp) => {
  try {
    const message = await client.messages
      .create({
        body: req.body.otp,
        from: "+16185981625",
        to: "+919664518167",
      })
      .then((message) => console.log(message.sid))
      .done();

    console.log("OTP sent via SMS:", message.sid);
    return true;
  } catch (error) {
    console.error("Error sending SMS:", error);
    return false;
  }
};

// Usage
const phoneNo = "USER_PHONE_NUMBER";
const otp = otpGenerator.generate(6, { digits: true });
sendOtpViaSMS(phoneNo, otp);
