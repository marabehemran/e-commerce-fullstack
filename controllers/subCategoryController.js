const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

const SubCategory = require("../models/subCategoryModel");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

/**
 *  @desc    Create sub category
 *  @route   /api/v1/subcategories
 *  @method  POST
 *  @access  private
 */
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

exports.CreateFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  req.filterObj= filterObject;
  next();
};

/**
 *  @desc    get all subcategories
 *  @route   /api/v1/subcategories
 *  @method  get
 *  @access  public
 */
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find(req.filterObj)
    .skip(skip)
    .limit(limit);
  res
    .status(200)
    .json({ result: subCategories.length, page, data: subCategories });
});

/**
 *  @desc    get sub categories by id
 *  @route   /api/v1/subcategories/:id
 *  @method  get
 *  @access  public
 */
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (subCategory) {
    res.status(200).json({ data: subCategory });
  } else {
    return next(new ApiError(`no subCategory for this id ${id}`, 404));
  }
});

/**
 *  @desc    Update sub categories by id
 *  @route    /api/v1/subcategories/:id
 *  @method  PUT
 *  @access  private
 */
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true },
  );
  if (subCategory) {
    res.status(200).json({ data: subCategory });
  } else {
    return next(new ApiError(`no sub category for this id ${id}`, 404));
  }
});

/**
 *  @desc    Delete subcategories by id
 *  @route    /api/v1/subcategories/:id
 *  @method  PUT
 *  @access  private
 */
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (subCategory) {
    res.status(204).send();
  } else {
    return next(new ApiError(`no sub category for this id ${id}`, 404));
  }
});
