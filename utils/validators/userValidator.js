const slugify = require("slugify");
const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User required")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .isLength({ max: 37 })
    .withMessage("Too long User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("email alredy exists"));
        }
      }),
    ),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be more than 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("password confirm is incorrect");
      }
      return true;
    }),
  check("passwordConfirm").notEmpty().withMessage("password confirm required"),
  check("phone")
    .optional()
    .isMobilePhone(["ar-PS", "ar-JO"])
    .withMessage("invalid phone number only pal or jor phone"),
  check("profileImg").optional(),
  check("role").optional(),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),

  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    .custom(async (val, { req }) => {
      const user = await User.findOne({
        email: val,
        _id: { $ne: req.params.id },
      });

      if (user) {
        throw new Error("Email already exists");
      }

      return true;
    }),

  body("phone")
    .optional()
    .isMobilePhone(["ar-PS", "ar-JO"])
    .withMessage("Invalid phone number, only Palestinian or Jordanian numbers"),

  body("profileImg").optional(),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be user or admin"),

  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("you must enter the password confirm"),
  body("password")
    .notEmpty()
    .withMessage("you must enter new password")
    .custom(async (val, { req }) => {
      //verfy crunt password
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("there no user for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password,
      );
      if (!isCorrectPassword) {
        throw new Error("incorrect current password");
      }

      //verfy password confirm
      if (val !== req.body.passwordConfirm) {
        throw new Error("password confirm is incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.updateLoggedUserValidator = [
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    .custom(async (val, { req }) => {
      const user = await User.findOne({
        email: val,
        _id: { $ne: req.params.id },
      });

      if (user) {
        throw new Error("Email already exists");
      }

      return true;
    }),

  body("phone")
    .optional()
    .isMobilePhone(["ar-PS", "ar-JO"])
    .withMessage("Invalid phone number, only Palestinian or Jordanian numbers"),


  validatorMiddleware,
];
