import prisma from './prisma';

// Create a new ConvertedLead
export const createConvertedLead = async (data: {
  id: string;
  programsId: string;
  price: number;
  convertedById: string;
}) => {
  return await prisma.convertedLead.create({
    data,
    include: {
      programName: true,
      convertedBy: true,
    },
  });
};

// Get a ConvertedLead by ID
export const getConvertedLeadById = async (id: string) => {
  return await prisma.convertedLead.findUnique({
    where: { id },
    include: {
      programName: true,
      convertedBy: true,
    },
  });
};

// Get all ConvertedLeads
export const getAllConvertedLeads = async () => {
  return await prisma.convertedLead.findMany({
    include: {
      programName: true,
      convertedBy: true,
    },
  });
};

// Update a ConvertedLead
export const updateConvertedLead = async (id: string, data: Partial<{
  programsId: string;
  price: number;
  convertedById: string;
  salesPersonId?: string;
}>) => {
  return await prisma.convertedLead.update({
    where: { id },
    data,
    include: {
      programName: true,
      convertedBy: true,
    },
  });
};

// Delete a ConvertedLead
export const deleteConvertedLead = async (id: string) => {
  return await prisma.convertedLead.delete({ where: { id } });
};
