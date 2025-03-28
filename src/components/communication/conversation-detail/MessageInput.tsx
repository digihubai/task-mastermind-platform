
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, SmilePlus, PaperclipIcon, MessageSquarePlus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { mockSavedReplies } from '../mock-data';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  channel?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, channel }) => {
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const filteredReplies = mockSavedReplies.filter(reply => 
    reply.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    reply.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleReplySelect = (content: string) => {
    setMessage(content);
  };

  return (
    <div className="border-t p-3">
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Type a message${channel ? ` (${channel})` : ''}...`}
            className="min-h-[80px] resize-none"
          />
          
          <div className="flex gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <SmilePlus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="p-2">
                  <div className="grid grid-cols-8 gap-2">
                    {["😊", "👍", "🙏", "❤️", "😂", "🎉", "🔥", "👏", 
                      "🤔", "😅", "🙌", "💯", "🙄", "😍", "🤝", "👋"].map(emoji => (
                      <button
                        key={emoji}
                        className="text-2xl hover:bg-secondary p-2 rounded-md"
                        onClick={() => setMessage(prev => prev + emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" size="icon" className="h-8 w-8">
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MessageSquarePlus className="h-4 w-4" />
                  <span className="sr-only">Saved Replies</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80">
                <div className="p-2">
                  <Input
                    placeholder="Search saved replies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-2"
                  />
                  
                  <ScrollArea className="h-64">
                    <div className="space-y-1">
                      {filteredReplies.length > 0 ? (
                        filteredReplies.map((reply) => (
                          <DropdownMenuItem 
                            key={reply.id}
                            className="flex flex-col items-start cursor-pointer"
                            onClick={() => handleReplySelect(reply.content)}
                          >
                            <div className="font-medium">{reply.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {reply.content}
                            </div>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="text-center py-2 text-muted-foreground">
                          No saved replies found
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Button 
          onClick={handleSendMessage} 
          className="h-10 px-4 py-2"
        >
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
