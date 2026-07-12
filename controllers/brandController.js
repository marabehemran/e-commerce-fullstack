const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const factory = require('./handlersFactory');
const {uploadSingleImage}=require("../middlewares/uploadImageMiddleware")
const Brand = require('../models/brandModel');


//upload single image
exports.uploadBrandImage = uploadSingleImage("image");

//image processing 
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  req.body.image = filename;

  next();
});


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