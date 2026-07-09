const factory = require('./handlersFactory');
const Product = require('../models/productModel');

/**
 *  @desc    get all products
 *  @route   /api/v1/products
 *  @method  get
 *  @access  public
 */
exports.getProducts = factory.getAll(Product, 'Products');

/**
 *  @desc    get product by id
 *  @route   /api/v1/products/:id
 *  @method  get
 *  @access  public
 */
exports.getProduct = factory.getOne(Product);

/**
 *  @desc    Create product
 *  @route   /api/v1/products
 *  @method  POST
 *  @access  private
 */
exports.createProduct = factory.createOne(Product);

/**
 *  @desc    Update product by id
 *  @route    /api/v1/products/:id
 *  @method  PUT
 *  @access  private
 */
exports.updateProduct = factory.updateOne(Product);

/**
 *  @desc    Delete product by id
 *  @route    /api/v1/products/:id
 *  @method  PUT
 *  @access  private
 */
exports.deleteProduct = factory.deleteOne(Product);