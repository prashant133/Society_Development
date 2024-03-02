const express = require("express");
const registerUser = require("../controller/userController");


const router = express.Router();

// user routes
router.post('/register',registerUser)

module.exports = router