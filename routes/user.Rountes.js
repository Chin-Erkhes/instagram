const Route = require("express");
const userModel = require('../models/userSchema')

const userRoute = Route();

userRoute.post("/signup", async(req, res) => {
    console.log(req.body)
    try {
        const { username, password, email, profileImage } = req.body;
        const response = await userModel.create({
            username,
            password,
            email,
            profileImage,
        });
        res.status(200).json(response);
    } catch (error) {
        console.log({error})
        res.status(500).json(error);
    }
});

userRoute.get("/user/posts", async (req, res) => {
    try {
    const posts = await userModel.find().populate("post", "caption postImage");
    res.status(200).json(posts);
    } catch (error) {}
});


userRoute.post("/user/follow", async (req, res) => {
    const { followingUserId, followedUserId } = req.body;
    if (followingUserId === followedUserId)
        res.status(500).send("cannot follow yourself")
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
        })
        res.status(200).json("done")
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = userRoute;
