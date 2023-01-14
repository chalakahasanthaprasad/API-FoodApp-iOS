const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeNo: { type: String, required: true, unique: true, maxlength: 10 },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false, maxlength: 250 },
  categorie: { type: Array, required: true, default: [] },
  ingredient: { type: Array, required: true, default: [] },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});

const recipe = mongoose.model("recipe", recipeSchema);
module.exports = recipe;
