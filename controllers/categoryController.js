const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const ApiError = require("../utils/ApiError");
const Category = require("../models/categoryModel");

//upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

//image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${filename}`);

    req.body.image = filename;
    }

    next();

});

/**
 *  @desc    get all categories
 *  @route   /api/v1/categories
 *  @method  get
 *  @access  public
 */
exports.getCategories = factory.getAll(Category);

/**
 *  @desc    get categories by id
 *  @route   /api/v1/categories/:id
 *  @method  get
 *  @access  public
 */
exports.getCategory = factory.getOne(Category);
/**
 *  @desc    Create category
 *  @route   /api/v1/categories
 *  @method  POST
 *  @access  private
 */
exports.createCategory = factory.createOne(Category);
/**
 *  @desc    Update categories by id
 *  @route    /api/v1/categories/:id
 *  @method  PUT
 *  @access  private
 */
exports.updateCategory = factory.updateOne(Category);
/**
 *  @desc    Delete categories by id
 *  @route    /api/v1/categories/:id
 *  @method  PUT
 *  @access  private
 */
exports.deleteCategory = factory.deleteOne(Category);
