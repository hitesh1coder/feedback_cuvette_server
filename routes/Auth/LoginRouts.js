const bcrypt = require("bcrypt");
const User = require("../../Models/UserModel");
const jwt = require("jsonwebtoken");

const loginroute = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user) {
      let matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        const jwtToken = jwt.sign({ email }, process.env.JWT_SECRECT_KEY, {
          expiresIn: 6000,
        });
        res.status(200).send({
          name: user.name,
          message: "user loged in successfully",
          token: jwtToken,
        });
      } else {
        res
          .status(501)
          .send({ status: "failed", message: "crediancials did't matched" });
      }
    } else {
      res.status(502).send({
        status: "failed",
        message: "this email user is not registered",
      });
    }
  } catch (error) {
    res
      .status(503)
      .send({ status: "failed", message: "incorrect credentials" });
  }
};

module.exports = loginroute;
