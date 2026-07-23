const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.addAddressValidator = [
  check("alias")
    .notEmpty()
    .withMessage("Address alias is required"),

  check("details")
    .notEmpty()
    .withMessage("Address details are required")
    .isLength({ min: 10 })
    .withMessage("Address details is too short"),

  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone(["ar-PS", "ar-JO"])
    .withMessage("Invalid phone number"),

  check("city")
    .notEmpty()
    .withMessage("City is required"),

  check("postalCode")
    .optional()
    .isPostalCode("any")
    .withMessage("Invalid postal code"),

  validatorMiddleware,
];