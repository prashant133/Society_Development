const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "poll",
    required: true,
  },
  userId: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      option: {
        type: String,
        required: true,
      },
    },
  ],
});

const Vote = mongoose.model("vote", voteSchema);

module.exports = Vote;
