const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profileImage: { type: String },
  bio: { type: String },
  posts: [{ type: mongoose.Types.ObjectId, ref: "post" }],
  following: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  followers: [{ type: mongoose.Types.ObjectId, ref: "users" }],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
