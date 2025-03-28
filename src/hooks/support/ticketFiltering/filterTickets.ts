
import { SupportTicket } from '@/types/support';

interface FilterParams {
  tickets: SupportTicket[];
  searchQuery: string;
  activeTab: string;
  priorityFilter: string | null;
  categoryFilter: string | null;
  departmentFilter: string | null;
  agentFilter: string | null;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}

export const filterAndSortTickets = ({
  tickets,
  searchQuery,
  activeTab,
  priorityFilter,
  categoryFilter,
  departmentFilter,
  agentFilter,
  sortField,
  sortOrder
}: FilterParams): SupportTicket[] => {
  return tickets.filter(ticket => {
    // Search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const subjectMatch = ticket.subject.toLowerCase().includes(query);
      const descriptionMatch = ticket.description.toLowerCase().includes(query);
      if (!subjectMatch && !descriptionMatch) {
        return false;
      }
    }
    
    // Status filtering
    if (activeTab !== 'all' && ticket.status !== activeTab) {
      return false;
    }
    
    // Priority filtering
    if (priorityFilter && priorityFilter !== "all" && ticket.priority !== priorityFilter) {
      return false;
    }
    
    // Category filtering
    if (categoryFilter && categoryFilter !== "all") {
      console.log(`Comparing category: "${ticket.category}" with filter: "${categoryFilter}"`);
      if (ticket.category !== categoryFilter) {
        return false;
      }
    }
    
    // Department filtering
    if (departmentFilter && departmentFilter !== "all") {
      console.log(`Comparing department: "${ticket.department}" with filter: "${departmentFilter}"`);
      if (ticket.department !== departmentFilter) {
        return false;
      }
    }
    
    // Agent filtering
    if (agentFilter && agentFilter !== "all" && ticket.assignedTo !== agentFilter) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sorting logic
    if (!(sortField in a) || !(sortField in b)) {
      return 0;
    }
    
    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      const dateA = new Date(a[sortField as keyof SupportTicket] as string).getTime();
      const dateB = new Date(b[sortField as keyof SupportTicket] as string).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortField === 'priority') {
      const priorityValues = { 'low': 1, 'medium': 2, 'high': 3, 'urgent': 4 };
      const priorityA = priorityValues[a.priority as keyof typeof priorityValues] || 0;
      const priorityB = priorityValues[b.priority as keyof typeof priorityValues] || 0;
      return sortOrder === 'asc' ? priorityA - priorityB : priorityB - priorityA;
    }
    
    const valueA = String(a[sortField as keyof SupportTicket]);
    const valueB = String(b[sortField as keyof SupportTicket]);
    
    return sortOrder === 'asc' 
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });
};
