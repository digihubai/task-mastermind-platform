
import { SupportTicket } from '@/types/support';

export const extractUniqueCategories = (tickets: SupportTicket[]): string[] => {
  // Collect all categories, filtering out empty values
  const allCategories = tickets
    .map(ticket => ticket.category)
    .filter(Boolean);
  
  // Debug what we're finding
  console.log('Raw categories from tickets:', allCategories);
  
  // Remove duplicates and preserve original casing
  return [...new Set(allCategories)];
};

export const extractUniqueDepartments = (tickets: SupportTicket[]): string[] => {
  // Collect all departments, filtering out empty values
  const allDepartments = tickets
    .map(ticket => ticket.department)
    .filter(Boolean);
  
  // Debug what we're finding
  console.log('Raw departments from tickets:', allDepartments);
  
  // Remove duplicates and preserve original casing
  return [...new Set(allDepartments)];
};

export const extractUniquePriorities = (tickets: SupportTicket[]): string[] => {
  return [...new Set(tickets.map(ticket => ticket.priority).filter(Boolean))];
};

export const extractAssignedAgents = (tickets: SupportTicket[], mockAgents: any[]): Array<{ id: string, name: string }> => {
  const agentIds = [...new Set(tickets
    .filter(ticket => ticket.assignedTo)
    .map(ticket => ticket.assignedTo as string))];
    
  return agentIds.map(id => {
    const agent = mockAgents.find(a => a.id === id);
    return { id, name: agent ? agent.name : 'Unknown' };
  });
};
