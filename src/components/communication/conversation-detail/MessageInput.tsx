
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Paperclip, 
  Smile, 
  Save,
  FileText,
  X
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from '@/components/ui/scroll-area';
import { savedReplies } from '../mockData';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showSavedReplies, setShowSavedReplies] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto expand the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const insertSavedReply = (text: string) => {
    setMessage(text);
    setShowSavedReplies(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const filteredReplies = searchTerm.length > 0 
    ? savedReplies.filter(reply => 
        reply.keyword.toLowerCase().includes(searchTerm.toLowerCase()) || 
        reply.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : savedReplies;

  return (
    <div className="border-t px-4 py-3">
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            placeholder="Type a message..."
            className="min-h-[60px] max-h-[180px] resize-none py-3 pr-10"
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-3 bottom-3">
            <Popover open={showSavedReplies} onOpenChange={setShowSavedReplies}>
              <PopoverTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6 rounded-full"
                  onClick={() => setShowSavedReplies(!showSavedReplies)}
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[300px] p-0" sideOffset={5}>
                <div className="flex items-center border-b p-2">
                  <Input
                    placeholder="Search saved replies..."
                    className="border-none shadow-none focus-visible:ring-0 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => setSearchSavedReplies(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="h-[300px]">
                  <div className="p-2 space-y-1">
                    {filteredReplies.map((reply) => (
                      <button
                        key={reply.id}
                        onClick={() => insertSavedReply(reply.text)}
                        className="text-left w-full px-2 py-2 text-sm rounded-md hover:bg-muted flex items-start"
                      >
                        <span className="font-medium text-xs bg-muted rounded px-1.5 py-0.5 mr-2 mt-0.5">#{reply.keyword}</span>
                        <span className="line-clamp-2 text-sm text-muted-foreground flex-1">{reply.text}</span>
                      </button>
                    ))}
                    {filteredReplies.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        No saved replies found
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Smile className="h-5 w-5" />
          </Button>
          <Button onClick={handleSend}>
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
