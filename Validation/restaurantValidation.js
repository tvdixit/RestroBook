const Joi = require("joi");
const RestaurantValidation = {
  // FormData: Joi.object().keys({
  //   name: Joi.string().required(),
  //   address: Joi.string().required(),
  //   image: Joi.string().required(),
  //   rating: Joi.string().required(),
  //   phone: Joi.number().required(),
  //   is_veg: Joi.boolean().required(),
  //   is_save: Joi.boolean().required(),
  //   discount: Joi.string(),
  //   description: Joi.string().required(),
  //   // cuisine: Joi.string()
  //   //   .valid("Indian", "Chinese", "Thai", "Italian", "Mexican", "Others")
  //   //   .required(),
  //   price: Joi.string(),
  //   // user_id: Joi.string(),
  //   reviews: Joi.string(),
  // }),
};

module.exports = {
  RestaurantValidation,
};
