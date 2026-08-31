const express = require("express");

const {
    getUserValidator,
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
    updateLoggedUserValidator,
    changeLoggedUserPasswordValidator,
} = require("../utils/validators/userValidator");

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    changeUserPassword,
    deleteUser,
    uploadUserImage,
    resizeImage,
    getLoggedUserData,
    updateLoggedUserPassword,
    updateLoggedUserData,
    deleteLoggedUserData,
} = require("../controllers/userController");

const authService = require("../controllers/authController");

const router = express.Router();


router.use(authService.protect);


router.get(
    "/getMe",
    getLoggedUserData,
    getUser,
);

router.put(
    "/changeMyPassword",
    changeLoggedUserPasswordValidator,
    updateLoggedUserPassword,
);

router.put(
    "/changeMyData",
    updateLoggedUserValidator,
    updateLoggedUserData,
);

router.delete(
    "/deleteMe",
    deleteLoggedUserData,
);


router.use(authService.allowedTo("admin"));

router.put(
    "/changePassword/:id",
    changeUserPasswordValidator,
    changeUserPassword,
);

router
    .route("/")
    .get(getUsers)
    .post(
        uploadUserImage,
        resizeImage,
        createUserValidator,
        createUser,
    );

router
    .route("/:id")
    .get(
        getUserValidator,
        getUser,
    )
    .put(
        uploadUserImage,
        resizeImage,
        updateUserValidator,
        updateUser,
    )
    .delete(
        deleteUserValidator,
        deleteUser,
    );

module.exports = router;