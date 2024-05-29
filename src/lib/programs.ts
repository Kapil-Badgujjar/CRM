import prisma from './prisma';

// Create a new Program
export const createProgram = async (data: {
  programName: string;
  assignedToId?: string;
}) => {
  return await prisma.programs.create({
    data,
    include: {
      assignedTo: true,
      Leads: true,
      ConvertedLead: true,
    },
  });
};

// Get a Program by ID
export const getProgramById = async (id: string) => {
  return await prisma.programs.findUnique({
    where: { id },
    include: {
      assignedTo: true,
      Leads: true,
      ConvertedLead: true,
    },
  });
};

// Get all Programs
export const getAllPrograms = async () => {
  return await prisma.programs.findMany({
    include: {
      assignedTo: true,
      // Leads: true,
      // ConvertedLead: true,
    },
  });
};

// Update a Program
export const updateProgram = async (id: string, data: Partial<{
  programName: string;
  assignedToId?: string;
}>) => {
  return await prisma.programs.update({
    where: { id },
    data,
    include: {
      assignedTo: true,
      Leads: true,
      ConvertedLead: true,
    },
  });
};

// Delete a Program
export const deleteProgram = async (id: string) => {
  return await prisma.programs.delete({ where: { id } });
};
