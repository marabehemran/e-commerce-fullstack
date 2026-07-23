const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Product = require("../../models/productModel");

exports.addProductToWishlistValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id format")
    .custom(async (productId) => {
      const product = await Product.findById(productId);

      if (!product) {
        throw new Error(`No product found for this id: ${productId}`);
      }

      return true;
    }),

  validatorMiddleware,
];

exports.removeProductFromWishlistValidator = [
  check("productId")
    .isMongoId()
    .withMessage("Invalid product id format")
    .custom(async (productId) => {
      const product = await Product.findById(productId);

      if (!product) {
        throw new Error(`No product found for this id: ${productId}`);
      }

      return true;
    }),

  validatorMiddleware,
];