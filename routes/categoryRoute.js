const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const subCategoriesRoute=require("./subCategoryRoute")
const { route } = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories",subCategoriesRoute)

router.route("/").get(getCategories).post(createCategoryValidator,createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator,updateCategory)
  .delete(deleteCategoryValidator,deleteCategory);
module.exports = router;
