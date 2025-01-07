const Route = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");
const commentModel = require("../models/commentSchema");

const postRoute = Route();
const userRoute = Route();

postRoute.post("/post", async (req, res) => {
  const { caption, postImage, userId, likes } = req.body;
  try {
    const createdPost = await postModel.create({
      caption,
      postImage,
      userId,
      likes,
    });

    await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: createdPost._id,
      },
    });

    res.status(200).json(createdPost);
  } catch (error) {
    throw new Error(error);
  }
});

postRoute.post("/create", async (req, res) => {
  const posts = await postModel
    .find()
    .populate("likes", "username profileImage likes");
  res.status(200).json(posts);
});

postRoute.get("/getCommentsByPostId/:id", async (req, res) => {
  const { id } = req.params;

  const response = await commentModel.find({ postId: id }).populate("userId");
  res.send(response);
});

module.exports = postRoute;
