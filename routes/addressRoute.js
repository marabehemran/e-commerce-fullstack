const express = require("express");

const authService = require("../controllers/authController");

const {
    addAddressValidator,
    updateAddressValidator,
    deleteAddressValidator,
} = require("../utils/validators/addressesValidators");

const {
    addAddress,
    removeAddress,
    getLoggedUserAddresses,
    updateAddress,
} = require("../controllers/addressControllers");

const router = express.Router();

router.use(
    authService.protect,
    authService.allowedTo("user"),
);

router
    .route("/")
    .get(getLoggedUserAddresses)
    .post(
        addAddressValidator,
        addAddress,
    );

router
    .route("/:addressId")
    .put(
        updateAddressValidator,
        updateAddress,
    )
    .delete(
        deleteAddressValidator,
        removeAddress,
    );

module.exports = router;