const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Cart = require("../models/cartModel");

const calcTotalCartPrice = (cart) => {
    let totalPrice = 0;

    cart.cartItems.forEach((item) => {
        totalPrice += item.quantity * item.price;
    });

    cart.totalCartPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;

    return totalPrice;
};

/**
 *  @desc    Add product to cart
 *  @route   /api/v1/cart
 *  @method  POST
 *  @access  private
 */
exports.addProductToCart = asyncHandler(async (req, res, next) => {
    const { productId, color } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        return next(
            new ApiError(`No product found for this id: ${productId}`, 404),
        );
    }

    // Use discounted price if product has discount
    const productPrice =
        product.priceAfterDiscount || product.price;

    // Get cart for logged user
    let cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {
        // Create cart for logged user
        cart = await Cart.create({
            user: req.user._id,

            cartItems: [
                {
                    product: productId,
                    color,
                    price: productPrice,
                },
            ],
        });
    } else {
        // Check if product already exists in cart
        const productIndex = cart.cartItems.findIndex(
            (item) =>
                item.product.toString() === productId &&
                item.color === color,
        );

        if (productIndex > -1) {
            const cartItem = cart.cartItems[productIndex];

            cartItem.quantity += 1;

            cart.cartItems[productIndex] = cartItem;
        } else {
            // Add new product to cart
            cart.cartItems.push({
                product: productId,
                color,
                price: productPrice,
            });
        }
    }

    // Calculate total cart price
    calcTotalCartPrice(cart);

    await cart.save();

    // Populate product data for frontend
    await cart.populate("cartItems.product");

    res.status(200).json({
        status: "success",
        message: "Product added to cart successfully",
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

/**
 *  @desc    Get logged user cart
 *  @route   /api/v1/cart
 *  @method  GET
 *  @access  private
 */
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({
        user: req.user._id,
    }).populate("cartItems.product");

    if (!cart) {
        return next(
            new ApiError(
                `There is no cart for this user id : ${req.user._id}`,
                404,
            ),
        );
    }

    res.status(200).json({
        status: "success",
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

/**
 *  @desc    Remove cart item by id
 *  @route   /api/v1/cart/:itemId
 *  @method  DELETE
 *  @access  private
 */
exports.removeSpecificCartItem = asyncHandler(
    async (req, res, next) => {
        const cart = await Cart.findOneAndUpdate(
            {
                user: req.user._id,
            },
            {
                $pull: {
                    cartItems: {
                        _id: req.params.itemId,
                    },
                },
            },
            {
                new: true,
            },
        );

        if (!cart) {
            return next(
                new ApiError(
                    `There is no cart for this user id : ${req.user._id}`,
                    404,
                ),
            );
        }

        calcTotalCartPrice(cart);

        await cart.save();

        // Populate product data for frontend
        await cart.populate("cartItems.product");

        res.status(200).json({
            status: "success",
            numOfCartItems: cart.cartItems.length,
            data: cart,
        });
    },
);

/**
 *  @desc    Clear logged user cart
 *  @route   /api/v1/cart
 *  @method  DELETE
 *  @access  private
 */
exports.clearCart = asyncHandler(async (req, res, next) => {
    await Cart.findOneAndDelete({
        user: req.user._id,
    });

    res.status(204).send();
});

/**
 *  @desc    Update specific cart item quantity
 *  @route   /api/v1/cart/:itemId
 *  @method  PUT
 *  @access  private
 */
exports.updateCartItemQuantity = asyncHandler(
    async (req, res, next) => {
        const { quantity } = req.body;

        const cart = await Cart.findOne({
            user: req.user._id,
        });

        if (!cart) {
            return next(
                new ApiError(
                    `There is no cart for user ${req.user._id}`,
                    404,
                ),
            );
        }

        const itemIndex = cart.cartItems.findIndex(
            (item) =>
                item._id.toString() === req.params.itemId,
        );

        if (itemIndex > -1) {
            const cartItem = cart.cartItems[itemIndex];

            cartItem.quantity = quantity;

            cart.cartItems[itemIndex] = cartItem;
        } else {
            return next(
                new ApiError(
                    `There is no item for this id : ${req.params.itemId}`,
                    404,
                ),
            );
        }

        calcTotalCartPrice(cart);

        await cart.save();

        // Populate product data for frontend
        await cart.populate("cartItems.product");

        res.status(200).json({
            status: "success",
            numOfCartItems: cart.cartItems.length,
            data: cart,
        });
    },
);

/**
 *  @desc    Apply coupon on logged user cart
 *  @route   /api/v1/cart/applyCoupon
 *  @method  PUT
 *  @access  private
 */
exports.applyCoupon = asyncHandler(async (req, res, next) => {
    // Get coupon based on coupon name
    const coupon = await Coupon.findOne({
        name: req.body.coupon,
        expire: {
            $gt: Date.now(),
        },
    });

    if (!coupon) {
        return next(
            new ApiError("Coupon is invalid or expired", 400),
        );
    }

    // Get logged user cart
    const cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {
        return next(
            new ApiError(
                `There is no cart for this user id : ${req.user._id}`,
                404,
            ),
        );
    }

    const totalPrice = cart.totalCartPrice;

    // Calculate price after coupon discount
    const totalPriceAfterDiscount = (
        totalPrice -
        (totalPrice * coupon.discount) / 100
    ).toFixed(2);

    cart.totalPriceAfterDiscount =
        totalPriceAfterDiscount;

    await cart.save();

    // Populate product data for frontend
    await cart.populate("cartItems.product");

    res.status(200).json({
        status: "success",
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});