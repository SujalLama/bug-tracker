import { Request, Response } from "express";
import * as ticketService from "../services/ticket.service";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await ticketService.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const tickets = await ticketService.getTicketsByProject(projectId);
    res.json(tickets);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  const { ticketId } = req.params;
  const { status } = req.body;
  try {
    const ticket = await ticketService.updateTicketStatus(ticketId, status);
    res.json(ticket);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
