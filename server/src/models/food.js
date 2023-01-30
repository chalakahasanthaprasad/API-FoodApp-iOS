const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodId: { type: String, required: true, unique: true, maxlength: 10 },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false, maxlength: 250 },
  cuisine: { type: String, required: true },

  calories: { type: String },
  carbohydrates: { type: String },
  fat: { type: String },
  protein: { type: String },
  sugar: { type: String },

  ingredient: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});

const food = mongoose.model("food", foodSchema);
module.exports = food;
