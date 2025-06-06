const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  addtofav,
  getFav,
  getWishlist,
  remfromfav
} = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");
router.get("/", function (req, res) {
  res.send("hui hui users");
});

router.get("/logout", logout);
router.post("/login", loginUser);
router.get("/favourites",isLoggedIn, getFav); //Get all Favorites
router.get("/wishlist", getWishlist); //get all Wishlist
router.post("/register", registerUser);
router.get("/addtofavourite/:productId",isLoggedIn, addtofav); //add/Remove  one product to/from fav

module.exports = router;
