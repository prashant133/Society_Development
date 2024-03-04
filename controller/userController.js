const User = require("../models/userModels");
const {
  hashPassword,
  validatePassword,
  comparePassword,
} = require("../services/passwordValidation");

const registerUserController = async (req, res) => {
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

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Provide credentials",
      });
    }

    // check if the user exist
    const user = await User.findOne({ email });

    // if user is not found on the database
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Wrong Credentials",
      });
    }

    // if the user exist then compare the password
    const isValidPassword = await comparePassword(password, user.password);

    // if the password doesnot match
    if (!isValidPassword) {
      return res.status(400).send({
        success: false,
        message: "Wrong Credentials",
      });
    }

    // checking if the user is approved or not
    if (!user.approved) {
      return res.status(400).send({
        success: false,
        message: "User is not yet approved",
      });
    }

    // Depending on the user's role, you can set up different responses
    let roleMessage = "";
    if (user.roles === 1) {
      req.session.isAdmin = true; // set isAdmin flag for admin
      req.session.isAuth = true;

      roleMessage = "Admin login successful";
    } else {
      req.session.isAuth = true;
      roleMessage = "User login successful";
    }
    return res.status(200).send({
      success: true,
      message: roleMessage,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Logged In failed",
      error: error.message,
    });
  }
};

const userUpdateController = async (req, res) => {
  try {
    const { id } = req.params;

    // find the user by user id
    const user = await User.findById(id);

    // check if user is present in the database
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    } else {
      const { username, email, password, roles, phone, approved } = user;

      // check if the user is approved or not
      if (!user.approved) {
        return res.status(400).send({
          success: false,
          message: "user not approved yet",
        });
      }
      // check if the user is adim or simple user.....admin cannot change other credentials
      if (!user.roles) {
        // hash the updated password
        let hashedPassword = await hashPassword(req.body.password);

        // user can change the details but cannot approve id
        user.username = req.body.username || username;
        user.email = req.body.email || email;
        user.password = hashedPassword || password;
        user.roles = req.body.roles || roles;
        user.phone = req.body.phone || phone;
        user.approved = approved;
      } else {
        return res.status(400).send({
          success: false,
          message: "Admin cannot change other credentials",
        });
      }
      const updatedUser = await user.save();

      res.status(200).send({
        success: true,
        message: "User updated Successfully",
        updatedUser,
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in updating",
      error,
    });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  userUpdateController,
};
