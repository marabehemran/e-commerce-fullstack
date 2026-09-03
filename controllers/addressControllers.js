const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const ApiError = require("../utils/ApiError");

/**
 * @desc    Add address to logged user
 * @route   POST /api/v1/addresses
 * @access  Private/User
 */
exports.addAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        addresses: {
          alias: req.body.alias,
          details: req.body.details,
          phone: req.body.phone,
          city: req.body.city,
          postalCode: req.body.postalCode,
        },
      },
    },
    {
      new: true,
    },
  );

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Address added successfully",
    data: user.addresses,
  });
});

/**
 * @desc    Get logged user addresses
 * @route   GET /api/v1/addresses
 * @access  Private/User
 */
exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    results: user.addresses.length,
    data: user.addresses,
  });
});

/**
 * @desc    Update logged user address
 * @route   PUT /api/v1/addresses/:addressId
 * @access  Private/User
 */
exports.updateAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const address = user.addresses.id(req.params.addressId);

  if (!address) {
    return next(new ApiError("Address not found", 404));
  }

  address.alias = req.body.alias;
  address.details = req.body.details;
  address.phone = req.body.phone;
  address.city = req.body.city;
  address.postalCode = req.body.postalCode;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Address updated successfully",
    data: user.addresses,
  });
});

/**
 * @desc    Delete logged user address
 * @route   DELETE /api/v1/addresses/:addressId
 * @access  Private/User
 */
exports.removeAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        addresses: {
          _id: req.params.addressId,
        },
      },
    },
    {
      new: true,
    },
  );

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Address removed successfully",
    data: user.addresses,
  });
});
