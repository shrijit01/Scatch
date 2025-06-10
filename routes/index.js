const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", async function (req, res) {
  try {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false,page:"Signup/Login" });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/shop", isLoggedIn, async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success,user,page:"shop" });
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/profile", isLoggedIn, async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.send("User not found");
    res.render("profile", { user,page:"Profile" });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/cart", isLoggedIn, async function (req, res) {
  try {
    let user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");
    let totalPrice = 0;
    let totalDiscount = 0;
    user.cart.forEach((product) => {
      totalPrice += product.price || 0;
      totalDiscount += product.discount || 0;
    });
    let success = req.flash("success");
    let bill = totalPrice + 20 - totalDiscount;
    res.render("cart", { user, bill, success ,page:"Cart"});
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    if(user.cart.includes(req.params.productid)) {
      req.flash("success", "Product already in cart");
      return res.redirect(req.get("referer"));
    }
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to Cart");
    res.redirect("/shop");
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/removefromcart/:productid", isLoggedIn, async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let productIndex = user.cart.indexOf(req.params.productid);
    user.cart.splice(productIndex, 1);
    await user.save();
    req.flash("success", "Removed From Cart");
    res.redirect("/cart");
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/logout", isLoggedIn, async function (req, res) {
  res.redirect("/");
});

router.get("/error", function (req, res) {
  let error = req.flash("error");
  res.render("error", { error, loggedin: false });
});

module.exports = router;
