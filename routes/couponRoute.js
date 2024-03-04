const express = require("express");
const {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
} = require("../controller/couponCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createCoupon);
router.get("/", authMiddlewares, isAdmin, getAllCoupons);
router.put("/:id", authMiddlewares, isAdmin, updateCoupon);
router.delete("/:id", authMiddlewares, isAdmin, deleteCoupon);
router.get("/:id", authMiddlewares, isAdmin, getCoupon);

module.exports = router;
