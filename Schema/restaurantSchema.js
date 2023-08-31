const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    image: { type: String },
    rating: { type: String },
    phone: { phone: Number },
    is_veg: { type: Boolean, enum: ["true", "false"] },
    is_save: { type: Boolean, enum: ["true", "false"] },
    discount: { type: String },
    description: { type: String },
    // cuisine: {
    //   type: String,
    //   enum: ["Indian", "Chinese", "Thai", "Italian", "Mexican", "Others"],
    // },
    price: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviews: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
