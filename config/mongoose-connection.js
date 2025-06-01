const mongoose = require("mongoose");
// const env = require('dotenv').config();
const config = require("config")
const debug = require("debug")("development:mongoose")

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(function (req, res) {
    debug(`connected `,);// ${process.env.PORT}
  })
  .catch(function (err) {
    debug(err);
  });


module.exports = mongoose.connection;