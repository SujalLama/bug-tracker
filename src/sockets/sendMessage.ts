import { Socket } from "socket.io";
import prisma from "../prisma/client";

export const sendMessage = (socket: Socket, io: any) => {
  socket.on("sendMessage", async (data) => {
    const { content, projectId, senderId } = data;
    if (!content || !projectId || !senderId) return;

    try {
      const message = await prisma.message.create({
        data: { content, projectId, senderId },
      });
      io.to(projectId).emit("newMessage", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
};
