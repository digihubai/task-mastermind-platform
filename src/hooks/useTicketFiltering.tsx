
import { useState, useMemo, useEffect } from 'react';
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

export const useTicketFiltering = (
  tickets: SupportTicket[],
  mockAgents: any[]
): UseTicketFilteringResult => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [agentFilter, setAgentFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract all unique categories and departments without normalizing the display values
  const categories = useMemo(() => {
    // Collect all categories, filtering out empty values
    const allCategories = tickets
      .map(ticket => ticket.category)
      .filter(Boolean);
    
    // Remove duplicates and preserve original casing
    return [...new Set(allCategories)];
  }, [tickets]);
  
  const departments = useMemo(() => {
    // Collect all departments, filtering out empty values
    const allDepartments = tickets
      .map(ticket => ticket.department)
      .filter(Boolean);
    
    // Remove duplicates and preserve original casing
    return [...new Set(allDepartments)];
  }, [tickets]);
  
  // Debug what we're finding
  useEffect(() => {
    console.log('Categories found in useTicketFiltering:', categories);
    console.log('Departments found in useTicketFiltering:', departments);
    console.log('Current category filter:', categoryFilter);
    console.log('Current department filter:', departmentFilter);
    
    // Log each ticket for debugging
    console.log('All tickets with their categories and departments:');
    tickets.forEach((ticket, index) => {
      console.log(`Ticket ${index + 1}: category="${ticket.category}", department="${ticket.department}"`);
    });
  }, [categories, departments, categoryFilter, departmentFilter, tickets]);
  
  const priorities = useMemo(() => 
    [...new Set(tickets.map(ticket => ticket.priority).filter(Boolean))], [tickets]
  );

  const assignedAgents = useMemo(() => {
    const agentIds = [...new Set(tickets
      .filter(ticket => ticket.assignedTo)
      .map(ticket => ticket.assignedTo as string))];
      
    return agentIds.map(id => {
      const agent = mockAgents.find(a => a.id === id);
      return { id, name: agent ? agent.name : 'Unknown' };
    });
  }, [tickets, mockAgents]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter(null);
    setPriorityFilter(null);
    setCategoryFilter(null);
    setAgentFilter(null);
    setDepartmentFilter(null);
  };

  const toggleSortOrder = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredTickets = useMemo(() => {
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
      
      // Category filtering - exact match
      if (categoryFilter && categoryFilter !== "all" && ticket.category) {
        console.log(`Comparing category: "${ticket.category}" with filter: "${categoryFilter}"`);
        if (ticket.category !== categoryFilter) {
          return false;
        }
      }
      
      // Department filtering - exact match
      if (departmentFilter && departmentFilter !== "all" && ticket.department) {
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
  }, [
    tickets, 
    searchQuery, 
    activeTab, 
    priorityFilter, 
    categoryFilter, 
    departmentFilter, 
    agentFilter,
    sortField,
    sortOrder
  ]);

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    departmentFilter,
    setDepartmentFilter,
    agentFilter,
    setAgentFilter,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    showFilters,
    setShowFilters,
    clearFilters,
    filteredTickets,
    categories,
    departments,
    priorities,
    assignedAgents,
    toggleSortOrder
  };
};
