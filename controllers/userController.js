const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const factory = require("./handlersFactory");
const ApiError = require("../utils/ApiError");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const User = require("../models/userModel");
const createToken = require("../utils/createToken");

//upload single image
exports.uploadUserImage = uploadSingleImage("profileImg");

//image processing
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
 *  @desc    get all users
 *  @route   /api/v1/users
 *  @method  get
 *  @access  private
 */
exports.getUsers = factory.getAll(User);

/**
 *  @desc    get user by id
 *  @route   /api/v1/users/:id
 *  @method  get
 *  @access  private
 */
exports.getUser = factory.getOne(User);

/**
 *  @desc    Create user
 *  @route   /api/v1/users
 *  @method  POST
 *  @access  private
 */
exports.createUser = factory.createOne(User);

/**
 *  @desc    Update user by id
 *  @route    /api/v1/users/:id
 *  @method  PUT
 *  @access  private
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
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
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
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
/**
 *  @desc    Delete user by id
 *  @route    /api/v1/users/:id
 *  @method  PUT
 *  @access  private
 */
exports.deleteUser = factory.deleteOne(User);

/**
 *  @desc    Get logged user data
 *  @route   /api/v1/users/getMe
 *  @method  GET
 *  @access  private
 */
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

/**
 *  @desc    Update logged user password
 *  @route   /api/v1/users/updateMyPassword
 *  @method  PUT
 *  @access  private
 */
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  //update user password based user payload(req.user._id)
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
  //genrate token
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

/**
 *  @desc    Update logged user data
 *  @route   /api/v1/users/updateMyData
 *  @method  PUT
 *  @access  private
 */
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true },
  );

  res.status(200).json({
    data: updatedUser,
  });
});

/**
 *  @desc    Deactivate logged user
 *  @route   /api/v1/users/deleteMe
 *  @method  DELETE
 *  @access  private
 */
exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: "Success" });
});
