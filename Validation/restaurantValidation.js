const Joi = require("joi");

//This validation is not working because the data post from form-data :
const RestaurantValidation = {
  //   formdata: Joi.object().keys({
  //     name: Joi.string().required(),
  //     description: Joi.string(),
  //     image: Joi.string(),
  //     address: Joi.object({
  //       street: Joi.string(),
  //       city: Joi.string(),
  //       state: Joi.string(),
  //       postal_code: Joi.string(),
  //     }),
  //     contact: Joi.object({
  //       phone: Joi.string(),
  //       email: Joi.string().email(),
  //     }),
  //     is_veg: Joi.boolean(),
  //     cuisine: Joi.array().items(Joi.string()),
  //     opening_hours: Joi.object({
  //       monday: Joi.string(),
  //       tuesday: Joi.string(),
  //       wednesday: Joi.string(),
  //       thursday: Joi.string(),
  //       friday: Joi.string(),
  //       saturday: Joi.string(),
  //       sunday: Joi.string(),
  //     }),
  //     menu: Joi.array().items(
  //       Joi.object({
  //         category: Joi.string(),
  //         dishes: Joi.array().items(
  //           Joi.object({
  //             name: Joi.string().required(),
  //             description: Joi.string(),
  //             price: Joi.number().min(0),
  //           })
  //         ),
  //       })
  //     ),
  //     averagerating: Joi.number(),
  //     discountForYou: Joi.string(),
  //     about: Joi.string(),
  //   }),
};

module.exports = {
  RestaurantValidation,
};
