const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
} = require("../controller/blogCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImage");

const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddlewares,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);
router.put("/likes", authMiddlewares, likeBlog);
router.put("/dislikes", authMiddlewares, dislikeBlog);

router.put("/:id", authMiddlewares, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlog);
router.delete("/:id", authMiddlewares, isAdmin, deleteBlog);

module.exports = router;
