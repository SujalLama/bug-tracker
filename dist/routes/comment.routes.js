"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
router.post("/", authenticate_1.authenticateUser, comment_controller_1.addComment);
router.get("/:ticketId", comment_controller_1.getComments);
exports.default = router;
