const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const flash = require("connect-flash");
const isLoggedIn = require("../middlewares/isLoggedIn");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(501).send("You don't have permission to create");
    }
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

router.get("/admin",isLoggedIn, function (req, res) {
  let success = req.flash("success");
  res.render("createProducts",{success,page:"Admin Panel"});
});

module.exports = router;
