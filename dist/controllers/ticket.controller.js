"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getTickets = exports.createTicket = void 0;
const ticketService = __importStar(require("../services/ticket.service"));
const createTicket = async (req, res) => {
    try {
        const ticket = await ticketService.createTicket(req.body);
        res.status(201).json(ticket);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createTicket = createTicket;
const getTickets = async (req, res) => {
    const { projectId } = req.params;
    try {
        const tickets = await ticketService.getTicketsByProject(projectId);
        res.json(tickets);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getTickets = getTickets;
const updateStatus = async (req, res) => {
    const { ticketId } = req.params;
    const { status } = req.body;
    try {
        const ticket = await ticketService.updateTicketStatus(ticketId, status);
        res.json(ticket);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateStatus = updateStatus;
