const mongoose = require("mongoose");

const pollSchema = mongoose.Schema(
  {
    question: {
      type: String,
      unique: false,
      required: true,
    },
    option: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Poll = mongoose.model("poll", pollSchema);

module.exports = Poll;
