
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, ExternalLink } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface SupportDashboardHeaderProps {
  onNewTicket?: () => void;
}

const SupportDashboardHeader: React.FC<SupportDashboardHeaderProps> = ({ onNewTicket }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold">Support Dashboard</h1>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => navigate('/support/embed')}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Embed Form
        </Button>
        <Button variant="outline" onClick={() => navigate('/support/tickets')}>
          <Users className="mr-2 h-4 w-4" />
          All Tickets
        </Button>
      </div>
    </div>
  );
};

export default SupportDashboardHeader;
