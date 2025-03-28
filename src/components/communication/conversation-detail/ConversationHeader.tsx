
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MoreVertical,
  UserPlus,
  Bot,
  User,
  MessageSquare,
  Mail,
  Phone,
  Video,
  Link2,
  Globe,
  MessagesSquare
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from '@/types/omnichannel';
import { useNavigate } from 'react-router-dom';
import {
  BrandWhatsapp,
  BrandFacebook,
  BrandTelegram,
  BrandSlack
} from '@/components/ui/custom-icons';

interface ConversationHeaderProps {
  conversation: Conversation;
  onAssignToHuman: () => void;
}

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'website':
      return <Globe className="h-4 w-4" />;
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'whatsapp':
      return <BrandWhatsapp className="h-4 w-4" />;
    case 'messenger':
      return <BrandFacebook className="h-4 w-4" />;
    case 'telegram':
      return <BrandTelegram className="h-4 w-4" />;
    case 'slack':
      return <BrandSlack className="h-4 w-4" />;
    case 'sms':
      return <MessageSquare className="h-4 w-4" />;
    case 'voice':
      return <Phone className="h-4 w-4" />;
    case 'video':
      return <Video className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const getChannelName = (channel: string) => {
  switch (channel) {
    case 'website':
      return 'Website Chat';
    case 'email':
      return 'Email';
    case 'whatsapp':
      return 'WhatsApp';
    case 'messenger':
      return 'Facebook Messenger';
    case 'telegram':
      return 'Telegram';
    case 'slack':
      return 'Slack';
    case 'sms':
      return 'SMS';
    case 'voice':
      return 'Voice Call';
    case 'video':
      return 'Video Call';
    default:
      return channel.charAt(0).toUpperCase() + channel.slice(1);
  }
};

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ 
  conversation,
  onAssignToHuman 
}) => {
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getAgentBadge = () => {
    if (conversation.isAiHandled) {
      return (
        <Badge variant="outline" className="ml-2 bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400">
          <Bot className="h-3 w-3 mr-1" />
          AI Agent
        </Badge>
      );
    } else if (conversation.agent) {
      return (
        <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
          <User className="h-3 w-3 mr-1" />
          {conversation.agent}
        </Badge>
      );
    }
    return null;
  };
  
  const handleSettingsClick = () => {
    navigate('/settings/integrations');
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${conversation.name}`} alt={conversation.name} />
          <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <div className="flex items-center">
            <h2 className="text-sm font-semibold">{conversation.name}</h2>
            {getAgentBadge()}
          </div>
          <div className="flex items-center mt-1">
            <Badge 
              variant="outline" 
              className="mr-2 flex items-center gap-1 px-2 py-0.5 bg-secondary/50 hover:bg-secondary cursor-pointer"
              onClick={handleSettingsClick}
            >
              {getChannelIcon(conversation.channel)}
              <span className="text-xs">{getChannelName(conversation.channel)}</span>
            </Badge>
            <span className="text-xs text-muted-foreground">
              {conversation.lastUpdated || conversation.time}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAssignToHuman}
          disabled={conversation.assignmentStatus === 'assigned_to_human'}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {conversation.isAiHandled ? 'Assign to Human' : 'Take Over'}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleSettingsClick}>
              <Phone className="h-4 w-4 mr-2" />
              Start Voice Call
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick}>
              <Video className="h-4 w-4 mr-2" />
              Start Video Call
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Customer Profile</DropdownMenuItem>
            <DropdownMenuItem>See Previous Conversations</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Block Customer</DropdownMenuItem>
            <DropdownMenuItem>Close Conversation</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettingsClick}>
              Manage Channel Integrations
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ConversationHeader;
