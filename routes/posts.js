import express from "express";
import {
    addPost,
    deletePost,
    getPost,
    getPosts,
    updatePost,
} from "../controllers/post.js";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);
postsRouter.get("/:id", getPost);
postsRouter.post("/", addPost);
postsRouter.delete("/:id", deletePost);
postsRouter.put("/:id", updatePost);

export default postsRouter;
