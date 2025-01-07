const Route = require("express");

const likeModel = require("../models/likeSchema");
const postModel = require("../models/postSchema");

const likeRoute = Route();

likeRoute.post("/post/like", async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const likePostResponse = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: userId,
      },
    });
    res.status(200).json(likePostResponse);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = likeRoute;
