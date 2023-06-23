const Product = require("../../Models/ProductModel");

const uservoteroute = async (req, res) => {
  let vote = 1;
  // uservote = parseInt(uservote);
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    let fetchvotes = await product.uservote;
    if (fetchvotes > 0) {
      const votes = await product.updateOne({ uservote: fetchvotes + 1 });
      return res.status(201).json({ message: "SUCCESS" });
    } else {
      const votes = await product.updateOne({ uservote: vote });
      return res.status(201).json({ message: "SUCCESS" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};

module.exports = uservoteroute;
