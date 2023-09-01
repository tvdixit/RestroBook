const Review = require("../Schema/RestaurantreviewSchema");
const RestaurantReview = async (req, res) => {
  try {
    const review = new Review({
      rating_by: req.user.user_id,
      ...req.body,
    });

    const savedetail = await review.save();
    const averageRating = await calculateAverageRating(req.body.restaurant_id);
    res.status(200).json({ savedetail, averageRating });
  } catch (err) {
    res.status(400).json(err);
  }
};
async function calculateAverageRating(restaurantId) {
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
}
module.exports = {
  RestaurantReview,
};
