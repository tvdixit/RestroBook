const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
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
  discountForYou: { type: Number, default: 0 },
  about: {
    type: String,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
