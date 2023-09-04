const mongoose = require("mongoose");

const RestaurantReview = new mongoose.Schema(
  {
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    star_rating: {
      type: Number,
      min: 1,
      max: 5,
      validate: {
        validator: function (value) {
          return value % 0.5 === 0;
        },
        message:
          "Star rating must be in increments of 0.5 (e.g., 3.0, 3.5, 4.0, etc.)",
      },
    },
    comment: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", RestaurantReview);
