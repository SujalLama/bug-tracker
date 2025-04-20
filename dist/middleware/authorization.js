"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTicketAssignee = exports.isProjectMember = exports.isProjectManager = exports.authorizeRoles = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const user = req.body.user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: "Forbidden: Insufficient role" });
            return;
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
const isProjectManager = async (req, res, next) => {
    const { projectId } = req.params;
    const userId = req.body.user?.id;
    const project = await client_1.default.project.findUnique({
        where: { id: projectId },
    });
    if (!project || project.managerId !== userId) {
        return res
            .status(403)
            .json({ message: "Only project manager can do this." });
    }
    next();
};
exports.isProjectManager = isProjectManager;
const isProjectMember = async (req, res, next) => {
    const { projectId } = req.params;
    const userId = req.body.user?.id;
    const member = await client_1.default.projectMember.findFirst({
        where: {
            projectId,
            userId,
        },
    });
    if (!member) {
        return res
            .status(403)
            .json({ message: "You must be a project member to access this." });
    }
    next();
};
exports.isProjectMember = isProjectMember;
const isTicketAssignee = async (req, res, next) => {
    const { ticketId } = req.params;
    const userId = req.body.user?.id;
    const ticket = await client_1.default.ticket.findUnique({
        where: { id: ticketId },
    });
    if (!ticket || ticket.assigneeId !== userId) {
        return res
            .status(403)
            .json({ message: "Only the assigned user can update this ticket." });
    }
    next();
};
exports.isTicketAssignee = isTicketAssignee;
