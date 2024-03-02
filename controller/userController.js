const User = require("../models/userModels");
const {
  hashPassword,
  validatePassword,
} = require("../services/passwordValidation");

const registerUser = async (req, res) => {
  try {
    // destructuring the data from the body
    const { username, email, password, phone } = req.body;

    // validation
    if (!username || !email || !password || !phone) {
      return res.status(400).send("Provide the credentials");
    }
    //    checking the validting of the passwrod
    if (!validatePassword(password)) {
      return res.status(400).send({
        message:
          "Password must include special character, Uppercase, lowercase, and a number",
      });
    }

    // check the existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User Exists",
      });
    }
    // hashing the user password before saving in the database
    const hashedPassword = await hashPassword(password);

    // save the user in the database
    const user = await new User({
      username: username,
      email: email,
      password: hashedPassword,
      phone: phone,
    }).save();

    return res.status(200).send({
      success: true,
      message: "User created Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

module.exports = registerUser;
