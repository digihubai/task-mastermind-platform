
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Smile,
  Reply,
  Pin,
  Copy,
  BookmarkPlus,
  MoreVertical,
  Edit,
  Share,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MessageReaction {
  emoji: string;
  count: number;
  users?: string[];
}

interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  status: string;
  avatar?: string;
}

export interface TeamMessage {
  id: string;
  channelId?: string;
  groupId?: string;
  content: string;
  createdAt: string;
  senderId: string;
  reactions?: MessageReaction[];
  attachments?: MessageAttachment[];
  mentions?: string[];
  replyTo?: string;
}

interface MessageItemProps {
  message: TeamMessage;
  sender: TeamMember;
  isReplyHighlighted: boolean;
  onReply: (messageId: string) => void;
  onPinMessage: (messageId: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  sender,
  isReplyHighlighted,
  onReply,
  onPinMessage
}) => {
  return (
    <div 
      key={message.id} 
      className={`flex gap-3 ${isReplyHighlighted ? 'bg-secondary/50 p-2 rounded-md' : ''}`}
    >
      {message.replyTo && (
        <div className="ml-10 text-xs text-muted-foreground mb-1 flex items-center gap-1">
          <Reply size={12} />
          <span>Replying to a message</span>
        </div>
      )}
      
      <Avatar className="h-8 w-8 mt-0.5">
        {sender.avatar && <AvatarImage src={sender.avatar} />}
        <AvatarFallback>{sender.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{sender.name}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(message.createdAt).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        
        <p className="text-sm mt-1">{message.content}</p>
        
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {message.reactions.map((reaction, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="gap-1 text-xs cursor-pointer hover:bg-secondary/80"
              >
                {reaction.emoji} <span>{reaction.count}</span>
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-1 mt-1 opacity-0 hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Smile size={14} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => onReply(message.id)}
          >
            <Reply size={14} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => onPinMessage(message.id)}
          >
            <Pin size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Copy size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <BookmarkPlus size={14} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem className="gap-2">
                <Edit size={14} /> Edit message
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Pin size={14} /> Pin message
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Share size={14} /> Share message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive">
                <Trash2 size={14} /> Delete message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
