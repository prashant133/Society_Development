const express = require("express");
const {
  registerUserController,
  loginUserController,
  userUpdateController,
  voteController,
  addSuggestionController,
} = require("../controller/userController");
const { isAuth, isAdmin } = require("../middleware/authmiddleware");

const router = express.Router();

// user routes
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.put("/update/:id", isAuth, userUpdateController);

// to vote in the poll
router.post("/polls/:pollId/:userId", isAuth, voteController);

// route to add the suggestion 
router.post("/add-suggestion/:userId",isAuth, addSuggestionController)

module.exports = router;
