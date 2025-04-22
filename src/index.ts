import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import messageRoutes from "./routes/message.routes";
import ticketRoutes from "./routes/ticket.routes";
import commentRoutes from "./routes/comment.routes";
import "./types/express"; // Adjust path if needed

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Bug Tracker API is running...");
});

// Socket.IO events
// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);
//
//   socket.on("joinProjectChat", (projectId) => {
//     socket.join(projectId);
//   });
//
//   // socket.on("sendMessage", async (data) => {
//   //   const { content, projectId, senderId } = data;
//   //   const message = await prisma.message.create({
//   //     data: { content, projectId, senderId },
//   //   });
//   //   io.to(projectId).emit("newMessage", message);
//   // });
//
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });
//
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
