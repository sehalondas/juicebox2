const express = require("express");
const postsRouter = express.Router();
const { requireUser } = require("./utils");
const {createPost} = require('../db');

postsRouter.post("/", requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;
  const tagArr = tags.trim().split(/\s+/);
  const postData = {};
  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }
  try {
    const postData = { authorId, title, content };
    // add authorId, title, content to postData object
    const post = await createPost(postData);
    console.log(post);
    // this will create the post and the tags for us
    // if the post comes back, res.send({ post });
    if (post) {
      res.send({ post });
    }
    next();
    // otherwise, next an appropriate error object
  } catch ({ name, message }) {
    next({ name, message });
  }
});

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");
  next();
});

const { getAllPosts } = require("../db");
postsRouter.get("/", async (req, res) => {
  const posts = await getAllPosts();
  res.send({
    posts,
  });
});

module.exports = postsRouter;
