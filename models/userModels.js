const mongoose = require("mongoose");
const emailValidation = require("../services/emailValidation");
const { validatePassword } = require("../services/passwordValidation");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      validate: {
        validator: emailValidation,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
