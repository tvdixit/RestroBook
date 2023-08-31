const Review = require("../Schema/RestaurantreviewSchema");
const RestaurantReview = async (req, res) => {
  try {
    const review = new Review({
      user_id: req.user.user_id,
      ...req.body,
    });
    await review.save();
    res.status(200).json({ review });
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  RestaurantReview,
};
