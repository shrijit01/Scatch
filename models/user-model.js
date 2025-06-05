const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/scatch");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    minLength: 3,
  },
  email: String,
  //  {
  //   type:String,
  //   unique:true
  // },
  password: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  // wishlist: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "product",
  //   },
  // ],
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("user", userSchema);
