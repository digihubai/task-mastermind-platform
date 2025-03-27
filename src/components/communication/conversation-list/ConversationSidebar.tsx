
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import ConversationFilter from './ConversationFilter';
import ConversationList from './ConversationList';
import type { Conversation } from "@/types/omnichannel";

interface ConversationSidebarProps {
  conversations: Conversation[];
  filterStatus: string;
  activeTab: string;
  selectedConversationId: string | null;
  onTabChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onSelectConversation: (id: string) => void;
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  filterStatus,
  activeTab,
  selectedConversationId,
  onTabChange,
  onFilterChange,
  onSelectConversation
}) => {
  const filteredConversations = conversations.filter(convo => {
    if (filterStatus !== 'all' && convo.status !== filterStatus) return false;
    if (activeTab === 'all') return true;
    return convo.channel === activeTab;
  });

  return (
    <Card className="h-[calc(100vh-180px)]">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Conversations</CardTitle>
          <Button size="sm" variant="outline">
            <Plus size={16} className="mr-1" />
            New
          </Button>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
          />
        </div>
        <ConversationFilter 
          filterStatus={filterStatus} 
          onFilterChange={onFilterChange} 
        />
      </CardHeader>
      
      <Tabs value={activeTab} className="w-full" onValueChange={onTabChange}>
        <div className="px-4">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="email" className="flex-1">Email</TabsTrigger>
            <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
            <TabsTrigger value="phone" className="flex-1">Voice</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="p-0 pt-3">
          <ConversationList
            conversations={filteredConversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={onSelectConversation}
          />
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ConversationSidebar;
