
import { SupportTicket } from '@/types/support';

export interface UseTicketFilteringResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  priorityFilter: string | null;
  setPriorityFilter: (priority: string | null) => void;
  categoryFilter: string | null;
  setCategoryFilter: (category: string | null) => void;
  departmentFilter: string | null;
  setDepartmentFilter: (department: string | null) => void;
  agentFilter: string | null;
  setAgentFilter: (agent: string | null) => void;
  sortField: string;
  setSortField: (field: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  clearFilters: () => void;
  filteredTickets: SupportTicket[];
  categories: string[];
  departments: string[];
  priorities: string[];
  assignedAgents: Array<{ id: string, name: string }>;
  toggleSortOrder: (field: string) => void;
}
