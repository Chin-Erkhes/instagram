const Route = require("express");
const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = Route();

userRoute.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const saltRound = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const createdUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        userId: createdUser._id,
        username: createdUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.send({ token });
  } catch (error) {
    res.json({ message: `failed to create user ${error}` });
  }
});

userRoute.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
});

userRoute.get("/user/posts", async (req, res) => {
  try {
    const posts = await userModel.find().populate("posts");
    res.status(200).json(posts);
  } catch (error) {
    throw new Error(error);
  }
});

userRoute.post("/user/follow", async (req, res) => {
  const { followingUserId, followedUserId } = req.body;
  if (followingUserId === followedUserId)
    res.status(500).send("cannot follow yourself");
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        followers: followingUserId,
      },
    });
    await userModel.findByIdAndUpdate(followedUserId, {
      $addToSet: {
        followers: followingUserId,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = userRoute;
