import { Router } from "express";
import {
  // addPostTest,
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";

const router = Router();

// router.get(
//   "/test",
//   // (req, res) => {
//   //   res.json("Posts");
//   // }
//   addPostTest
// );

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
