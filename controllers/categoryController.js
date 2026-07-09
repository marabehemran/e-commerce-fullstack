const factory = require('./handlersFactory');
const Category = require('../models/categoryModel');

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