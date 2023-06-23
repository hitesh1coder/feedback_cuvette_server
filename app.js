const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const registerroute = require("./routes/Auth/RegisterRouts");
const loginroute = require("./routes/Auth/LoginRouts");
const addproductroutes = require("./routes/ProductRoute/AddProductRouts");
const usercommentroute = require("./routes/commentsRoutes/AddCommentRout");
const getfilterproductroute = require("./routes/ProductRoute/GetFilterProduct");

const uservoteroute = require("./routes/VoteRoute/VoteRoutes");
const Product = require("./Models/ProductModel");

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
  res.send(product);
});

// Routes
app.post("/register", registerroute);
app.post("/login", loginroute);
app.post("/add-product", addproductroutes);
app.get("/products", getfilterproductroute);
app.post("/product/add-comment/:id", usercommentroute);
app.post("/product/add-like/:id", uservoteroute);

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
  console.log(`listening on port ${port}`);
});
