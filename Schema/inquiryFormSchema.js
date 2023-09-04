const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  formyself: { type: String, enum: ["true", "false"] },
  yourname: { type: String },
  phonenumber: { type: String },
  email: { type: String },
  numberOfpersons: { type: Number },
  datetime: {
    date: { type: String },
    time: { type: String },
  },
  specialrequest: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "cancelled", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Inquiry", inquirySchema);
