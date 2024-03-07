const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema(
  {
    user: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        suggestion: {
          type: String,
          required: true,
          trim: false,
          unique: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Suggestion = mongoose.model("suggestion", suggestionSchema);

module.exports = Suggestion;
