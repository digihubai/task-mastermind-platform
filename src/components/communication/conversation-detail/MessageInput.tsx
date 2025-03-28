
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Smile } from 'lucide-react';
import SavedRepliesSelector from './SavedRepliesSelector';
import { mockSavedReplies } from '../mock-data/saved-replies';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  channel?: string; // Added channel as an optional prop
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage,
  placeholder = "Type your message...",
  channel // Added channel prop
}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInsertSavedReply = (content: string) => {
    setMessage(prevMessage => {
      // If there's already content, add a space before the saved reply
      return prevMessage.trim() ? `${prevMessage} ${content}` : content;
    });
  };

  // Get channel-specific placeholder text if needed
  const getChannelSpecificPlaceholder = () => {
    if (!channel) return placeholder;
    
    switch (channel.toLowerCase()) {
      case 'email':
        return "Type your email response...";
      case 'whatsapp':
        return "Type your WhatsApp message...";
      case 'sms':
        return "Type your SMS (160 char limit)...";
      default:
        return placeholder;
    }
  };

  return (
    <div className="border-t pt-4">
      <div className="flex items-center space-x-2 mb-2">
        <SavedRepliesSelector 
          savedReplies={mockSavedReplies}
          onSelectReply={handleInsertSavedReply}
        />
        <Button variant="outline" size="sm" className="h-8">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          <Smile className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getChannelSpecificPlaceholder()}
          className="flex-1 resize-none"
          rows={3}
          maxLength={channel?.toLowerCase() === 'sms' ? 160 : undefined}
        />
        <Button 
          onClick={handleSendMessage} 
          size="icon"
          disabled={!message.trim()}
          className="self-end h-10 w-10"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
