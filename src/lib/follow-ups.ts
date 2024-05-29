import prisma from './prisma';

// Create a new FollowUp
export const createFollowUp = async (data: {
  leadId: string;
  responseType: string;
  comment: string;
  salesTeamId: string;
  followUpType: string;
}) => {
  return await prisma.followUps.create({
    data,
    include: {
      lead: true,
      calledBy: true,
    },
  });
};

// Get a FollowUp by ID
export const getFollowUpById = async (id: string) => {
  return await prisma.followUps.findUnique({
    where: { id },
    include: {
      lead: true,
      calledBy: true,
    },
  });
};

// Get all FollowUps
export const getAllFollowUps = async () => {
  return await prisma.followUps.findMany({
    include: {
      lead: true,
      calledBy: true,
    },
  });
};

// Update a FollowUp
export const updateFollowUp = async (id: string, data: Partial<{
  leadId: string;
  responseType: string;
  comment: string;
  salesTeamId: string;
  followUpType: string;
}>) => {
  return await prisma.followUps.update({
    where: { id },
    data,
    include: {
      lead: true,
      calledBy: true,
    },
  });
};

// Delete a FollowUp
export const deleteFollowUp = async (id: string) => {
  return await prisma.followUps.delete({ where: { id } });
};
