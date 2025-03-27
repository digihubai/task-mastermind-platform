
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AIToolSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AIToolSearch = ({ searchQuery, setSearchQuery }: AIToolSearchProps) => {
  return (
    <div className="relative flex-1 max-w-lg">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
      <Input
        placeholder="Search AI tools..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default AIToolSearch;
