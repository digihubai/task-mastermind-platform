
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, ArrowUp, ArrowDown, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TicketFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
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
  categories: string[];
  departments: string[];
  priorities: string[];
  assignedAgents: Array<{ id: string; name: string }>;
}

export const TicketFilters: React.FC<TicketFiltersProps> = ({
  searchQuery,
  setSearchQuery,
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
  categories,
  departments,
  priorities,
  assignedAgents
}) => {
  const toggleSortOrder = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const hasActiveFilters = !!(searchQuery || priorityFilter || categoryFilter || departmentFilter || agentFilter);

  // Debug logging to help diagnose filter issues
  console.log('Available categories:', categories);
  console.log('Available departments:', departments);
  console.log('Current categoryFilter:', categoryFilter);
  console.log('Current departmentFilter:', departmentFilter);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters {(priorityFilter || categoryFilter || departmentFilter || agentFilter) && 
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">!</Badge>
            }
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Sort by
                {sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toggleSortOrder('updatedAt')}>
                Last Updated {sortField === 'updatedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSortOrder('createdAt')}>
                Date Created {sortField === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSortOrder('priority')}>
                Priority {sortField === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSortOrder('status')}>
                Status {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <Select 
                value={priorityFilter || ""}
                onValueChange={(value) => setPriorityFilter(value === "all" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select 
                value={categoryFilter || ""}
                onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.toLowerCase()} value={category.toLowerCase()}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <Select 
                value={departmentFilter || ""}
                onValueChange={(value) => setDepartmentFilter(value === "all" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department.toLowerCase()} value={department.toLowerCase()}>{department}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Assigned Agent</label>
              <Select 
                value={agentFilter || ""}
                onValueChange={(value) => setAgentFilter(value === "all" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Agents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  {assignedAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
