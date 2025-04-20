"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesByProject = exports.sendMessage = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const sendMessage = async (content, senderId, projectId) => {
    try {
        const message = await client_1.default.message.create({
            data: {
                content,
                sender: { connect: { id: senderId } },
                project: { connect: { id: projectId } },
            },
        });
        return message;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.sendMessage = sendMessage;
const getMessagesByProject = async (projectId) => {
    return await client_1.default.message.findMany({
        where: { projectId },
        include: { sender: true },
        orderBy: { createdAt: "asc" },
    });
};
exports.getMessagesByProject = getMessagesByProject;
