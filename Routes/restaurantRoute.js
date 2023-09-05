const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");
const {
  CreateRestaurant,
  RestaurantPagination,
} = require("../Controller/restaurantController");

const { upload } = require("../Service/upload");

router
  .post("/createrestaurant", upload.single("image"), auth(), CreateRestaurant)
  .get("/pagination", RestaurantPagination);

module.exports = {
  route: router,
};
