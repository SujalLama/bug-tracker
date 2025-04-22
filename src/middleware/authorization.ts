import prisma from "../prisma/client";
import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

export const authorizeRoles = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req?.user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next();
  };
};

export const isProjectManager = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { projectId } = req.params;
  const userId = req.user?.id;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project || project.managerId !== userId) {
    res.status(403).json({ message: "Only project manager can do this." });
    return;
  }
  next();
};

export const isProjectMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { projectId } = req.params;
  const userId = req?.user?.id;

  const member = await prisma.projectMember.findFirst({
    where: {
      projectId,
      userId,
    },
  });

  if (!member) {
    res
      .status(403)
      .json({ message: "You must be a project member to access this." });

    return;
  }
  next();
};

export const isProjectMemberOrManager = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { projectId } = req.params;

  const isManager = await prisma.project.findFirst({
    where: {
      id: projectId,
      managerId: user.id,
    },
  });

  const isMember = await prisma.projectMember.findFirst({
    where: {
      projectId,
      userId: user.id,
    },
  });

  if (!isManager && !isMember) {
    res.status(403).json({ message: "Access denied" });
    return;
  }

  next();
};

export const isTicketAssignee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { ticketId } = req.params;
  const userId = req.user?.id;

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket || ticket.assigneeId !== userId) {
    res
      .status(403)
      .json({ message: "Only the assigned user can update this ticket." });
    return;
  }
  next();
};
