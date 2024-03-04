const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");
const { cloudinaryUploadImg } = require("../utils/cloudinary");
const fs = require("fs");

//  Create Blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//  Update Blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Blogs
const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getAllBlogs = await Blog.find();
    res.json(getAllBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json(deletedBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// Like Blog
// const likeBlog = asyncHandler(async (req, res) => {
//   const { blogId } = req.body;
//   validateMongoDbId(blogId);
//   // Find the blog which you want to be liked
//   const blog = await Blog.findById(blogId);
//   // Find the login user
//   const loginUserId = req?.user?._id;
//   // Find it the user already liked the blog
//   const isLiked = blog?.isLiked;
//   // Find if the user disliked the blog
//   const alreadyDisliked = blog?.dislikes?.find(
//     (userId) => userId?.toString() === loginUserId?.toString()
//   );
//   if (alreadyDisliked) {
//     await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $pull: { dislikes: loginUserId },
//         isDisliked: false,
//       },
//       { new: true }
//     );
//   }

//   if (isLiked) {
//     const blog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $pull: { likes: loginUserId },
//         isLiked: false,
//       },
//       { new: true }
//     );
//     res.json(blog);
//   } else {
//     const blog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $push: { likes: loginUserId },
//         isLiked: true,
//       },
//       { new: true }
//     );
//     res.json(blog);
//   }
// });

// dislike Blog
// const dislikeBlog = asyncHandler(async (req, res) => {
//   const { blogId } = req.body;
//   validateMongoDbId(blogId);
//   // Find the blog which you want to be liked
//   const blog = await Blog.findById(blogId);
//   // Find the login user
//   const loginUserId = req?.user?._id;
//   // Find it the user already Disliked the blog
//   const isDisliked = blog?.isDisliked;
//   // Find if the user disliked the blog
//   const alreadyLiked = blog?.likes?.find(
//     (userId) => userId?.toString() === loginUserId?.toString()
//   );
//   if (alreadyLiked) {
//     await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $pull: { likes: loginUserId },
//         isLiked: false,
//       },
//       { new: true }
//     );
//   }

//   if (isDisliked) {
//     const blog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $pull: { dislikes: loginUserId },
//         isDisliked: false,
//       },
//       { new: true }
//     );
//     res.json(blog);
//   } else {
//     const blog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $push: { dislikes: loginUserId },
//         isDisliked: true,
//       },
//       { new: true }
//     );
//     res.json(blog);
//   }
// });

const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  const blog = await Blog.findById(blogId);
  const loginUserId = req?.user?._id;

  // Check if the user already disliked the blog
  const alreadyDisliked = blog?.dislikes.includes(loginUserId);
  if (alreadyDisliked) {
    await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        $set: { isDisliked: false }, // Update isDisliked based on dislikes count
      },
      { new: true }
    );
  }

  // Toggle like status
  const isLiked = blog?.likes.includes(loginUserId);
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    isLiked
      ? { $pull: { likes: loginUserId }, $set: { isLiked: false } }
      : { $push: { likes: loginUserId }, $set: { isLiked: true } },
    { new: true }
  );

  res.json(updatedBlog);
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  const blog = await Blog.findById(blogId);
  const loginUserId = req?.user?._id;

  // Check if the user already liked the blog
  const alreadyLiked = blog?.likes.includes(loginUserId);
  if (alreadyLiked) {
    await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        $set: { isLiked: false }, // Update isLiked based on likes count
      },
      { new: true }
    );
  }

  // Toggle dislike status
  const isDisliked = blog?.dislikes.includes(loginUserId);
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    isDisliked
      ? { $pull: { dislikes: loginUserId }, $set: { isDisliked: false } }
      : { $push: { dislikes: loginUserId }, $set: { isDisliked: true } },
    { new: true }
  );

  res.json(updatedBlog);
});

// Upload Images
const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      // fs.unlinkSync(path);
    }
    const findProduct = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );

    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
};
