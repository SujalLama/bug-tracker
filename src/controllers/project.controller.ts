import { Request, Response } from "express";
import * as projectService from "../services/project.service";
import { ProjectStatus } from "@prisma/client";
import { AuthenticatedRequest } from "../middleware/authenticate";

export const createProject = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { name, description, status, memberIds } = req.body;

    const managerId = req.user?.id;

    if (!managerId) {
      throw new Error();
    }

    const project = await projectService.createProject({
      name,
      description,
      status: status || ProjectStatus.ACTIVE,
      managerId,
      memberIds,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { name, description, status, memberIds } = req.body;
    const { id } = req.params;

    const updated = await projectService.updateProject(id, {
      name,
      description,
      status,
      memberIds,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { projectId } = req.params;
  const project = await projectService.getProjectById(projectId);

  if (!project) {
    res.status(404).json({ message: "Project not found" });
    return;
  }

  res.status(200).json(project);
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await projectService.deleteProject(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};

export const manageProjectMembers = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { memberIds } = req.body;

    if (!Array.isArray(memberIds)) {
      res
        .status(400)
        .json({ message: "memberIds must be an array of user IDs." });
      return;
    }

    const updatedProject = await projectService.updateProjectMembers(
      projectId,
      memberIds,
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project members:", error);
    res.status(500).json({ message: "Failed to update project members." });
  }
};
