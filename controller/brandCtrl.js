const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
// const validateMongoDbId = require("../utils/validateMongoDbId");

// Create Brand
const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json({
      newBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Update Brand
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Brand
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Brand
const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const getBrand = await Brand.findById(id);
    res.json(getBrand);
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Categories
const getAllBrands = asyncHandler(async (req, res) => {
  try {
    const getAllCategories = await Brand.find();
    res.json(getAllCategories);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrands,
};
