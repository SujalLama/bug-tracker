export interface Message {
  id: string;
  content: string;
  senderId: string;
  projectId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  manager: {
    username: string;
  };
  projectMembers: [];
}

export interface Ticket {
  id: string;
  title: string;
}

export const ItemTypes = {
  TICKET: "ticket",
};
