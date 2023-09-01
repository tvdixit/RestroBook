const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  // {
  //   name: { type: String, required: true },
  //   address: { type: String },
  //   image: { type: String },
  //   rating: { type: String },
  //   phone: { phone: Number },
  //   is_veg: { type: Boolean, enum: ["true", "false"] },
  //   is_save: { type: Boolean, enum: ["true", "false"] },
  //   discount: { type: String },
  //   description: { type: String },
  //   // cuisine: {
  //   //   type: String,
  //   //   enum: ["Indian", "Chinese", "Thai", "Italian", "Mexican", "Others"],
  //   // },
  //   price: { type: String },
  //   user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //   reviews: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  // },
  // { timestamps: true }

  name: { type: String },
  description: { type: String },
  image: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
  },
  contact: {
    phone: { type: String },
    email: { type: String },
  },
  cuisine: [{ type: String }],
  opening_hours: {
    monday: { type: String },
    tuesday: { type: String },
    wednesday: { type: String },
    thursday: { type: String },
    friday: { type: String },
    saturday: { type: String },
    sunday: { type: String },
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  menu: [
    {
      category: { type: String },
      dishes: [
        {
          name: { type: String },
          description: { type: String },
          price: { type: Number },
        },
      ],
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
