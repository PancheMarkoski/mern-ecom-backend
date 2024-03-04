const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require("../controller/productCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");

const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createProduct);

router.get("/:id", getProduct);
router.put("/wishlist", authMiddlewares, addToWishlist);
router.put("/rating", authMiddlewares, rating);

router.put("/:id", authMiddlewares, isAdmin, updateProduct);
router.get("/", getAllProducts);
router.delete("/:id", authMiddlewares, isAdmin, deleteProduct);

module.exports = router;
