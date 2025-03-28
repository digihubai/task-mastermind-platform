
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketIcon, MessageSquare, Phone } from "lucide-react";

interface SupportTabListProps {
  activeTab: string;
}

const SupportTabList: React.FC<SupportTabListProps> = ({ activeTab }) => {
  return (
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="tickets">
        <TicketIcon className="h-4 w-4 mr-2" />
        Tickets
      </TabsTrigger>
      <TabsTrigger value="inbox">
        <MessageSquare className="h-4 w-4 mr-2" />
        Inbox
      </TabsTrigger>
      <TabsTrigger value="calls">
        <Phone className="h-4 w-4 mr-2" />
        Calls
      </TabsTrigger>
    </TabsList>
  );
};

export default SupportTabList;
