import prisma from './prisma';

// Create a new SalesTeam member
export const createSalesTeam = async (data: {
  userId: string;
  password: string;
  role: string;
  managerId?: string;
}) => {
  return await prisma.salesTeam.create({
    data,
    include: {
      manager: true,
      subordinates: true,
      assignedLeads: true,
      soldLeads: true,
      assignedPrograms: true,
      FollowUps: true,
    },
  });
};

// Get a SalesTeam member by UserId
export const getSalesTeamByUserId = async (userId: string) => {
  return await prisma.salesTeam.findUnique({ where: { userId }});
};

// Get a SalesTeam member by ID
export const getSalesTeamById = async (id: string) => {
  return await prisma.salesTeam.findUnique({
    where: { id },
    include: {
      manager: true,
      subordinates: true,
      assignedLeads: true,
      soldLeads: true,
      assignedPrograms: true,
      FollowUps: true,
    },
  });
};

// Get SalesTeam by ManagerID
export const getSalesTeamByManagerId = async (managerId: string) => {
  return await prisma.salesTeam.findMany({
    where: { managerId },
    // include: {
      // manager: true,
      // subordinates: true,
      // assignedLeads: true,
      // soldLeads: true,
      // assignedPrograms: true,
      // FollowUps: true,
    // },
  });
};

// Get all SalesTeam Leaders
export const getAllSalesLeaders = async () => {
  return await prisma.salesTeam.findMany({
    where: { role: 'Sales Leader'}
  });
};

// Get all SalesTeam members
export const getAllSalesTeams = async () => {
  return await prisma.salesTeam.findMany({
    // include: {
    //   manager: true,
    //   subordinates: true,
    //   assignedLeads: true,
    //   soldLeads: true,
    //   assignedPrograms: true,
    //   FollowUps: true,
    // },
  });
};

// Update a SalesTeam member
export const updateSalesTeam = async (id: string, data: Partial<{
  userId: string;
  password: string;
  role: string;
  managerId?: string;
}>) => {
  return await prisma.salesTeam.update({
    where: { id },
    data,
    include: {
      manager: true,
      subordinates: true,
      assignedLeads: true,
      soldLeads: true,
      assignedPrograms: true,
      FollowUps: true,
    },
  });
};

// Delete a SalesTeam member
export const deleteSalesTeam = async (id: string) => {
  return await prisma.salesTeam.delete({ where: { id } });
};
