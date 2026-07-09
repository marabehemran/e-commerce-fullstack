const factory = require('./handlersFactory');
const Brand = require('../models/brandModel');

/**
 *  @desc    get all brands
 *  @route   /api/v1/brands
 *  @method  get
 *  @access  public
 */
exports.getBrands = factory.getAll(Brand);

/**
 *  @desc    get brand by id
 *  @route   /api/v1/brands/:id
 *  @method  get
 *  @access  public
 */
exports.getBrand = factory.getOne(Brand);


/**
 *  @desc    Create brand
 *  @route   /api/v1/brands
 *  @method  POST
 *  @access  private
 */
exports.createBrand = factory.createOne(Brand);

/**
 *  @desc    Update brand by id
 *  @route    /api/v1/brands/:id
 *  @method  PUT
 *  @access  private
 */
exports.updateBrand = factory.updateOne(Brand);


/**
 *  @desc    Delete brand by id
 *  @route    /api/v1/brands/:id
 *  @method  PUT
 *  @access  private
 */
exports.deleteBrand = factory.deleteOne(Brand);