const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const { newUser } = require("../middlewares/newUserVerify");
const router = express.Router();

router.route("/signup").post(newUser, signup);
router.route("/signin").post(signin);

module.exports = router;
