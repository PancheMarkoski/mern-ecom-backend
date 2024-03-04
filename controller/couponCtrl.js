const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
// const validateMongoDbId = require("../utils/validateMongoDbId");

// Create Coupon
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json({
      newCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Update Coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletedCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Coupons
const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const getAllCoupons = await Coupon.find();
    res.json(getAllCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Coupon
const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const getCoupon = await Coupon.findById(id);
    res.json(getCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
};
