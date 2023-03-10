const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
// Create a Express
const app = express();

// Config .env
dotenv.config();

// Define a PORT
//const PORT = process.env.APP_RUNNING_PORT || 3000;

// Add Middleware Path
//const logger = require("./src/middlewares/logger");

// Add Routes
const foodRouter = require("./src/routes/food");
const userRouter = require("./src/routes/user");
const favoriteFoodRouter = require("./src/routes/favoriteFood");

// Add Middlewares routes
app.use(cors());
app.use(express.json());
//app.use(logger);
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/favorite", favoriteFoodRouter);

// Check runing port
// app.listen(PORT, () => {
//   console.log(`Successfully runing on Port : ${PORT}`);
// });

// Mongo DB Connections
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb !"))
  .catch((err) => console.log(`Error has occured: ${err}`));

module.exports = app;
module.exports.handler = serverless(app);
