const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    postId: { type: mongoose.Types.ObjectId, ref: "post", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    comment: { type: String, required: true },
  },
  { timeStamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
