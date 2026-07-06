const mongoose = require("mongoose");

const subCategorySchema= new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "subCategory must be unique"],
      minlength: [2, "to short subCategory name"],
      maxlength: [32, "to long subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subCategory must belong to parent categry"],
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("subCategory", subCategorySchema);
