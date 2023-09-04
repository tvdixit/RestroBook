const Review = require("../Schema/RestaurantreviewSchema");
const Restaurant = require("../Schema/restaurantSchema");

const calculateAverageRating = async (restaurantId) => {
  try {
    const reviews = await Review.find({ restaurant_id: restaurantId });

    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.star_rating,
      0
    );

    const averageRating = totalRating / reviews.length;

    return averageRating;
  } catch (error) {
    console.error("Error calculating average rating:", error);
    throw error;
  }
};

const RestaurantReview = async (req, res) => {
  try {
    const review = new Review({
      rating_by: req.user.user_id,
      ...req.body,
    });
    const savedReview = await review.save();
    let restaurant = await Restaurant.findOne({
      _id: req.body.restaurant_id,
    });

    if (!restaurant) {
      restaurant = new Restaurant({
        ...req.body.restaurantData,
        reviews: [savedReview._id],
      });
      await restaurant.save();
    } else {
      restaurant.reviews.push(savedReview._id);
      await restaurant.save();
    }
    const averageRating = await calculateAverageRating(req.body.restaurant_id);
    await Restaurant.updateOne(
      { _id: req.body.restaurant_id },
      { $set: { averagerating: averageRating } }
    );
    res.status(200).json({ savedReview, averageRating });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  RestaurantReview,
};
