const Poll = require("../models/pollModel");
const User = require("../models/userModels");

const mongoose = require("mongoose");
const Vote = require("../models/voteModels");

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
      question: question,
      option: option,
    });

    return res.status(200).send({
      success: true,
      message: "Poll created successfully",
      newPoll,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in creating poll",
    });
  }
};

// delete a poll created by the admin
const deletePollController = async (req, res, next) => {
  try {
    // get the pollid from params
    const { pollId } = req.params;

    // validate pollId
    if (!mongoose.Types.ObjectId.isValid(pollId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid pollId",
      });
    }

    // find the poll in the database
    const poll = await Poll.findByIdAndDelete(pollId);

    // also delete the votes associated with in pollID
    await Vote.deleteMany({ pollId });

    return res.status(200).send({
      success: true,
      message: "Poll deleted successfully",
      deletedPoll: poll,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting Poll",
    });
  }
};

module.exports = {
  userApprovalController,
  createPollController,
  deletePollController,
};

// 65e74370ca0f18b79568848b
