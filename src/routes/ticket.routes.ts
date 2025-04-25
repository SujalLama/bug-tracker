import { Router } from "express";
import {
  createTicket,
  getTickets,
  updateStatus,
} from "../controllers/ticket.controller";
import { authenticateUser } from "../middleware/authenticate";
import { isProjectMemberOrManager } from "../middleware/authorization";

const router = Router();

router.post("/", authenticateUser, createTicket);
router.get("/:projectId", authenticateUser, getTickets);

router.patch(
  "/:ticketId/status",
  authenticateUser,
  isProjectMemberOrManager,
  updateStatus,
);

export default router;
