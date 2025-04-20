import { PrismaClient, ProjectStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async ({
  name,
  description,
  status = ProjectStatus.ACTIVE,
  managerId,
  memberIds,
}: {
  name: string;
  description?: string;
  status?: ProjectStatus;
  managerId: string;
  memberIds: string[];
}) => {
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

export const updateProject = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    status?: ProjectStatus;
    memberIds?: string[];
  },
) => {
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

export const getProjectById = async (id: string) => {
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

export const getAllProjects = async () => {
  return prisma.project.findMany({
    include: {
      manager: true,
      projectMembers: {
        include: { user: true },
      },
    },
  });
};

export const deleteProject = async (id: string) => {
  await prisma.projectMember.deleteMany({ where: { projectId: id } });
  return prisma.project.delete({ where: { id } });
};

export const updateProjectMembers = async (
  projectId: string,
  memberIds: string[],
) => {
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
