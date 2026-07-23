const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Coupon = require("../../models/couponModel");

exports.getCouponValidator = [
  check("id").isMongoId().withMessage("Invalid Coupon id format"),
  validatorMiddleware,
];

exports.createCouponValidator = [
  check("name")
    .notEmpty()
    .withMessage("Coupon name required")
    .custom((val) =>
      Coupon.findOne({ name: val }).then((coupon) => {
        if (coupon) {
          return Promise.reject(new Error("Coupon already exists"));
        }
      }),
    ),

  check("expire")
    .notEmpty()
    .withMessage("Coupon expire date required")
    .isISO8601()
    .withMessage("Invalid expire date"),

  check("discount")
    .notEmpty()
    .withMessage("Coupon discount required")
    .isFloat({ min: 1, max: 100 })
    .withMessage("Discount must be between 1 and 100"),

  validatorMiddleware,
];

exports.updateCouponValidator = [
  check("id").isMongoId().withMessage("Invalid Coupon id format"),

  check("name")
    .optional()
    .custom((val, { req }) =>
      Coupon.findOne({ name: val }).then((coupon) => {
        if (coupon && coupon._id.toString() !== req.params.id) {
          return Promise.reject(new Error("Coupon already exists"));
        }
      }),
    ),

  check("expire")
    .optional()
    .isISO8601()
    .withMessage("Invalid expire date"),

  check("discount")
    .optional()
    .isFloat({ min: 1, max: 100 })
    .withMessage("Discount must be between 1 and 100"),

  validatorMiddleware,
];

exports.deleteCouponValidator = [
  check("id").isMongoId().withMessage("Invalid Coupon id format"),
  validatorMiddleware,
];