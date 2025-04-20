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
// src/routes/project.routes.ts
const express_1 = require("express");
const projectController = __importStar(require("../controllers/project.controller"));
const authenticate_1 = require("../middleware/authenticate");
const authorization_1 = require("../middleware/authorization"); // Import the authorization middleware
const router = (0, express_1.Router)();
// Protect routes: Authenticate the user and authorize based on role
// router.post(
//   "/",
//   authenticateUser,
//   authorizeRoles("MANAGER"), // Only managers can create projects
//   projectController.createProject,
// );
router.put("/:projectId", authenticate_1.authenticateUser, (0, authorization_1.authorizeRoles)("MANAGER"), // Only managers can update projects
projectController.updateProject);
router.get("/", authenticate_1.authenticateUser, projectController.getAllProjects); // Any authenticated user can view projects
router.get("/:projectId", authenticate_1.authenticateUser, projectController.getProjectById); // Any authenticated user can view a single project
router.post("/:projectId/members", authenticate_1.authenticateUser, (0, authorization_1.authorizeRoles)("MANAGER"), // Only managers can modify members
projectController.manageProjectMembers);
exports.default = router;
