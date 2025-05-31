const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("hui hui Owner");
});

module.exports = router;
