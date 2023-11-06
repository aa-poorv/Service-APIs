const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.newUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (user) return next({ status: 404, message: "User already exist" });

  if (!req.body.password)
    return next({ status: 404, message: "Password not provided" });

  req.body.password = await bcrypt.hash(req.body.password, 10);
  next();
};

exports.isValidUser = async (email, password) => {
  const user = await User.findOne({ email });
  let isValidUser = false;
  if (user) {
    isValidUser = await bcrypt.compare(password, user.password);
  }
  return isValidUser ? user : isValidUser;
};
