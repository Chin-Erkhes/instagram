const commentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");
const commentRoute = require("../routes/user.Rountes");

commentRoute.get("/getCommentsByPostId/:id", async (req, res) => {
  const { id } = req.params;
  const response = await commentModel.find({ postId: id }).populate("userId");
  res.send(response);
});

commentRoute.post("/writecomment", async (req, res) => {
  try {
    const { comment, postId, userId } = req.body;

    const newComment = await commentModel.create({
      comment,
      postId,
      userId,
    });

    await postModel.findByIdAndUpdate(postId, {
      $addToSet: newComment._id,
    });

    res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = commentRoute;
