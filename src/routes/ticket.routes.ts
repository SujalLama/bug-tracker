import { Router } from "express";
import {
  createTicket,
  getTickets,
  updateStatus,
} from "../controllers/ticket.controller";
import { authenticateUser } from "../middleware/authenticate";

const router = Router();

router.post("/", createTicket);
router.get("/:projectId", getTickets);
router.patch("/:ticketId/status", authenticateUser, updateStatus);

export default router;
