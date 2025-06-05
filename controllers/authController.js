const userModel = require("../models/user-model");
const productModel = require("../models/product-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user)
      return res.status(401).send("You already have and account Please login");
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("user Created Successfully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) return res.send("Email or password incorrect");

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
      } else {
        res.send("Email or password incorrect");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.logout = function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};

module.exports.addtofav = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let product = await productModel.findById(req.params.productId);
    if (!user || !product) {
      return res.redirect("/error");
    }

    const productIdStr = req.params.productId.toString();
    const userIdStr = user._id.toString();

    // Toggle favourite
    const favIndex = user.favourites.findIndex(
      fav => fav.toString() === productIdStr
    );
    if (favIndex !== -1) {
      user.favourites.splice(favIndex, 1); // remove
    } else {
      user.favourites.push(product._id); // add
    }

    // Toggle like
    const likeIndex = product.like.findIndex(
      id => id.toString() === userIdStr
    );
    if (likeIndex !== -1) {
      product.like.splice(likeIndex, 1);
    } else {
      product.like.push(user._id);
    }

    await user.save();
    await product.save();

    res.redirect("/shop"); // or res.json if doing it via AJAX

  } catch (error) {
    res.send(error.message);
  }
};


module.exports.getFav = async function (req, res) {
  try {
    res.send("YOU GOT ALL FAV");
  } catch (error) {
    res.redirect("/error");
  }
};

module.exports.getWishlist = async function (req, res) {
  try {
    res.send("YOU GOT ALL WISHLIST");
  } catch (error) {
    res.redirect("/error");
  }
};
