const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

// Get all users
userRouter.get("/", async (req, res) => {
  try {
    let user = await userModel.find();

    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get user details by email
userRouter.get("/:email", async (req, res) => {
  try {
    let user = await userModel.findOne({
      email: req.params.email,
    });

    if (!user) {
      let errorObj = {
        message: "The given user Id does not existing on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Insert new user
userRouter.post("/", async (req, res) => {
  let hashData = await bcrypt.genSalt(12);
  let hashedPw = await bcrypt.hash(req.body.password, hashData);
  try {
    const user = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPw,
      isActive: req.body.isActive,
      createdDateTime: req.body.createdDateTime,
    });

    const newUser = await user.save();
    res.status(200).send("Successfully Insert New User!");
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = userRouter;
