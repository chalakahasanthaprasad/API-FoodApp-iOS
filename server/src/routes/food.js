const express = require("express");
const foodRouter = express.Router();
const foodModel = require("../models/food");

// Get all foods
foodRouter.get("/", async (req, res) => {
  try {
    let food = await foodModel.find();

    res.status(200).send(food);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get food item details by Item Id
foodRouter.get("/:foodId", async (req, res) => {
  try {
    let food = await foodModel.findOne({
      foodId: req.params.foodId,
    });

    if (!food) {
      let errorObj = {
        message: "The given food Id does not exist",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    res.status(200).send(food);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Get food item details by food name
foodRouter.get("/store/:name", async (req, res) => {
  try {
    let food = await foodModel.find({
      name: req.params.name,
    });

    if (!food) {
      let errorObj = {
        message: "The given food name does not exist",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    res.status(200).send(food);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Get food item details by cuisine
foodRouter.get("/cuisine/:cuisine", async (req, res) => {
  try {
    let food = await foodModel.find({
      cuisine: req.params.cuisine,
    });

    if (!food) {
      let errorObj = {
        message: "The given cuisine type does not exist",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    res.status(200).send(food);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

module.exports = foodRouter;
