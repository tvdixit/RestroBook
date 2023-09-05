const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");
const {
  CreateRestaurant,
  RestaurantPagination,
} = require("../Controller/restaurantController");

const { upload } = require("../Service/upload");

router
  .post("/createrestaurant", upload.single("image"), auth(), CreateRestaurant) // create a new restaurant api :
  .get("/pagination", RestaurantPagination); // All restaurant pagination with search by name, is_veg and city :

module.exports = {
  route: router,
};
