const express = require("express");

const { isAuth, isAdmin } = require("../middleware/authmiddleware");
const { userApprovalController, createPollController } = require("../controller/adminController");


const router = express.Router();

// user routes
router.put("/approval-user/:id",isAuth, isAdmin, userApprovalController);
router.post('/create-poll/',isAuth,isAdmin, createPollController)

module.exports = router;
