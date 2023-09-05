const mongoose = require("mongoose");

//Create Restaurant Model Schema :
const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  is_veg: { type: Boolean, default: true, enum: [true, false], required: true },
  cuisine: [{ type: String, required: true }],
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
      category: { type: String, enum: ["veg", " non_veg"] },
      dishes: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true, min: 0 },
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
  averagerating: { type: Number, default: 0 },
  discountForYou: { type: String, default: 0 },
  about: {
    type: String,
  },
  saved_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "SaveUnsaved" }],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
