
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings, Users, ExternalLink, MessageSquare } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface OmnichannelHeaderProps {
  onSettingsClick: () => void;
}

const OmnichannelHeader: React.FC<OmnichannelHeaderProps> = ({ onSettingsClick }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold">Omnichannel Support</h1>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate('/settings/integrations')}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Configure Channels
        </Button>
        <Button variant="outline" onClick={onSettingsClick}>
          <Settings className="mr-2 h-4 w-4" />
          AI Settings
        </Button>
        <Button variant="outline" onClick={() => navigate('/support/embed')}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Embed Form
        </Button>
        <Button variant="outline" onClick={() => navigate('/ai/chatbots')}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Embed AI Chatbot
        </Button>
      </div>
    </div>
  );
};

export default OmnichannelHeader;
