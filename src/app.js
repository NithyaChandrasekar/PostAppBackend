const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postsRouter = require("./routes/postRoutes");
const cors = require("cors");
const Post = require("./models/postModel");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }));

app.use('/api/v1', postsRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
