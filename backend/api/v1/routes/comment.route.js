import { Router } from 'express';
import { createComment, deleteComment, getComments } from '../controllers/comment.controller.js';
import { verifyUserDeleteComment } from '../middlewares/comment.middleware.js';
const router = Router();

router.get("/:pin_slug", getComments);
router.post("/create/:pin_slug", createComment);
router.delete("/delete/:id", verifyUserDeleteComment , deleteComment);

export default router;