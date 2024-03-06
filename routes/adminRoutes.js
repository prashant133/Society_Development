const express = require("express");

const { isAuth, isAdmin } = require("../middleware/authmiddleware");
const {
  userApprovalController,
  createPollController,
  deletePollController,
} = require("../controller/adminController");

const router = express.Router();

// admin routes
router.put("/approval-user/:id", isAuth, isAdmin, userApprovalController);
router.post("/create-poll/", isAuth, isAdmin, createPollController);
router.delete("/delete-poll/:pollId", isAuth, isAdmin, deletePollController);

module.exports = router;
