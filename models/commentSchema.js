const { Schema, default:mongoose } = require("mongoose");

const postSchema = new Schema(
    {
        postId: { type: String, required: true },
        comment: { type: String, required: true },
        userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    },
    { timeStamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;