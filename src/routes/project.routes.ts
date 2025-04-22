// src/routes/project.routes.ts
import { Router } from "express";
import * as projectController from "../controllers/project.controller";
import { authenticateUser } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization"; // Import the authorization middleware

const router = Router();

// Protect routes: Authenticate the user and authorize based on role
router.post(
  "/",
  authenticateUser,
  authorizeRoles("MANAGER"), // Only managers can create projects
  projectController.createProject,
);

router.put(
  "/:projectId",
  authenticateUser,
  authorizeRoles("MANAGER"), // Only managers can update projects
  projectController.updateProject,
);

router.get("/", authenticateUser, projectController.getAllProjects); // Any authenticated user can view projects

router.get("/:projectId", authenticateUser, projectController.getProjectById); // Any authenticated user can view a single project

router.post(
  "/:projectId/members",
  authenticateUser,
  authorizeRoles("MANAGER"), // Only managers can modify members
  projectController.manageProjectMembers,
);

export default router;
