const jwt = require("jsonwebtoken");
const Product = require("../../Models/ProductModel");

const addProductController = async (req, res) => {
  const { companyname, category, logourl, productlink, productdesc } = req.body;
  const categoryArray = category.split(" ");
  try {
    if (
      !companyname ||
      !categoryArray.length < 0 ||
      !logourl ||
      !productlink ||
      !productdesc
    ) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }
    const product = await Product.create({
      // id,
      companyname,
      categoryArray,
      logourl,
      productlink,
      productdesc,
    });
    res.status(201).json({ message: "SUCCESS", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = addProductController;
