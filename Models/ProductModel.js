const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  companyname: String,
  categoryArray: [],
  logourl: String,
  productlink: String,
  productdesc: String,
  uservote: Number,
  usercomment: [],
});

module.exports = Product;
