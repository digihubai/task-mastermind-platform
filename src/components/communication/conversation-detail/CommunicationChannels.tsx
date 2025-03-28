
import React from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Phone, Video, MessageSquare, Mail, Smartphone, MessageCircle, Podcast } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CommunicationChannelsProps {
  customerId: string;
}

const CommunicationChannels: React.FC<CommunicationChannelsProps> = ({ customerId }) => {
  const handleChannelSelect = (channel: string) => {
    toast({
      title: `${channel} communication initiated`,
      description: `Starting ${channel.toLowerCase()} with customer ${customerId}`
    });
  };
  
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button 
        size="sm" 
        variant="outline" 
        className="gap-1" 
        onClick={() => handleChannelSelect("Voice Call")}
      >
        <Phone size={16} className="text-green-500" />
        <span className="hidden md:inline">Call</span>
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="gap-1"
        onClick={() => handleChannelSelect("Video Call")}
      >
        <Video size={16} className="text-blue-500" />
        <span className="hidden md:inline">Video</span>
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="gap-1"
        onClick={() => handleChannelSelect("SMS")}
      >
        <MessageCircle size={16} className="text-purple-500" />
        <span className="hidden md:inline">SMS</span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" className="gap-1">
            <MessageSquare size={16} />
            <span>More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleChannelSelect("Email")}>
            <Mail size={16} className="mr-2" />
            Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleChannelSelect("WhatsApp")}>
            <Smartphone size={16} className="mr-2" />
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleChannelSelect("Voice Message")}>
            <Podcast size={16} className="mr-2" />
            Voice Message
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CommunicationChannels;
