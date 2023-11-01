const Product = require("../../Models/ProductModel");

const usercommentController = async (req, res) => {
  const { usercomment } = req.body;
  const id = req.params.id;
  try {
    if (!usercomment) {
      return res.status(400).json({ msg: "Please enter some text" });
    }
    const product = await Product.findById(id);
    const comment = await product.updateOne({
      $push: { usercomment: usercomment },
    });

    return res.status(201).json({ message: "SUCCESS", comment });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};

module.exports = usercommentController;
