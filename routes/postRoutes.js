const Route = require("express");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

const postRoute = Route();

postRoute.post("/post", async (req, res) => {
  const { caption, postImage, userId } = req.body;
  try {
    const createdPost = await postModel.create({
      caption,
      postImage,
      userId,
    });

    await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: createdPost._id,
      },
    });

    res.status(200).json(createdPost);
  } catch (error) {
    res.status(500), json(error);
  }
});

postRoute.post("/create", async (req, res) => {
  const posts = await postModel
    .find()
    .populate("likes", "username profileImage");
  res.status(200).json(posts);
});

postRoute.get("/posts", async (req, res) => {
  const posts = await postModel.find().populate("userId", "email username _id");
  res.status(200).json(posts);
});

module.exports = postRoute;
