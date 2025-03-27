
import React, { useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRight, Mail, MessageSquare, Phone, Instagram, Twitter, Facebook, Send, Paperclip, Smile, Clock, CheckCircle, Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ChannelInfoSection from './ChannelInfoSection';

// Define proper types to match with OmnichannelInbox
interface Conversation {
  id: string;
  name: string;
  message: string;
  unread: boolean;
  time: string;
  channel: string;
  status: string;
  priority: string;
  agent: string | null;
}

interface Message {
  id: string;
  sender: 'customer' | 'ai' | 'human';
  content: string;
  time: string;
  channel: string;
}

interface ConversationDetailsProps {
  conversation: Conversation | undefined;
  messages: Message[];
}

// Sample pinned messages data for demo
const samplePinnedMessages = [
  {
    id: "pin1",
    content: "Important contact information: support@example.com",
    sender: {
      id: "user-1",
      name: "John Doe",
      avatar: "/avatar-1.png"
    },
    timestamp: "Yesterday at 3:45 PM"
  },
  {
    id: "pin2",
    content: "Meeting scheduled for next Tuesday at 10 AM",
    sender: {
      id: "user-2",
      name: "Sarah Miller"
    },
    timestamp: "Oct 5, 2023"
  }
];

const ConversationDetails: React.FC<ConversationDetailsProps> = ({ conversation, messages }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage("");
  };

  const handleAssignToHuman = () => {
    // Logic to assign conversation to human agent
    console.log('Assigning conversation to human agent');
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail size={16} />;
      case 'chat':
        return <MessageSquare size={16} />;
      case 'sms':
        return <MessageSquare size={16} />;
      case 'phone':
        return <Phone size={16} />;
      case 'instagram':
        return <Instagram size={16} />;
      case 'twitter':
        return <Twitter size={16} />;
      case 'facebook':
        return <Facebook size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <MessageSquare size={48} className="mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No conversation selected</h3>
          <p className="text-muted-foreground">Select a conversation from the list to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-medium">
                {conversation?.name.substring(0, 2)}
              </div>
            </Avatar>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{conversation?.name}</h3>
                <Badge variant="outline" className="text-xs capitalize">
                  {conversation?.channel}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Customer since January 2023 • 5 previous conversations
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleAssignToHuman}>
              <ArrowUpRight size={14} className="mr-1.5" />
              Assign to Human
            </Button>
            <Select defaultValue="open">
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Add Channel Info Section */}
      <ChannelInfoSection 
        channelId={conversation.id}
        channelName={conversation.name}
        initialDescription="This channel is for discussing customer support inquiries and tracking resolutions."
        pinnedMessages={samplePinnedMessages}
      />
      
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender !== 'customer' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'customer' 
                      ? 'bg-muted'
                      : message.sender === 'ai' 
                        ? 'bg-primary/10 text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {message.sender !== 'customer' && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      {message.sender === 'ai' ? (
                        <span className="font-medium">🤖 AI Assistant</span>
                      ) : (
                        <span className="font-medium">👤 Human Agent</span>
                      )}
                      <span>•</span>
                      <span>{message.time}</span>
                      <span>•</span>
                      <div className="p-0.5 rounded-full bg-primary/10 text-primary">
                        {getChannelIcon(message.channel)}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-sm">{message.content}</p>
                  
                  {message.sender === 'customer' && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 justify-end">
                      <span>{message.time}</span>
                      <span>•</span>
                      <div className="p-0.5 rounded-full bg-primary/10 text-primary">
                        {getChannelIcon(message.channel)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
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
    </div>
  );
};

export default ConversationDetails;
