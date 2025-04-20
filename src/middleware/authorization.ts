import prisma from "../prisma/client";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticate";
import { Role } from "@prisma/client";

export const authorizeRoles = (...roles: Role[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    const user = req.user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next();
  };
};

export const isProjectManager = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { projectId } = req.params;
  const userId = req.user?.id;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project || project.managerId !== userId) {
    return res
      .status(403)
      .json({ message: "Only project manager can do this." });
  }
  next();
};

export const isProjectMember = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { projectId } = req.params;
  const userId = req.user?.id;

  const member = await prisma.projectMember.findFirst({
    where: {
      projectId,
      userId,
    },
  });

  if (!member) {
    return res
      .status(403)
      .json({ message: "You must be a project member to access this." });
  }
  next();
};

export const isTicketAssignee = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { ticketId } = req.params;
  const userId = req.user?.id;

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket || ticket.assigneeId !== userId) {
    return res
      .status(403)
      .json({ message: "Only the assigned user can update this ticket." });
  }
  next();
};
