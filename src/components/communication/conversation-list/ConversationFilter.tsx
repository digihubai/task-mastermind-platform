
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';

interface ConversationFilterProps {
  activeTab: string;
  filterStatus: string;
  onTabChange: (tab: string) => void;
  onFilterChange: (filter: string) => void;
}

const ConversationFilter: React.FC<ConversationFilterProps> = ({
  activeTab,
  filterStatus,
  onTabChange,
  onFilterChange
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          className="pl-8 pr-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-0"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </div>
      
      <div className="flex flex-col gap-2">
        <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
          </TabsList>
          <div className="mt-2 grid grid-cols-4 gap-2">
            <TabsTrigger value="sms" className="bg-muted/50 text-xs py-1 hover:bg-muted">SMS</TabsTrigger>
            <TabsTrigger value="whatsapp" className="bg-muted/50 text-xs py-1 hover:bg-muted">WhatsApp</TabsTrigger>
            <TabsTrigger value="messenger" className="bg-muted/50 text-xs py-1 hover:bg-muted">Messenger</TabsTrigger>
            <TabsTrigger value="telegram" className="bg-muted/50 text-xs py-1 hover:bg-muted">Telegram</TabsTrigger>
          </div>
        </Tabs>
        
        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="waiting">Waiting</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ConversationFilter;
