const Route = require("express");

const likeModel = require("../models/likeSchema");
const postModel = require("../models/postSchema");

const likeRoute = Route();

likeRoute.post("/pressLike", async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const like = await likeModel.create({
      postId,
      userId,
    });
    await postModel.findByIdAndUpdate(postId, {
      $addToSet: like._id,
    });

    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

module.exports = likeRoute;
