const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.addProductToCartValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product is required")
    .isMongoId()
    .withMessage("Invalid product id"),

  check("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),

  check("color")
    .optional()
    .isString()
    .withMessage("Color must be a string")
    .notEmpty()
    .withMessage("Color cannot be empty"),

  validatorMiddleware,
];

exports.updateCartItemQuantityValidator = [
  check("itemId")
    .isMongoId()
    .withMessage("Invalid cart item id"),

  check("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),

  validatorMiddleware,
];

exports.removeCartItemValidator = [
  check("itemId")
    .isMongoId()
    .withMessage("Invalid cart item id"),

  validatorMiddleware,
];

exports.applyCouponValidator = [
  check("coupon")
    .notEmpty()
    .withMessage("Coupon is required")
    .isString()
    .withMessage("Coupon must be a string")
    .trim(),

  validatorMiddleware,
];