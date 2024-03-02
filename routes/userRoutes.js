const express = require("express");
const {
  registerUserController,
  loginUserController,
  dashboardController,
} = require("../controller/userController");
const { isAuth, isAdmin } = require("../middleware/authmiddleware");


const router = express.Router();

// user routes
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/dashboard",isAuth,dashboardController);

module.exports = router;
