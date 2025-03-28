
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Users, ExternalLink, MessageSquare } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface OmnichannelHeaderProps {
  onSettingsClick: () => void;
  onNewTicket: () => void;
}

const OmnichannelHeader: React.FC<OmnichannelHeaderProps> = ({ onSettingsClick, onNewTicket }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold">Omnichannel Support</h1>
      
      <div className="flex gap-3">
        <Button variant="outline" onClick={onSettingsClick}>
          <Settings className="mr-2 h-4 w-4" />
          AI Settings
        </Button>
        <Button variant="outline" onClick={() => navigate('/support/embed')}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Embed Form
        </Button>
        <Button variant="outline" onClick={() => navigate('/support/embed-chatbot')}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Embed AI Chatbot
        </Button>
        <Button variant="outline" onClick={() => navigate('/support/tickets')}>
          <Users className="mr-2 h-4 w-4" />
          All Tickets
        </Button>
        <Button onClick={onNewTicket}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>
    </div>
  );
};

export default OmnichannelHeader;
