const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./Middleware/auth");

const Product = require("./Models/ProductModel");
const registerController = require("./Controller/Auth/RegisterController");
const loginController = require("./Controller/Auth/LoginController");
const addProductController = require("./Controller/ProductController/AddProductController");
const usercommentController = require("./Controller/commentsController/AddCommentController");
const getfilterproductController = require("./Controller/ProductController/GetFilterProduct");
const userVoteController = require("./Controller/VoteController/VoteController");
const updateProductController = require("./Controller/ProductController/UpdateProduct");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

app.get("/", async (req, res) => {
  const allproduct = await Product.find();
  res.send(allproduct);
});

// get one product
app.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Routes
app.post("/register", registerController);
app.post("/login", loginController);
app.post("/add-product", auth, addProductController);
app.get("/products", getfilterproductController);
app.put("/product/update/:id", updateProductController);
app.post("/product/add-comment/:id", usercommentController);
app.post("/product/add-like/:id", userVoteController);

// / Error Handling middlewere
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((err) => console.log("connection error: " + err));
app.listen(port, () => {
  console.log(`listening on  ${port}`);
});
