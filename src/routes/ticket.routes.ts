import { Router } from "express";
import {
  createTicket,
  getTickets,
  updateStatus,
} from "../controllers/ticket.controller";
import { authenticateUser } from "../middleware/authenticate";
import {
  isProjectMemberOrManager,
  isTicketAssignee,
} from "../middleware/authorization";

const router = Router();

router.post("/", authenticateUser, isProjectMemberOrManager, createTicket);
router.get(
  "/:projectId",
  authenticateUser,
  isProjectMemberOrManager,
  getTickets,
);

router.patch(
  "/:ticketId/status",
  authenticateUser,
  isProjectMemberOrManager,
  updateStatus,
);

export default router;
