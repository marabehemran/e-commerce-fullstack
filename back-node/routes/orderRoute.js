const express = require("express");

const {
    createCashOrder,
    createCardOrder,
    findAllOrders,
    findSpecificOrder,
    filterOrderForLoggedUser,
    updateOrderToPaid,
    updateOrderToDelivered,
    checkoutSession,
} = require("../controllers/orderController");

const authService = require("../controllers/authController");

const router = express.Router();

router.use(authService.protect);

router.post(
    "/checkout-session/:cartId",
    authService.allowedTo("user"),
    checkoutSession,
);

router.post(
    "/card/:cartId",
    authService.allowedTo("user"),
    createCardOrder,
);

router.get(
    "/",
    authService.allowedTo(
        "user",
        "admin",
        "manager",
    ),
    filterOrderForLoggedUser,
    findAllOrders,
);

router.put(
    "/:id/pay",
    authService.allowedTo("admin", "manager"),
    updateOrderToPaid,
);

router.put(
    "/:id/deliver",
    authService.allowedTo("admin", "manager"),
    updateOrderToDelivered,
);

router.get(
    "/:id",
    authService.allowedTo(
        "user",
        "admin",
        "manager",
    ),
    findSpecificOrder,
);

router.post(
    "/:cartId",
    authService.allowedTo("user"),
    createCashOrder,
);

module.exports = router;