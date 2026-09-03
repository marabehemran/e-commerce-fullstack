const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
  prepareProductData,
} = require("../controllers/productController");

const reviewRoute = require("./reviewRoute");
const authService = require("../controllers/authController");

const router = express.Router();

//nested route

// /products/6a4cd446990eb55b6f0f5072/reviews
router.use("/:productId/reviews", reviewRoute);

router
  .route("/")
  .get(getProducts)
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    prepareProductData,
    createProductValidator,
    createProduct,
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    prepareProductData,
    updateProductValidator,
    updateProduct,
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    deleteProductValidator,
    deleteProduct,
  );

module.exports = router;
