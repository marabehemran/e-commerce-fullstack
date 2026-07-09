const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "too short product title"],
      maxlength: [100, "too long product title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "product description is required"],
      minlength: [10, "too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      min: [0, "Price must be greater than 0"],
      max: [999999, "Price is too high"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "product image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "product must have category"],
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "rating must be above or equal 1"],
      max: [5, "rating must be below or equal 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name -_id',
  });
  next();
});

module.exports = mongoose.model("Product", productSchema);
