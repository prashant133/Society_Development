const express = require("express");
const {
  registerUserController,
  loginUserController,
  userUpdateController,
} = require("../controller/userController");
const { isAuth, isAdmin } = require("../middleware/authmiddleware");

const router = express.Router();

// user routes
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.put("/update/:id", isAuth, userUpdateController);

module.exports = router;
