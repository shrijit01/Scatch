const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    let { name, price, discount, bgColor, panelColor, textColor } = req.body;

    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgColor,
      panelColor,
      textColor,
    });
    req.flash("success", "products created successfully");
    res.redirect("/owners/admin");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/delete/:productId",async function(req,res){
  try {
    
  } catch (error) {
    
  }
})

module.exports = router;
