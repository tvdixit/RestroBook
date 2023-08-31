const Restaurant = require("../Schema/restaurantSchema");

const CreateRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant({
      ...req.body,
      image: req.file.filename,
    });
    const savedetail = await restaurant.save();
    res.status(201).json({ savedetail });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  CreateRestaurant,
};
