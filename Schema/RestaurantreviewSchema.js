const mongoose = require("mongoose");

const RestaurantReview = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number },
    comment: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", RestaurantReview);
