const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const ApiError = require("../utils/ApiError");

/**
 *  @desc    get all brands
 *  @route   /api/v1/brands
 *  @method  get
 *  @access  public
 */
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await Brand.find().skip(skip).limit(limit);
  res.status(200).json({ result: brands.length, page, data: brands });
});

/**
 *  @desc    get brand by id
 *  @route   /api/v1/brands/:id
 *  @method  get
 *  @access  public
 */
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (brand) {
    res.status(200).json({ data: brand });
  } else {
    return next(new ApiError(`no brand for this id ${id}`, 404));
  }
});

/**
 *  @desc    Create brand
 *  @route   /api/v1/brands
 *  @method  POST
 *  @access  private
 */
exports.createBrand = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

/**
 *  @desc    Update brand by id
 *  @route    /api/v1/brands/:id
 *  @method  PUT
 *  @access  private
 */
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );
  if (brand) {
    res.status(200).json({ data: brand });
  } else {
    return next(new ApiError(`no brand for this id ${id}`, 404));
  }
});

/**
 *  @desc    Delete brand by id
 *  @route    /api/v1/brands/:id
 *  @method  PUT
 *  @access  private
 */
exports.deletebrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (brand) {
    res.status(204).send();
  } else {
    return next(new ApiError(`no brand for this id ${id}`, 404));
  }
});
