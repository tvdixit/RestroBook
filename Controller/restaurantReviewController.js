const Review = require("../Schema/RestaurantreviewSchema");
const RestaurantReview = async (req, res) => {
  try {
    const review = new Review({
      rating_by: req.user.user_id,
      ...req.body,
    });

    const savedetail = await review.save();
    res.status(200).json({ savedetail });
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  RestaurantReview,
};
