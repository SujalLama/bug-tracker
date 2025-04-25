import { Socket } from "socket.io";
import prisma from "../prisma/client";

export const joinProjectChat = (socket: Socket) => {
  socket.on("joinProjectChat", async (projectId) => {
    console.log(`User ${socket.id} joined room ${projectId}`);
    socket.join(projectId);
    console.log(`User ${socket.id} joined room ${projectId}`);

    // Fetch message history
    const messages = await prisma.message.findMany({
      where: { projectId },
      orderBy: { createdAt: "asc" },
    });

    socket.emit("projectMessageHistory", messages);
  });
};
