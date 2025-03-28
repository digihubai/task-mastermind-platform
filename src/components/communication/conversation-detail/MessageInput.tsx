
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Paperclip, 
  Smile, 
  Save,
  FileText,
  X,
  Phone,
  Mic,
  PhoneCall,
  Video
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from '@/components/ui/scroll-area';
import { savedReplies } from '../mock-data';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  channel?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, channel = 'website' }) => {
  const [message, setMessage] = useState('');
  const [showSavedReplies, setShowSavedReplies] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

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
  
  const handleCommunicationAction = (type: 'voice' | 'video' | 'recording') => {
    // Check if the selected channel supports this type of communication
    const supportedChannels = {
      voice: ['voice', 'whatsapp', 'telephone'],
      video: ['video', 'whatsapp'],
      recording: ['whatsapp', 'messenger', 'telegram']
    };
    
    if (supportedChannels[type].includes(channel)) {
      if (type === 'voice') {
        toast({
          title: "Starting voice call",
          description: "Initiating voice call with the customer...",
        });
      } else if (type === 'video') {
        toast({
          title: "Starting video call",
          description: "Initiating video call with the customer...",
        });
      } else if (type === 'recording') {
        setIsRecording(!isRecording);
        if (isRecording) {
          toast({
            title: "Voice message recorded",
            description: "Your voice message has been recorded and will be sent.",
          });
        } else {
          toast({
            title: "Recording voice message",
            description: "Speak now to record your message. Click again to stop recording.",
          });
        }
      }
    } else {
      // If the selected channel doesn't support this type of communication, redirect to integration settings
      toast({
        title: "Integration required",
        description: `This feature requires proper channel integration. Redirecting to settings...`,
        variant: "destructive"
      });
      navigate('/settings/integrations');
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
                    onClick={() => setShowSavedReplies(false)}
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
          <Button 
            variant="ghost" 
            size="icon" 
            className={`text-muted-foreground ${isRecording ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : ''}`}
            onClick={() => handleCommunicationAction('recording')}
            title="Record voice message"
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground"
            onClick={() => handleCommunicationAction('voice')}
            title="Start voice call"
          >
            <Phone className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground"
            onClick={() => handleCommunicationAction('video')}
            title="Start video call"
          >
            <Video className="h-5 w-5" />
          </Button>
        
          <Button variant="ghost" size="icon" className="text-muted-foreground" title="Attach file">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground" title="Add emoji">
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
