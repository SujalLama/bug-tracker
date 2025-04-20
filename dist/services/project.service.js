"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectMembers = exports.deleteProject = exports.getAllProjects = exports.getProjectById = exports.updateProject = exports.createProject = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProject = async ({ name, description, status = client_1.ProjectStatus.ACTIVE, managerId, memberIds, }) => {
    const project = await prisma.project.create({
        data: {
            name,
            description,
            status,
            manager: {
                connect: { id: managerId },
            },
            projectMembers: {
                create: memberIds.map((userId) => ({
                    user: { connect: { id: userId } },
                })),
            },
        },
        include: {
            manager: true,
            projectMembers: {
                include: { user: true },
            },
        },
    });
    return project;
};
exports.createProject = createProject;
const updateProject = async (id, data) => {
    let updatedMembers = undefined;
    if (data.memberIds) {
        await prisma.projectMember.deleteMany({ where: { projectId: id } });
        updatedMembers = {
            create: data.memberIds.map((userId) => ({
                user: { connect: { id: userId } },
            })),
        };
    }
    const project = await prisma.project.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            status: data.status,
            ...(updatedMembers ? { projectMembers: updatedMembers } : {}),
        },
        include: {
            manager: true,
            projectMembers: {
                include: { user: true },
            },
        },
    });
    return project;
};
exports.updateProject = updateProject;
const getProjectById = async (id) => {
    return prisma.project.findUnique({
        where: { id },
        include: {
            manager: true,
            tickets: true,
            projectMembers: {
                include: { user: true },
            },
        },
    });
};
exports.getProjectById = getProjectById;
const getAllProjects = async () => {
    return prisma.project.findMany({
        include: {
            manager: true,
            projectMembers: {
                include: { user: true },
            },
        },
    });
};
exports.getAllProjects = getAllProjects;
const deleteProject = async (id) => {
    await prisma.projectMember.deleteMany({ where: { projectId: id } });
    return prisma.project.delete({ where: { id } });
};
exports.deleteProject = deleteProject;
const updateProjectMembers = async (projectId, memberIds) => {
    await prisma.projectMember.deleteMany({
        where: { projectId },
    });
    const newMembers = memberIds.map((userId) => ({
        userId,
        projectId,
    }));
    await prisma.projectMember.createMany({
        data: newMembers,
    });
    return prisma.project.findUnique({
        where: { id: projectId },
        include: {
            projectMembers: {
                include: { user: true },
            },
        },
    });
};
exports.updateProjectMembers = updateProjectMembers;
