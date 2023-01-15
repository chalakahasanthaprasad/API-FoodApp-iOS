const express = require("express");
const userRouter = express.Router();
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
        userEmail: req.params.email,
      });
  
      if (!user) {
        let errorObj = {
          message:
            "The given user Id does not existing on our system",
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
    try {
      const user = new userModel({
        _id: req.body.userNo,
        name: req.body.name,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
        isActive: req.body.isActive,
        createdDateTime: req.body.createdDateTime
      });
  
      const newUser = await user.save();
      res.status(200).send(newUser);
    } catch (err) {
      return res.status(500).send(`Error: ${err.message}`);
    }
  });

module.exports = userRouter;