const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");
const {
  CreateRestaurant,
  RestaurantPagination,
  RestaurantSorting,
  RestaurantsbyCategory,
} = require("../Controller/restaurantController");

const { upload } = require("../Service/upload");

router
  .post("/createrestaurant", upload.single("image"), auth(), CreateRestaurant) // create a new restaurant api :
  .get("/pagination", RestaurantPagination) // All restaurant pagination with search by name, is_veg and city :
  .get("/sorting", RestaurantSorting) //Get Restaurant By Sorting :
  .get("/bycategory", RestaurantsbyCategory); // Get Restaurant by Category :

module.exports = {
  route: router,
};
