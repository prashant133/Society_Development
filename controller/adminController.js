const User = require("../models/userModels");

const userApprovalController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // find user by id to approved

    const user = await User.findById(id);
    

    // check if the user is present
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      const { username, email, password, roles, phone, approved } = user;
    //   admin can only change the the approval part of the user
      (user.username = username),
        (user.email = email), // we cannot chage
        (user.password = password), // we cannot chage
        (user.roles = roles), // we cannot chage
        (user.phone = phone), // we cannot chage
        (user.approved = req.body.approved || approved);
    }

    const approvedUser = await user.save();

    res.status(200).send({
      success: true,
      message: "User Approved Successfully",
      approvedUser,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error,
    });
  }
};

// check if the user if user is presnet in database

module.exports = userApprovalController;
