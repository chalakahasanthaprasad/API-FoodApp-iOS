const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
