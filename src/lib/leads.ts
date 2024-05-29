import prisma from './prisma';

// Create a new Lead
export const createLead = async (data: {
  // time: Date;
  adsetName: string;
  fullName: string;
  grade: string;
  email: string;
  phoneNumber: string;
  sourceOfLead: string;
  programsId: string;
  assignedToId?: string;
  nextFollowUp: string;
  status: string;
}) => {
  return await prisma.leads.create({
    data : {...data, time: new Date()},
    include: {
      programName: true,
      assignedTo: true,
      followUps: true,
    },
  });
};


export const addLeads = async (leadsData: {
  time?: Date; // Optional: Allows passing a specific time
  adsetName: string;
  fullName: string;
  grade: string;
  email: string;
  phoneNumber: string;
  sourceOfLead: string;
  programsId: string;
  assignedToId?: string;
  nextFollowUp: string;
  status: string;
}[]) => {
  // Ensure current datetime for each entry if not provided
  const dataWithTime = leadsData.map((lead) => ({
    ...lead,
    time: lead.time || new Date(),
  }));

  return await prisma.leads.createMany({
    data: dataWithTime,
    // include: {
    //   programName: true, // Include related program data
    //   assignedTo: true, // Include related assignedTo data (if applicable)
    //   followUps: true, // Include related followUps data (if applicable)
    // },
  });
};

// Get a Lead by ID
export const getLeadById = async (id: string) => {
  return await prisma.leads.findUnique({
    where: { id },
    include: {
      programName: true,
      assignedTo: true,
      followUps: true,
    },
  });
};

// Get all Leads
export const getAllLeads = async () => {
  return await prisma.leads.findMany({
    include: {
      programName: true,
      assignedTo: true,
      followUps: true,
    },
  });
};

// Update a Lead
export const updateLead = async (id: string, data: Partial<{
  time: Date;
  adsetName: string;
  fullName: string;
  grade: string;
  email: string;
  phoneNumber: string;
  sourceOfLead: string;
  programsId: string;
  assignedToId?: string;
  nextFollowUp: string;
  status: string;
}>) => {
  return await prisma.leads.update({
    where: { id },
    data,
    include: {
      programName: true,
      assignedTo: true,
      followUps: true,
    },
  });
};

// Delete a Lead
export const deleteLead = async (id: string) => {
  return await prisma.leads.delete({ where: { id } });
};
