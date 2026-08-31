const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");

const factory = require("./handlersFactory");
const ApiError = require("../utils/ApiError");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const User = require("../models/userModel");
const createToken = require("../utils/createToken");

// Upload single image
exports.uploadUserImage = uploadSingleImage("profileImg");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`uploads/users/${filename}`);

        req.body.profileImg = filename;
    }

    next();
});

/**
 * @desc    Get all users
 * @route   /api/v1/users
 * @method  GET
 * @access  Private/Admin
 */
exports.getUsers = factory.getAll(User);

/**
 * @desc    Get user by id
 * @route   /api/v1/users/:id
 * @method  GET
 * @access  Private/Admin
 */
exports.getUser = factory.getOne(User);

/**
 * @desc    Create user
 * @route   /api/v1/users
 * @method  POST
 * @access  Private/Admin
 */
exports.createUser = factory.createOne(User);

/**
 * @desc    Update user by id
 * @route   /api/v1/users/:id
 * @method  PUT
 * @access  Private/Admin
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
    const document = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            phone: req.body.phone,
            email: req.body.email,
            profileImg: req.body.profileImg,
            role: req.body.role,
        },
        {
            new: true,
        },
    );

    if (!document) {
        return next(
            new ApiError(`No document for this id ${req.params.id}`, 404),
        );
    }

    res.status(200).json({
        data: document,
    });
});

/**
 * @desc    Change user's password by admin
 * @route   /api/v1/users/changePassword/:id
 * @method  PUT
 * @access  Private/Admin
 */
exports.changeUserPassword = asyncHandler(
    async (req, res, next) => {
        const document = await User.findByIdAndUpdate(
            req.params.id,
            {
                password: await bcrypt.hash(req.body.password, 12),
                passwordChangedAt: Date.now(),
            },
            {
                new: true,
            },
        );

        if (!document) {
            return next(
                new ApiError(
                    `No document for this id ${req.params.id}`,
                    404,
                ),
            );
        }

        res.status(200).json({
            data: document,
        });
    },
);

/**
 * @desc    Delete user by id
 * @route   /api/v1/users/:id
 * @method  DELETE
 * @access  Private/Admin
 */
exports.deleteUser = factory.deleteOne(User);

/**
 * @desc    Get logged user data
 * @route   /api/v1/users/getMe
 * @method  GET
 * @access  Private
 */
exports.getLoggedUserData = asyncHandler(
    async (req, res, next) => {
        req.params.id = req.user._id;

        next();
    },
);

/**
 * @desc    Update logged user password
 * @route   /api/v1/users/changeMyPassword
 * @method  PUT
 * @access  Private
 */
exports.updateLoggedUserPassword = asyncHandler(
    async (req, res, next) => {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                password: await bcrypt.hash(req.body.password, 12),
                passwordChangedAt: Date.now(),
            },
            {
                new: true,
            },
        );

        if (!user) {
            return next(new ApiError("User not found", 404));
        }

        const token = createToken(user._id);

        res.status(200).json({
            data: user,
            token,
        });
    },
);

/**
 * @desc    Update logged user data
 * @route   /api/v1/users/changeMyData
 * @method  PUT
 * @access  Private
 */
exports.updateLoggedUserData = asyncHandler(
    async (req, res, next) => {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: req.body.name,
                slug: req.body.slug,
                email: req.body.email,
                phone: req.body.phone,
            },
            {
                new: true,
            },
        );

        if (!updatedUser) {
            return next(new ApiError("User not found", 404));
        }

        res.status(200).json({
            data: updatedUser,
        });
    },
);

/**
 * @desc    Deactivate logged user
 * @route   /api/v1/users/deleteMe
 * @method  DELETE
 * @access  Private
 */
exports.deleteLoggedUserData = asyncHandler(
    async (req, res, next) => {
        await User.findByIdAndUpdate(req.user._id, {
            active: false,
        });

        res.status(204).send();
    },
);