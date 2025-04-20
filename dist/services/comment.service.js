"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByTicket = exports.addComment = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const addComment = async (content, ticketId, authorId) => {
    return await client_1.default.comment.create({
        data: {
            content,
            ticketId,
            authorId,
        },
    });
};
exports.addComment = addComment;
const getCommentsByTicket = async (ticketId) => {
    return await client_1.default.comment.findMany({
        where: { ticketId },
        include: { author: true },
        orderBy: { createdAt: "asc" },
    });
};
exports.getCommentsByTicket = getCommentsByTicket;
