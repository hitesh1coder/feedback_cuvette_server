const mongoose = require("mongoose");

const Vote = mongoose.model("Vote", {
  uservote: Number,
});

module.exports = Vote;
