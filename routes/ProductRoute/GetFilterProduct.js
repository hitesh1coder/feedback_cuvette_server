const Product = require("../../Models/ProductModel");

const getfilterproductroute = async (req, res) => {
  try {
    let sortorder = 0;
    let userInput = req.query.sortorder;
    if (userInput === "Upvote") {
      sortorder = -1;
    } else if (userInput === "Downvote") {
      sortorder = 1;
    }
    let category = req.query.category || req.query;
    if (category === "All") {
      const allproduct = await Product.find().sort({ uservote: sortorder });
      return res.status(200).json(allproduct);
    } else {
      const filterProduct = await Product.find({
        categoryArray: { $in: [category] },
      }).sort({ uservote: sortorder });
      res.status(200).json(filterProduct);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = getfilterproductroute;
