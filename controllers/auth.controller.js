const { signAccessToken } = require("../helper/jwt_helper");
const { isValidUser } = require("../middlewares/newUserVerify");
const User = require("../models/user.model");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = await signAccessToken(newUser.id);
    res.status(201).json(token);
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await isValidUser(email, password);

    if (validUser) {
      const token = await signAccessToken(validUser.id);
      res.status(200).json(token);
    } else {
      throw { status: 403, message: "Invalid email or password" };
    }
  } catch (err) {
    next(err);
  }
};
