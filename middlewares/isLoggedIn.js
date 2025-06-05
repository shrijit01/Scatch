const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
require("dotenv").config();

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "You need to loggin first");
    return res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password"); //password nhi chiye
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("/");
  }
};
