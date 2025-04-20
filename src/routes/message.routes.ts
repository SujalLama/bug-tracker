import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.controller";
import { authenticateUser } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";

const router = Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("MANAGER", "ADMIN"),
  sendMessage,
);
router.get("/:projectId", getMessages);

export default router;
