const JWT = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const access_key = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      audience: userId,
      issuer: "Apoorv Pandey",
      expiresIn: "1d",
    };
    JWT.sign(payload, access_key, options, (err, data) => {
      if (err) reject({ status: 500, message: err.message });
      resolve(data);
    });
  });
};

exports.verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"])
    return next({ status: 401, message: "Access token is required" });
  const authHeader = req.headers["authorization"];
  const bearToken = authHeader.split(" ");
  const token = bearToken[1];

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "JsonWebTokenError")
        throw next({ status: 403, message: "Authentication failed" });
      else throw next({ status: 401, message: err.message });
    }
    req.userId = payload.aud;
    User.findById(req.userId)
      .then((data) => {
        if (data) next();
        else throw next({ status: 401, message: "User not found" });
      })
      .catch((err) => {
        next({ status: 500, message: err.message });
      });
  });
};

exports.signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const refresh_key = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      audience: userId,
      issuer: "Apoorv Pandey",
      expiresIn: "1d",
    };

    JWT.sign(payload, refresh_key, options, (err, result) => {
      if (err) reject({ status: 500, message: err.message });

      resolve(result);
    });
  });
};

exports.verifyRefreshToken = (req, res, next) => {
  if (!req.cookies.jwt)
    return next({
      status: 401,
      message: "Error no refresh token provided",
    });
  const token = req.cookies.jwt;

  JWT.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err && err.name !== "TokenExpiredError")
      return next({ status: 401, message: err.message });
    else if (err && err.name === "TokenExpiredError") {
      const output = JWT.verify(token, process.env.REFRESH_TOKEN_SECRET, {
        ignoreExpiration: true,
      });
      req.userInfo = { token: output.aud, isExpired: true };
    } else {
      req.userInfo = { token: payload.aud, isExpired: false };
    }
    next();
  });
};
