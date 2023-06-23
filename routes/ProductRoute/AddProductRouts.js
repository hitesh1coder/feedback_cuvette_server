const jwt = require("jsonwebtoken");
const Product = require("../../Models/ProductModel");

const addproductroutes = async (req, res) => {
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
    // checking user is logged in or not
    // middleware
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);
    const id = decoded.id;
    if (decoded) {
      const product = await Product.create({
        id,
        companyname,
        categoryArray,
        logourl,
        productlink,
        productdesc,
      });
      res.status(201).json({ message: "SUCCESS", product });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "You are not Authorised user! Login again ", error });
  }
};

module.exports = addproductroutes;
