const mongoose = require("mongoose");

//Restaurant Save or Unsave Model Schema :
const saveUnsavedSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  is_save: {
    type: Number,
    default: 1,
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

module.exports = mongoose.model("SaveUnsaved", saveUnsavedSchema);
