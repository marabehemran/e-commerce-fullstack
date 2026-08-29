const express = require("express");

const authService = require("../controllers/authController");
const {
  addAddressValidator,
} = require("../utils/validators/addressesValidators");

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require("../controllers/addressControllers");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));

router
  .route("/")
  .post(addAddressValidator, addAddress)
  .get(getLoggedUserAddresses);

router.delete("/:addressId", removeAddress);

module.exports = router;
