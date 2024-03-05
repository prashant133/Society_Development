const Poll = require("../models/pollModel");
const User = require("../models/userModels");

// to approve the user by the admin
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

// create a poll by the admin

const createPollController = async (req, res, next) => {
  try {
    // destructure the data from th body
    const { question, option } = req.body;

    // validate the data from the form

    if (!question || !option) {
      return res.status(400).send({
        success: false,
        message: "Fill out the form",
      });
    }
    const newPoll = await Poll.create({
      question : question,
      option : option
    });

    return res.status(200).send({
      success : true,
      message : "Poll created successfully",
      newPoll
    })
  } catch (error) {
     return res.status(400).send({
       success: false,
       message: "Error in creating poll",
     });
  }
};

module.exports = { userApprovalController, createPollController };
