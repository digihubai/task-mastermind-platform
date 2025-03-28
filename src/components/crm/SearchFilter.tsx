
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChevronDown, PlusCircle } from "lucide-react";

interface SearchFilterProps {
  activeTab: string;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddClick: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  activeTab, 
  searchQuery, 
  onSearchChange,
  onAddClick
}) => {
  const getAddButtonLabel = () => {
    switch (activeTab) {
      case "contacts": return "Add Contact";
      case "deals": return "Add Deal";
      case "activities": return "Log Activity";
      default: return "Add";
    }
  };

  return (
    <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          placeholder={`Search ${activeTab}...`} 
          className="pl-10"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2"
        >
          <Filter size={18} />
          <span>Filter</span>
          <ChevronDown size={14} />
        </Button>
        
        <Button
          onClick={onAddClick}
          className="flex items-center gap-2"
        >
          <PlusCircle size={18} />
          <span>{getAddButtonLabel()}</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
