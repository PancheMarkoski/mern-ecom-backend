const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
} = require("../controller/blogCategoryCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createCategory);
router.put("/:id", authMiddlewares, isAdmin, updateCategory);
router.delete("/:id", authMiddlewares, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategories);

module.exports = router;
