const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("hui hui Product");
});

module.exports = router;
