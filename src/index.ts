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
import { joinProjectChat } from "./sockets/joinProjectChat";
import { sendMessage } from "./sockets/sendMessage";
import { disconnectSocket } from "./sockets/disconnectSocket";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bug Tracker API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/comments", commentRoutes);

// Socket.IO events
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  joinProjectChat(socket);
  sendMessage(socket, io);
  disconnectSocket(socket);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
