"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicketStatus = exports.getTicketsByProject = exports.createTicket = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createTicket = async (data) => {
    return await client_1.default.ticket.create({
        data: {
            title: data.title,
            description: data.description,
            projectId: data.projectId,
            assigneeId: data.assigneeId,
            priority: data.priority,
            status: data.status ?? "OPEN",
        },
    });
};
exports.createTicket = createTicket;
const getTicketsByProject = async (projectId) => {
    return await client_1.default.ticket.findMany({
        where: { projectId },
        include: {
            assignee: true,
            comments: {
                include: {
                    author: true,
                },
            },
        },
    });
};
exports.getTicketsByProject = getTicketsByProject;
const updateTicketStatus = async (ticketId, status) => {
    return await client_1.default.ticket.update({
        where: { id: ticketId },
        data: { status },
    });
};
exports.updateTicketStatus = updateTicketStatus;
