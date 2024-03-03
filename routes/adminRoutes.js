const express = require("express");
const userApprovalController = require("../controller/adminController");


const router = express.Router();

// user routes
router.put("/approval-user/:id", userApprovalController);

module.exports = router;
