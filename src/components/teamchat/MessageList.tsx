
import React from "react";
import { TeamMessage } from "@/types/support";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeamMember } from "./TeamChat";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Reply, 
  Pin, 
  Copy, 
  BookmarkPlus, 
  MoreVertical, 
  Edit, 
  Share, 
  ExternalLink, 
  Flag, 
  Trash2, 
  Smile,
  MessageSquare
} from "lucide-react";

interface MessageListProps {
  messages: TeamMessage[];
  getSender: (senderId: string) => TeamMember;
  replyTo: string | null;
  setReplyTo: (messageId: string | null) => void;
  onPinMessage: (messageId: string) => void;
  onUnpinMessage: (messageId: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  getSender,
  replyTo,
  setReplyTo,
  onPinMessage,
  onUnpinMessage
}) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => {
            const sender = getSender(message.senderId);
            const isReplyHighlighted = replyTo === message.id;
            
            return (
              <div 
                key={message.id} 
                className={`flex gap-3 group ${isReplyHighlighted ? 'bg-secondary/50 p-2 rounded-md' : ''} ${message.isPinned ? 'border-l-2 border-yellow-500 pl-2' : ''}`}
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
                    {message.isPinned && (
                      <Badge variant="outline" className="text-xs flex items-center gap-1 text-yellow-600 border-yellow-300 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
                        <Pin size={10} className="text-yellow-500" />
                        Pinned
                      </Badge>
                    )}
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
                  
                  <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Smile size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => setReplyTo(message.id)}
                    >
                      <Reply size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => {
                        if (message.isPinned) {
                          onUnpinMessage(message.id);
                        } else {
                          onPinMessage(message.id);
                        }
                      }}
                    >
                      <Pin size={14} className={message.isPinned ? "text-yellow-500" : ""} />
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
                        <DropdownMenuItem className="gap-2" onClick={() => {
                          if (message.isPinned) {
                            onUnpinMessage(message.id);
                          } else {
                            onPinMessage(message.id);
                          }
                        }}>
                          <Pin size={14} /> {message.isPinned ? "Unpin message" : "Pin message"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Share size={14} /> Share message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <ExternalLink size={14} /> Open in thread
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Flag size={14} /> Report message
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
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No messages yet</h3>
            <p className="text-muted-foreground text-sm">
              Start a conversation to see messages here
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
