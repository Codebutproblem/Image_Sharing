import { Router } from 'express';
import { createComment, deleteComment, getComments } from '../controllers/comment.controller.js';
import { verifyAuthor } from '../middlewares/comment.middleware.js';
const router = Router();

router.get("/:pin_slug", getComments);
router.post("/create/:pin_slug", createComment);
router.delete("/delete/:id", verifyAuthor , deleteComment);

export default router;