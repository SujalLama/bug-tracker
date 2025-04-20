import { Router } from "express";
import { addComment, getComments } from "../controllers/comment.controller";
import { authenticateUser } from "../middleware/authenticate";

const router = Router();

router.post("/", authenticateUser, addComment);
router.get("/:ticketId", getComments);

export default router;
