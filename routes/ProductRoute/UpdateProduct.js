const Product = require("../../Models/ProductModel");

const updateProductrout = async (req, res) => {
  const { companyname, category, logourl, productlink, productdesc } = req.body;
  const id = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      companyname: companyname || req.body.companyname,
      categoryArray: category || req.body.category,
      logourl: logourl || req.body.logourl,
      productlink: productlink || req.body.productlink,
      productdesc: productdesc || req.body.productdesc,
    });

    res
      .status(201)
      .json({ message: "Successfully Updated", data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "You are not authorized user! Login again", error });
  }
};
module.exports = updateProductrout;
