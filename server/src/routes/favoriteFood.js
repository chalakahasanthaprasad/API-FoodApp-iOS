const express = require("express");
const favoriteFoodRouter = express.Router();
const async = require("async");
const favoriteFoodModel = require("../models/favoriteFood");
const foodModel = require("../models/food");

// Get favorite foods details by user id
favoriteFoodRouter.get("/:userId", async (req, res) => {
  try {
    let favoriteFoods = await favoriteFoodModel
      .find({
        userId: req.params.userId,
      })
      .sort({
        createdDateTime: "desc",
      });

    if (favoriteFoods.length === 0) {
      let errorObj = {
        message:
          "The given user does not match any favorite foods on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    //Get foods details according to the user
    let foods = await async.map(favoriteFoods, async (food) => {
      return await foodModel.findOne({ foodId: food.foodId }).select({
        foodId: 1,
        name: 1,
        imageUrl: 1,
      });
    });

    if (!foods) {
      let errorObj = {
        message: "The given food Id does not match any food on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(foods);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Insert favorite food detail
favoriteFoodRouter.post("/", async (req, res) => {
  try {
    //Check mandatory value userId
    if (!req.body.userId) {
      let errorObj = {
        message: "Cannot find UserId.",
        status: "SYSTEM ERROR",
      };
      return res.status(400).send(errorObj);
    }

    //Check mandatory value foodOutletId
    if (!req.body.foodId) {
      let errorObj = {
        message: "Cannot find food.",
        status: "SYSTEM ERROR",
      };
      return res.status(400).send(errorObj);
    }

    //Check outlet is alredy added
    let checkExistfavFood = await favoriteFoodModel.findOne({
      userId: req.body.userId,
      foodId: req.body.foodId,
    });

    if (checkExistfavFood) {
      let errorObj = {
        message: "This food data alredy added.",
        status: "ALREDY EXISTS",
      };
      return res.status(400).send(errorObj);
    }

    //Insert favorite food data
    let favoriteFood = new favoriteFoodModel({
      userId: req.body.userId,
      foodId: req.body.foodId,
    });

    const newfavoriteFood = await favoriteFood.save();
    res.status(200).send("Successfully Add Favorite Food List!");
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Delete favorite food by userId & outletId
favoriteFoodRouter.delete("/:userId/:foodId", async (req, res) => {
  try {
    //Check outlet is alredy added in the system
    let checkExistfavOutlet = await favoriteFoodModel.findOne({
      userId: req.params.userId,
      foodId: req.params.foodId,
    });

    if (!checkExistfavOutlet) {
      let errorObj = {
        message:
          "The given user Id & outlet Id does not match any favorite food on our system",
        statusCode: "SYSTEM ERROR : NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    //Delete favorite outlet
    let deletedFavoriteFood = await favoriteFoodModel.findOneAndDelete({
      userId: req.params.userId,
      foodId: req.params.outletId,
    });

    res.status(200).send(deletedFavoriteFood);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = favoriteFoodRouter;
