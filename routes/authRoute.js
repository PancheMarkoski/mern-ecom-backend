const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllusers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  deleteCartItem,
  updateProductQuantityFromCart,
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controller/userCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddlewares, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/login-admin", loginAdmin);

router.post("/cart", authMiddlewares, userCart);
router.get("/cart", authMiddlewares, getUserCart);
router.delete("/cart/item", authMiddlewares, deleteCartItem);
router.post(
  "/cart-quantity-update",
  authMiddlewares,
  updateProductQuantityFromCart
);
router.post("/cart/create-order", authMiddlewares, createOrder);
router.get("/get-user-orders", authMiddlewares, getMyOrders);
router.get("/get-all-orders", authMiddlewares, isAdmin, getAllOrders);
router.put("/update-order-status", authMiddlewares, isAdmin, updateOrderStatus);

router.get("/all-users", getAllusers);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddlewares, getWishlist);

router.get("/:id", authMiddlewares, isAdmin, getUser);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddlewares, updateUser);
router.put("/save-address", authMiddlewares, saveAddress);
router.put("/block-user/:id", authMiddlewares, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddlewares, isAdmin, unblockUser);

module.exports = router;
