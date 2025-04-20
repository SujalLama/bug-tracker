import prisma from "../prisma/client";

export const sendMessage = async (
  content: string,
  senderId: string,
  projectId: string,
) => {
  try {
    const message = await prisma.message.create({
      data: {
        content,
        sender: { connect: { id: senderId } },
        project: { connect: { id: projectId } },
      },
    });
    return message;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMessagesByProject = async (projectId: string) => {
  return await prisma.message.findMany({
    where: { projectId },
    include: { sender: true },
    orderBy: { createdAt: "asc" },
  });
};
