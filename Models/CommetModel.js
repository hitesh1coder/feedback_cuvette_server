const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", {
  usercomment: String,
});

module.exports = Comment;
