const factory = require('./handlersFactory');
const SubCategory = require('../models/subCategoryModel');

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route (Create)
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};


/**
 *  @desc    Create sub category
 *  @route   /api/v1/subcategories
 *  @method  POST
 *  @access  private
 */
exports.createSubCategory = factory.createOne(SubCategory);


/**
 *  @desc    get all subcategories
 *  @route   /api/v1/subcategories
 *  @method  get
 *  @access  public
 */
exports.getSubCategories = factory.getAll(SubCategory);


/**
 *  @desc    get sub categories by id
 *  @route   /api/v1/subcategories/:id
 *  @method  get
 *  @access  public
 */
exports.getSubCategory = factory.getOne(SubCategory);


/**
 *  @desc    Update sub categories by id
 *  @route    /api/v1/subcategories/:id
 *  @method  PUT
 *  @access  private
 */
exports.updateSubCategory = factory.updateOne(SubCategory);


/**
 *  @desc    Delete subcategories by id
 *  @route    /api/v1/subcategories/:id
 *  @method  PUT
 *  @access  private
 */
exports.deleteSubCategory = factory.deleteOne(SubCategory);