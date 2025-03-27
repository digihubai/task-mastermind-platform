
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile, Clock, CheckCircle, Info } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="pr-24"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Paperclip size={16} />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Smile size={16} />
            </Button>
          </div>
        </div>
        <Button onClick={handleSendMessage}>
          <Send size={16} className="mr-1.5" />
          Send
        </Button>
      </div>
      
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            Response time: 2m
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle size={12} />
            AI is responding
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <span>Suggested responses</span>
          <Info size={12} />
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
