const express = require("express");
const router = express.Router();
const validate = require("../Middleware/validate");
const { auth } = require("../Middleware/auth");
const { CreateRestaurant } = require("../Controller/restaurantController");
const { RestaurantValidation } = require("../Validation/restaurantValidation");
const { upload } = require("../Service/upload");
router.post(
  "/createrestaurant",
  validate(RestaurantValidation),
  upload.single("image"),
  auth(),
  CreateRestaurant
);
module.exports = {
  route: router,
};
