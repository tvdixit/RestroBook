const Restaurant = require("../Schema/restaurantSchema");

const CreateRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant({
      ...req.body,
      image: req.file.filename,
      user_id: req.user.user_id,
      // reviews: req.body.reviews,
    });
    const savedetail = await restaurant.save();
    res.status(201).json({ savedetail });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Restaurant Pagination :
const RestaurantPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const name = req.query.name;
  const is_veg = req.query.is_veg;
  const city = req.query.city;
  const query = {};
  try {
    if (name || is_veg !== undefined || city) {
      if (name) {
        query["name"] = { $regex: name, $options: "i" };
      }
      if (is_veg !== undefined) {
        query["is_veg"] = is_veg === "true";
      }
      if (city) {
        query["address.city"] = { $regex: city, $options: "i" };
      }
    }
    const restaurants = await Restaurant.find(query)
      .skip(skip)
      .limit(limit)
      .populate("reviews")
      .exec();

    const totalCount = await Restaurant.countDocuments(query).exec();

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      restaurants,
      currentPage: page,
      totalPages,
      totalItems: totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  CreateRestaurant,
  RestaurantPagination,
};
