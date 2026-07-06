const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/ApiError");

/**
 *  @desc    get all categories
 *  @route   /api/v1/categories
 *  @method  get
 *  @access  public
 */
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find().skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
});

/**
 *  @desc    get categories by id
 *  @route   /api/v1/categories/:id
 *  @method  get
 *  @access  public
 */
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (category) {
    res.status(200).json({ data: category });
  } else {
    return next(new ApiError(`no category for this id ${id}`, 404));
  }
});

/**
 *  @desc    Create category
 *  @route   /api/v1/categories
 *  @method  POST
 *  @access  private
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

/**
 *  @desc    Update categories by id
 *  @route    /api/v1/categories/:id
 *  @method  PUT
 *  @access  private
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );
  if (category) {
    res.status(200).json({ data: category });
  } else {
    return next(new ApiError(`no category for this id ${id}`, 404));
  }
});

/**
 *  @desc    Delete categories by id
 *  @route    /api/v1/categories/:id
 *  @method  PUT
 *  @access  private
 */
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (category) {
    res.status(204).send();
  } else {
    return next(new ApiError(`no category for this id ${id}`, 404));
  }
});
