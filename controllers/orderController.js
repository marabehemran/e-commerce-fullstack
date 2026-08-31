const stripe = require("stripe")(process.env.STRIPE_SECRET);

const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/ApiError");

const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

/**
 * @desc    Create cash order
 * @route   POST /api/v1/orders/:cartId
 * @access  Private/User
 */
exports.createCashOrder = asyncHandler(async (req, res, next) => {
    const taxPrice = 0;
    const shippingPrice = 0;

    // Get cart
    const cart = await Cart.findById(req.params.cartId);

    if (!cart) {
        return next(
            new ApiError(
                `There is no such cart with id ${req.params.cartId}`,
                404,
            ),
        );
    }

    // Make sure cart belongs to logged user
    if (cart.user.toString() !== req.user._id.toString()) {
        return next(
            new ApiError("You are not allowed to access this cart", 403),
        );
    }

    // Get cart price
    const cartPrice =
        cart.totalPriceAfterDiscount !== undefined
            ? cart.totalPriceAfterDiscount
            : cart.totalCartPrice;

    const totalOrderPrice =
        Number(cartPrice) + taxPrice + shippingPrice;

    // Create order
    const order = await Order.create({
        user: req.user._id,

        cartItems: cart.cartItems,

        shippingAddress: req.body.shippingAddress,

        totalOrderPrice,

        paymentMethodType: "cash",
    });

    if (order) {
        // Update product quantity and sold
        const bulkOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: {
                    _id: item.product,
                },

                update: {
                    $inc: {
                        quantity: -item.quantity,
                        sold: item.quantity,
                    },
                },
            },
        }));

        await Product.bulkWrite(bulkOption, {});

        // Remove cart after creating order
        await Cart.findByIdAndDelete(req.params.cartId);
    }

    res.status(201).json({
        status: "success",
        data: order,
    });
});

/**
 * @desc    Filter orders for logged user
 */
exports.filterOrderForLoggedUser = asyncHandler(
    async (req, res, next) => {
        if (req.user.role === "user") {
            req.filterObj = {
                user: req.user._id,
            };
        }

        next();
    },
);

/**
 * @desc    Get all orders
 * @route   GET /api/v1/orders
 * @access  Private
 */
exports.findAllOrders = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword?.trim();

    let filter = {};

    if (req.filterObj) {
        filter = { ...req.filterObj };
    }

    if (keyword) {
        const users = await User.find({
            name: {
                $regex: keyword,
                $options: "i",
            },
        }).select("_id");

        const userIds = users.map((user) => user._id);

        filter.user = {
            $in: userIds,
        };
    }

    const orders = await Order.find(filter).sort("-createdAt");

    res.status(200).json({
        results: orders.length,
        data: orders,
    });
});

/**
 * @desc    Get specific order
 * @route   GET /api/v1/orders/:id
 * @access  Private
 */
exports.findSpecificOrder = asyncHandler(
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(
                new ApiError(
                    `There is no such order with id ${req.params.id}`,
                    404,
                ),
            );
        }

        // Normal user can only see his own order
        if (
            req.user.role === "user" &&
            order.user._id.toString() !== req.user._id.toString()
        ) {
            return next(
                new ApiError(
                    "You are not allowed to access this order",
                    403,
                ),
            );
        }

        res.status(200).json({
            status: "success",
            data: order,
        });
    },
);

/**
 * @desc    Update order to paid
 * @route   PUT /api/v1/orders/:id/pay
 * @access  Private/Admin/Manager
 */
exports.updateOrderToPaid = asyncHandler(
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(
                new ApiError(
                    `There is no such order with id ${req.params.id}`,
                    404,
                ),
            );
        }

        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json({
            status: "success",
            data: updatedOrder,
        });
    },
);

/**
 * @desc    Update order to delivered
 * @route   PUT /api/v1/orders/:id/deliver
 * @access  Private/Admin/Manager
 */
exports.updateOrderToDelivered = asyncHandler(
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(
                new ApiError(
                    `There is no such order with id ${req.params.id}`,
                    404,
                ),
            );
        }

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json({
            status: "success",
            data: updatedOrder,
        });
    },
);

/**
 * @desc    Create Stripe test checkout session
 * @route   POST /api/v1/orders/checkout-session/:cartId
 * @access  Private/User
 */
exports.checkoutSession = asyncHandler(
    async (req, res, next) => {
        const taxPrice = 0;
        const shippingPrice = 0;

        // Get cart
        const cart = await Cart.findById(req.params.cartId);

        if (!cart) {
            return next(
                new ApiError(
                    `There is no such cart with id ${req.params.cartId}`,
                    404,
                ),
            );
        }

        // Make sure cart belongs to logged user
        if (cart.user.toString() !== req.user._id.toString()) {
            return next(
                new ApiError("You are not allowed to access this cart", 403),
            );
        }

        // Get cart price
        const cartPrice =
            cart.totalPriceAfterDiscount !== undefined
                ? cart.totalPriceAfterDiscount
                : cart.totalCartPrice;

        const totalOrderPrice =
            Number(cartPrice) + taxPrice + shippingPrice;

        // Create Stripe test checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",

                        product_data: {
                            name: `Order for ${req.user.name}`,
                        },

                        unit_amount: Math.round(totalOrderPrice * 100),
                        unit_amount: Math.round(totalOrderPrice * 100),
                    },

                    quantity: 1,
                },
            ],

            mode: "payment",

            success_url:
                `http://localhost:5173/order/card-success?session_id={CHECKOUT_SESSION_ID}&cart_id=${req.params.cartId}`,
            cancel_url:
                "http://localhost:5173/cart",

            customer_email: req.user.email,

            client_reference_id: req.params.cartId,

            metadata: {
                details:
                    req.body.shippingAddress?.details || "",

                phone:
                    req.body.shippingAddress?.phone || "",

                city:
                    req.body.shippingAddress?.city || "",

                postalCode:
                    req.body.shippingAddress?.postalCode || "",
            },
        });

        res.status(200).json({
            status: "success",
            session,
        });
    },
);

/**
 * @desc    Create card order after successful Stripe test payment
 * @route   POST /api/v1/orders/card/:cartId
 * @access  Private/User
 */
exports.createCardOrder = asyncHandler(
    async (req, res, next) => {
        const { sessionId } = req.body;

        if (!sessionId) {
            return next(
                new ApiError("Stripe session id is required", 400),
            );
        }

        // Ask Stripe about this checkout session
        const session =
            await stripe.checkout.sessions.retrieve(sessionId);

        // Make sure Stripe says payment succeeded
        if (session.payment_status !== "paid") {
            return next(
                new ApiError(
                    "Payment has not been completed successfully",
                    400,
                ),
            );
        }

        // Make sure this Stripe session belongs to this cart
        if (
            session.client_reference_id !== req.params.cartId
        ) {
            return next(
                new ApiError(
                    "Stripe session does not belong to this cart",
                    400,
                ),
            );
        }

        // Get cart
        const cart = await Cart.findById(req.params.cartId);

        if (!cart) {
            return next(
                new ApiError(
                    `There is no such cart with id ${req.params.cartId}`,
                    404,
                ),
            );
        }

        // Make sure cart belongs to logged user
        if (cart.user.toString() !== req.user._id.toString()) {
            return next(
                new ApiError(
                    "You are not allowed to access this cart",
                    403,
                ),
            );
        }

        const cartPrice =
            cart.totalPriceAfterDiscount !== undefined
                ? cart.totalPriceAfterDiscount
                : cart.totalCartPrice;

        const totalOrderPrice = Number(cartPrice);

        // Create paid card order
        const order = await Order.create({
            user: req.user._id,

            cartItems: cart.cartItems,

            shippingAddress: {
                details:
                    session.metadata?.details || "",

                phone:
                    session.metadata?.phone || "",

                city:
                    session.metadata?.city || "",

                postalCode:
                    session.metadata?.postalCode || "",
            },

            totalOrderPrice,

            paymentMethodType: "card",

            isPaid: true,

            paidAt: Date.now(),
        });

        if (order) {
            // Update product quantity and sold
            const bulkOption = cart.cartItems.map((item) => ({
                updateOne: {
                    filter: {
                        _id: item.product,
                    },

                    update: {
                        $inc: {
                            quantity: -item.quantity,
                            sold: item.quantity,
                        },
                    },
                },
            }));

            await Product.bulkWrite(bulkOption, {});

            // Remove cart after creating order
            await Cart.findByIdAndDelete(req.params.cartId);
        }

        res.status(201).json({
            status: "success",
            data: order,
        });
    },
);