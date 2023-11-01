const bcrypt = require("bcrypt");
const User = require("../../Models/UserModel");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

const registerController = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.send({
        status: "failed",
        message: "This email user already exists",
      });
    }
    if (!name || !email || !mobile || !password) {
      return res.send({ status: "FAIL", message: "All fields required" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
      mobile,
    });
    const jwtToken = jwt.sign(
      { email, encryptedPassword },
      process.env.JWT_SECRECT_KEY,
      {
        expiresIn: 6000,
      }
    );
    return res.send({
      status: "success",
      message: "Register successful",
      user: newUser,
      token: jwtToken,
    });
  } catch (error) {
    res.status(500).send({ status: "FAIL", message: "Something went wrong" });
  }
};
module.exports = registerController;
