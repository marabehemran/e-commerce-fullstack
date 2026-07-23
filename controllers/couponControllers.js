const factory = require('./handlersFactory');
const Coupon = require('../models/couponModel');

/**
 *  @desc    Get all coupons
 *  @route   /api/v1/coupons
 *  @method  GET
 *  @access  private
 */
exports.getCoupons = factory.getAll(Coupon);

/**
 *  @desc    Get coupon by id
 *  @route   /api/v1/coupons/:id
 *  @method  GET
 *  @access  private
 */
exports.getCoupon = factory.getOne(Coupon);


/**
 *  @desc     Create coupon
 *  @route   /api/v1/coupons
 *  @method  POST
 *  @access  private
 */
exports.createCoupon = factory.createOne(Coupon);

/**
 *  @desc    Update coupon by id
 *  @route  /api/v1/coupons/:id
 *  @method  PUT
 *  @access  private
 */
exports.updateCoupon = factory.updateOne(Coupon);


/**
 *  @desc    Delete specific coupon
 *  @route  /api/v1/coupons/:id
 *  @method  DELETE
 *  @access  private
 */
exports.deleteCoupon = factory.deleteOne(Coupon);