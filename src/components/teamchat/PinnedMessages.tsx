
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  X, 
  Pin,
  MessageSquare,
  MoreVertical
} from "lucide-react";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TeamMessage } from "@/types/support";
import { toast } from "sonner";

interface PinnedMessagesProps {
  isOpen: boolean;
  onClose: () => void;
  messages: TeamMessage[];
  onUnpinMessage?: (messageId: string) => void;
}

const PinnedMessages: React.FC<PinnedMessagesProps> = ({ 
  isOpen, 
  onClose, 
  messages,
  onUnpinMessage
}) => {
  const handleUnpin = (messageId: string) => {
    if (onUnpinMessage) {
      onUnpinMessage(messageId);
    }
    toast.success("Message unpinned");
  };

  if (!isOpen) return null;

  return (
    <div className="border-l h-full w-80 bg-background animate-slide-in-right flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Pin size={16} className="mr-2" />
          <h3 className="font-medium">Pinned Messages</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="border rounded-md p-3 bg-secondary/30 relative group">
                <div className="flex items-start gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="font-medium text-sm">User Name</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(message.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    
                    <p className="text-sm break-words">{message.content}</p>
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className="text-xs text-primary flex items-center mt-1">
                            <span className="truncate">{attachment.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUnpin(message.id)}>
                        Unpin message
                      </DropdownMenuItem>
                      <DropdownMenuItem>Go to message</DropdownMenuItem>
                      <DropdownMenuItem>Copy text</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No pinned messages</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Important messages that are pinned will appear here
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PinnedMessages;
