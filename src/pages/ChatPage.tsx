
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MessageSquare, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip,
  Send,
  Check,
  CheckCheck,
  ArrowRight
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const mockContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    lastMessage: "I'll review the proposal and get back to you",
    time: "12:45 PM",
    unread: 2,
    isOnline: true
  },
  {
    id: 2,
    name: "Michael Stevens",
    avatar: "MS",
    lastMessage: "Can we schedule a call to discuss the project details?",
    time: "11:30 AM",
    unread: 0,
    isOnline: true
  },
  {
    id: 3,
    name: "Emily Williams",
    avatar: "EW",
    lastMessage: "The team is ready to start the implementation phase",
    time: "Yesterday",
    unread: 0,
    isOnline: false
  },
  {
    id: 4,
    name: "Daniel Brown",
    avatar: "DB",
    lastMessage: "I've sent the contract for your review",
    time: "Yesterday",
    unread: 0,
    isOnline: false
  },
  {
    id: 5,
    name: "Jessica Martinez",
    avatar: "JM",
    lastMessage: "Thanks for your help with the website design",
    time: "Monday",
    unread: 0,
    isOnline: true
  }
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Hi there! I just reviewed your proposal for the website redesign.",
    timestamp: "10:30 AM",
    status: "read"
  },
  {
    id: 2,
    senderId: "me",
    text: "Great! What did you think about it?",
    timestamp: "10:32 AM",
    status: "read"
  },
  {
    id: 3,
    senderId: 1,
    text: "I think it looks promising. I especially like the new layout for the product pages. It's much more user-friendly.",
    timestamp: "10:34 AM",
    status: "read"
  },
  {
    id: 4,
    senderId: 1,
    text: "I do have a few questions about the timeline though. Can we go over that in more detail?",
    timestamp: "10:35 AM",
    status: "read"
  },
  {
    id: 5,
    senderId: "me",
    text: "Absolutely! I'm glad you like the design approach. Regarding the timeline, we can definitely adjust it to better suit your needs. What aspects are you concerned about?",
    timestamp: "10:38 AM",
    status: "read"
  },
  {
    id: 6,
    senderId: 1,
    text: "I was wondering if we could expedite the development phase. Our marketing team wants to launch the new site before the holiday season.",
    timestamp: "10:40 AM",
    status: "read"
  },
  {
    id: 7,
    senderId: "me",
    text: "I understand the urgency. We can potentially allocate more resources to speed up development. Let me check with my team and get back to you with an updated timeline by tomorrow. Would that work for you?",
    timestamp: "10:43 AM",
    status: "read"
  },
  {
    id: 8,
    senderId: 1,
    text: "That would be perfect. Thank you so much for accommodating our request.",
    timestamp: "10:45 AM",
    status: "read"
  },
  {
    id: 9,
    senderId: 1,
    text: "I'll review the proposal and get back to you with any other feedback by the end of the day.",
    timestamp: "10:47 AM",
    status: "delivered"
  }
];

const ChatPage = () => {
  const { toast } = useToast();
  const [activeContact, setActiveContact] = useState(mockContacts[0]);
  const [messageText, setMessageText] = useState("");
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
    
    setMessageText("");
  };
  
  return (
    <AppLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-4 animate-fade-in">
        <Card className="w-full md:w-80 flex flex-col border border-border/40">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:bg-secondary focus:border-primary/20 transition-colors"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {mockContacts.map(contact => (
                <div 
                  key={contact.id}
                  className={`
                    p-3 rounded-md cursor-pointer transition-colors
                    ${activeContact.id === contact.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-secondary'
                    }
                  `}
                  onClick={() => setActiveContact(contact)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div 
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                          ${activeContact.id === contact.id 
                            ? 'bg-primary-foreground text-primary' 
                            : 'bg-secondary text-foreground'
                          }
                        `}
                      >
                        {contact.avatar}
                      </div>
                      {contact.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium truncate ${activeContact.id === contact.id ? '' : ''}`}>
                          {contact.name}
                        </h3>
                        <span className={`text-xs ${activeContact.id === contact.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {contact.time}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <p className={`text-sm truncate ${activeContact.id === contact.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {contact.lastMessage}
                        </p>
                        
                        {contact.unread > 0 && (
                          <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            {contact.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
        
        <Card className="flex-1 flex flex-col border border-border/40">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                  {activeContact.avatar}
                </div>
                {activeContact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background"></div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium">{activeContact.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {activeContact.isOnline ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => {
                  toast({
                    title: "Feature in development",
                    description: "Voice calls will be available soon",
                  });
                }}
              >
                <Phone size={18} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => {
                  toast({
                    title: "Feature in development",
                    description: "Video calls will be available soon",
                  });
                }}
              >
                <Video size={18} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Chat options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View contact info</DropdownMenuItem>
                  <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                  <DropdownMenuItem>Notification settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Clear chat history</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Block contact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mockMessages.map(message => {
                const isMe = message.senderId === "me";
                
                return (
                  <div 
                    key={message.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`
                        max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-lg
                        ${isMe 
                          ? 'bg-primary text-primary-foreground rounded-br-none' 
                          : 'bg-secondary text-foreground rounded-bl-none'
                        }
                      `}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div 
                        className={`
                          flex items-center justify-end gap-1 mt-1 text-xs
                          ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}
                        `}
                      >
                        <span>{message.timestamp}</span>
                        {isMe && (
                          message.status === "read" 
                            ? <CheckCheck size={14} /> 
                            : <Check size={14} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => {
                  toast({
                    title: "Feature in development",
                    description: "Emoji picker will be available soon",
                  });
                }}
              >
                <Smile size={20} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => {
                  toast({
                    title: "Feature in development",
                    description: "File attachments will be available soon",
                  });
                }}
              >
                <Paperclip size={20} />
              </Button>
              
              <input 
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-secondary/50 border border-border rounded-md px-4 py-2 text-sm focus:bg-secondary focus:border-primary/20 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              
              <Button 
                onClick={handleSendMessage}
                size="icon" 
                className="rounded-full"
                disabled={!messageText.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
