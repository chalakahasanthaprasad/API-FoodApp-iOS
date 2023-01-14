const express = require("express");
const recipeRouter = express.Router();
const recipeModel = require("../models/recipe");

// Get all recipes
recipeRouter.get("/", async (req, res) => {
  try {
    let recipe = await recipeModel.find();

    res.status(200).send(recipe);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = recipeRouter;
