const mongoose = require("mongoose");
const env = require('dotenv').config();
mongoose
  .connect(process.env.DB_URL)
  .then(function (req, res) {
    console.log(`connected in ${process.env.PORT} `,);
  })
  .catch(function (err) {
    console.log(err);
  });


module.exports = mongoose.connection;