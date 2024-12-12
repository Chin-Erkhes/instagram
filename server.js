const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./routes/user.Rountes");
const postRoute = require("./routes/postRoutes");
const likeRoute = require("./routes/likeRoutes");
const commentRoute = require("./routes/commentRoutes");
const cors = require("cors");
const postModel = require("./models/postSchema");
const app = express();
app.use(express.json());
app.use(cors());
app.use(likeRoute);
app.use(commentRoute);
app.use(postRoute);
app.use(userRoute);

const connectDataBase = async () => {
  console.log("call connect db");
  try {
    await mongoose.connect(
      "mongodb+srv://24hp6902:c1dCd3rBq17ws4Ks@hop-1a.agow4.mongodb.net/instagram?retryWrites=true&w=majority&appName=HOP-1A"
    );
    // c1dCd3rBq17ws4Ks
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

connectDataBase();

app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(8080, console.log("running"));
