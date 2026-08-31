const factory = require('./handlersFactory');

const Review = require('../models/reviewModel');

// Nested route
// GET /api/v1/products/:productId/reviews
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

// Nested route
exports.setProductIdAndUserIdToBody = (req, res, next) => {
  // Nested route (Create)
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};



/**
 *  @desc    get all reviews
 *  @route   /api/v1/reviews
 *  @method  get
 *  @access  public
 */
exports.getReviews = factory.getAll(Review, "Reviews");

/**
 *  @desc    get review by id
 *  @route   /api/v1/reviews/:id
 *  @method  get
 *  @access  public
 */
exports.getReview = factory.getOne(Review);


/**
 *  @desc    Create review
 *  @route   /api/v1/reviews
 *  @method  POST
 *  @access  private
 */
exports.createReview = factory.createOne(Review);

/**
 *  @desc    Update review by id
 *  @route   /api/v1/reviews/:id
 *  @method  PUT
 *  @access  private
 */
exports.updateReview = factory.updateOne(Review);


/**
 *  @desc    Delete review by id
 *  @route    /api/v1/reviews/:id
 *  @method  PUT
 *  @access  private
 */
exports.deleteReview = factory.deleteOne(Review);