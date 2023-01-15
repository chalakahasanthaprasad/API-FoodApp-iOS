const mongoose = require("mongoose");

const favoriteFoodSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    foodId: { type: String, required: true },
    createdDateTime: { type: Date, default: Date.now() },
});

const favoriteFood = mongoose.model("favoriteFood", favoriteFoodSchema);
module.exports = favoriteFood;
