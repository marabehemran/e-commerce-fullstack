const express = require("express");
const {
  signupUserValidator,
  loginUserValidator,
} = require("../utils/validators/authValidators");

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

// router.put(
//   "/changePassword/:id",
//   changeUserPasswordValidator,
//   changeUserPassword,
// );

router.post("/signup", signupUserValidator, signup);
router.post("/login", loginUserValidator, login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyPassResetCode);
router.put("/resetPassword", resetPassword);

// router
//   .route("/:id")
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

module.exports = router;
