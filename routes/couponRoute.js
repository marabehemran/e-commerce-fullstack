const express = require("express");

const {
  getCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponControllers");

const {
  getCouponValidator,
  createCouponValidator,
  updateCouponValidator,
  deleteCouponValidator,
} = require("../utils/validators/couponValidator");

const authService = require("../controllers/authController");

const router = express.Router();

router.use(
  authService.protect,
  authService.allowedTo("admin", "manager"),
);

router
  .route("/")
  .get(getCoupons)
  .post(createCouponValidator, createCoupon);

router
  .route("/:id")
  .get(getCouponValidator, getCoupon)
  .put(updateCouponValidator, updateCoupon)
  .delete(deleteCouponValidator, deleteCoupon);

module.exports = router;