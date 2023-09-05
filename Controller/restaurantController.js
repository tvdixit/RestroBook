const Restaurant = require("../Schema/restaurantSchema");

//Create Restaurant Api :
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

//Restaurant Pagination Api :
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

//Restaurant Sorting Api :
const RestaurantSorting = async (req, res) => {
  try {
    let sorting = {};

    if (req.query.sortby === "rating-high-to-low") {
      sorting = { averagerating: -1 };
    } else if (req.query.sortby === "price-high-to-low") {
      sorting = { "menu.dishes.price": -1 };
    } else if (req.query.sortby === "price-low-to-high") {
      sorting = { "menu.dishes.price": 1 };
    } else {
      sorting = { averagerating: -1 };
    }

    const restaurants = await Restaurant.find().sort(sorting);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Restaurant get by Category Api:
const RestaurantsbyCategory = async (req, res) => {
  try {
    const query = {};

    if (req.query.trending === "true") {
      query.isTrending = true;
    }

    if (req.query.happyHours === "true") {
      query.happyHoursAvailable = true;
    }

    if (req.query.newOpen) {
      if (req.query.newOpen === "false") {
        const allRestaurants = await Restaurant.find();
        return res.status(200).json(allRestaurants);
      } else {
        query.openingDate = { $gte: new Date(req.query.newOpen) };
      }
    }

    if (req.query.outdoorDining === "true") {
      query.outdoorDiningAvailable = true;
    }

    const filteredRestaurants = await Restaurant.find(query);
    res.status(200).json(filteredRestaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  CreateRestaurant,
  RestaurantPagination,
  RestaurantSorting,
  RestaurantsbyCategory,
};
