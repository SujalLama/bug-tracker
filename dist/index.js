"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*" },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/users", user_routes_1.default);
app.use("/api/projects", project_routes_1.default);
app.use("/api/messages", message_routes_1.default);
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
