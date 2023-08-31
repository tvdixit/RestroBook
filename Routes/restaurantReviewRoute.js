const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");
const {
  RestaurantReview,
} = require("../Controller/restaurantReviewController");

router.post("/addReview", auth(), RestaurantReview);

module.exports = { route: router };
