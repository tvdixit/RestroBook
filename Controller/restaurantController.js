const Restaurant = require("../Schema/restaurantSchema");

const CreateRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant({
      ...req.body,
      image: req.file.filename,
      user_id: req.user.user_id,
    });
    const savedetail = await restaurant.save();
    res.status(201).json({ savedetail });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Restaurant Pagination :
const RestaurantPagination = async (req, res) => {
  const { page = 1, limit = 10, name, is_veg, city } = req.query;
  const query = {};
  try {
    if (name) query.name = { $regex: name, $options: "i" };
    if (is_veg !== undefined) query.is_veg = is_veg === "true";
    if (city) query["address.city"] = { $regex: city, $options: "i" };

    const [restaurants, totalCount] = await Promise.all([
      Restaurant.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("reviews")
        .exec(),
      Restaurant.countDocuments(query).exec(),
    ]);
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
