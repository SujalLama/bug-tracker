import { Socket } from "socket.io";

export const disconnectSocket = (socket: Socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};
