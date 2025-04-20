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
exports.manageProjectMembers = exports.deleteProject = exports.getAllProjects = exports.getProjectById = exports.updateProject = exports.createProject = void 0;
const projectService = __importStar(require("../services/project.service"));
const createProject = async (req, res) => {
    try {
        // const { name, description, status, memberIds } = req.body;
        // const user = req.user;
        //
        // const managerId = user.id;
        //
        // const project = await projectService.createProject({
        //   name,
        //   description,
        //   status: status || ProjectStatus.ACTIVE,
        //   managerId,
        //   memberIds,
        // });
        //
        // res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create project" });
    }
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update project" });
    }
};
exports.updateProject = updateProject;
const getProjectById = async (req, res) => {
    const { projectId } = req.params;
    const project = await projectService.getProjectById(projectId);
    if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
    }
    res.status(200).json(project);
};
exports.getProjectById = getProjectById;
const getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch projects" });
    }
};
exports.getAllProjects = getAllProjects;
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await projectService.deleteProject(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete project" });
    }
};
exports.deleteProject = deleteProject;
const manageProjectMembers = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { memberIds } = req.body;
        if (!Array.isArray(memberIds)) {
            res
                .status(400)
                .json({ message: "memberIds must be an array of user IDs." });
            return;
        }
        const updatedProject = await projectService.updateProjectMembers(projectId, memberIds);
        res.status(200).json(updatedProject);
    }
    catch (error) {
        console.error("Error updating project members:", error);
        res.status(500).json({ message: "Failed to update project members." });
    }
};
exports.manageProjectMembers = manageProjectMembers;
