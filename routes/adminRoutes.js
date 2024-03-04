const express = require("express");
const userApprovalController = require("../controller/adminController");
const { isAuth, isAdmin } = require("../middleware/authmiddleware");


const router = express.Router();

// user routes
router.put("/approval-user/:id",isAuth, isAdmin, userApprovalController);

module.exports = router;
