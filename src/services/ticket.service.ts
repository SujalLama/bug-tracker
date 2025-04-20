import prisma from "../prisma/client";

export const createTicket = async (data: {
  title: string;
  description: string;
  projectId: string;
  assigneeId?: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
}) => {
  return await prisma.ticket.create({
    data: {
      title: data.title,
      description: data.description,
      projectId: data.projectId,
      assigneeId: data.assigneeId,
      priority: data.priority,
      status: data.status ?? "OPEN",
    },
  });
};

export const getTicketsByProject = async (projectId: string) => {
  return await prisma.ticket.findMany({
    where: { projectId },
    include: {
      assignee: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });
};

export const updateTicketStatus = async (
  ticketId: string,
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED",
) => {
  return await prisma.ticket.update({
    where: { id: ticketId },
    data: { status },
  });
};
