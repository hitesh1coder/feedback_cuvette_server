const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Auth Error: Please provide a token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(501).json({ message: "Invalid token" });
  }
};
