const { Schema, default: mongoose } = require("mongoose");

const likeSchema = new Schema(
  {
    postId: { type: mongoose.Types.ObjectId, ref: "post", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  },
  { timeStamps: true }
);

const likeModel = mongoose.model("like", likeSchema);

module.exports = likeModel;
