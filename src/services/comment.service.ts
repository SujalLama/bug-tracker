import prisma from "../prisma/client";

export const addComment = async (
  content: string,
  ticketId: string,
  authorId: string,
) => {
  return await prisma.comment.create({
    data: {
      content,
      ticketId,
      authorId,
    },
  });
};

export const getCommentsByTicket = async (ticketId: string) => {
  return await prisma.comment.findMany({
    where: { ticketId },
    include: { author: true },
    orderBy: { createdAt: "asc" },
  });
};
