
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import ConversationFilter from './ConversationFilter';
import ConversationList from './ConversationList';
import type { Conversation } from "@/types/omnichannel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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

  // Define all the available channels
  const channels = [
    { id: 'all', label: 'All' },
    { id: 'email', label: 'Email' },
    { id: 'chat', label: 'Chat' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'messenger', label: 'Messenger' },
    { id: 'telegram', label: 'Telegram' },
    { id: 'sms', label: 'SMS' },
    { id: 'voice', label: 'Voice' },
  ];

  // Display first 4 channels as tabs, rest in dropdown
  const visibleChannels = channels.slice(0, 4);
  const dropdownChannels = channels.slice(4);

  const handleNewConversation = () => {
    // In a real application, this would open a form to create a new conversation
    console.log("Creating new conversation");
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Conversations</CardTitle>
          <Button size="sm" variant="outline" onClick={handleNewConversation}>
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
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </CardHeader>
      
      <Tabs value={activeTab} className="w-full" onValueChange={onTabChange}>
        <div className="px-4">
          <div className="flex">
            <TabsList className="flex-1">
              {visibleChannels.map(channel => (
                <TabsTrigger key={channel.id} value={channel.id} className="flex-1">
                  {channel.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {dropdownChannels.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-1">
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {dropdownChannels.map(channel => (
                    <DropdownMenuItem 
                      key={channel.id} 
                      onClick={() => onTabChange(channel.id)}
                      className={activeTab === channel.id ? "bg-secondary" : ""}
                    >
                      {channel.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
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
