const express = require("express");
const router = express.Router();
const {
  getMyPost,
  getAllPost,
  getPostById,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getAllPost).post(protect, createPost);
router.get("/mypost", protect, getMyPost);
router
  .route("/:id")
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
