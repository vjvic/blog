const asyncHandler = require("express-async-handler");
const Post = require("../model/postModel");

// @desc    Get my post
// @route   GET /api/post/mypost
// @access  Private
const getMyPost = asyncHandler(async (req, res) => {
  const post = await Post.find({ username: req.user.username });

  res.status(200).json(post);
});

// @desc    Get all post
// @route   GET /api/post
// @access  Public
const getAllPost = asyncHandler(async (req, res) => {
  const post = await Post.find({});

  res.status(200).json(post);
});

// @desc    Get post by id
// @route   GET /api/post/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  //check post
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  res.status(200).json(post);
});

// @desc    create post
// @route   POST /api/post
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, desc, photo } = req.body;

  const post = await Post.create({
    title,
    desc,
    photo,
    username: req.user.username,
  });

  res.status(200).json(post);
});

// @desc    update post
// @route   PUT /api/post/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  //check current username
  if (post.username !== req.user.username) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

// @desc    delete post
// @route   DELETE /api/post/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  //check current username
  if (post.username !== req.user.username) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.deleteOne(post);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMyPost,
  getAllPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
