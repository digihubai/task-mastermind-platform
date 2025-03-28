
import { useState, useMemo, useEffect } from 'react';
import { SupportTicket } from '@/types/support';
import { UseTicketFilteringResult } from './types';
import { 
  extractUniqueCategories, 
  extractUniqueDepartments, 
  extractUniquePriorities, 
  extractAssignedAgents 
} from './extractors';
import { filterAndSortTickets } from './filterTickets';

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
  
  const categories = useMemo(() => extractUniqueCategories(tickets), [tickets]);
  const departments = useMemo(() => extractUniqueDepartments(tickets), [tickets]);
  const priorities = useMemo(() => extractUniquePriorities(tickets), [tickets]);
  const assignedAgents = useMemo(() => extractAssignedAgents(tickets, mockAgents), [tickets, mockAgents]);
  
  useEffect(() => {
    console.log('Categories found in useTicketFiltering:', categories);
    console.log('Departments found in useTicketFiltering:', departments);
    console.log('Current category filter:', categoryFilter);
    console.log('Current department filter:', departmentFilter);
    
    tickets.forEach((ticket, index) => {
      console.log(`Ticket ${index + 1}: category="${ticket.category}", department="${ticket.department}"`);
    });
  }, [categories, departments, categoryFilter, departmentFilter, tickets]);
  
  const toggleSortOrder = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter(null);
    setPriorityFilter(null);
    setCategoryFilter(null);
    setAgentFilter(null);
    setDepartmentFilter(null);
  };

  const filteredTickets = useMemo(() => filterAndSortTickets({
    tickets,
    searchQuery,
    activeTab,
    priorityFilter,
    categoryFilter,
    departmentFilter,
    agentFilter,
    sortField,
    sortOrder
  }), [
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
