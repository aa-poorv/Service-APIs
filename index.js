require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const categoryRouter = require("./routes/category.route");
const Category = require("./models/category.model");
const { verifyAccessToken } = require("./helper/jwt_helper");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/category", categoryRouter);

app.get("/categories", verifyAccessToken, async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

app.get("*", (req, res, next) => {
  res.status(404).json("Route not found");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message || "Internal Server error",
  });
});

module.exports = app;
