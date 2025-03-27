
import React, { useState } from "react";
import { SupportTicket, SupportMessage } from "@/types/support";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Send, 
  MessageSquare, 
  Eye, 
  Lock, 
  User, 
  Tag,
  Paperclip
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TicketDetailsProps {
  ticket: SupportTicket;
  onSendMessage: (ticketId: string, message: string, isInternal: boolean) => void;
  onUpdateTicket: (ticketId: string, updateData: Partial<SupportTicket>) => void;
}

export const TicketDetails: React.FC<TicketDetailsProps> = ({ 
  ticket, 
  onSendMessage,
  onUpdateTicket
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "closed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(ticket.id, newMessage, isInternal);
      setNewMessage("");
    }
  };
  
  const handleUpdateStatus = (status: string) => {
    onUpdateTicket(ticket.id, { status });
  };
  
  const handleUpdatePriority = (priority: string) => {
    onUpdateTicket(ticket.id, { priority });
  };
  
  const getMessageSenderInitials = (senderId: string) => {
    return senderId.startsWith("user") ? "U" : "A";
  };
  
  const getMessageSenderName = (message: SupportMessage) => {
    return message.userId.startsWith("user") ? "Customer" : "Support Agent";
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{ticket.subject}</h2>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Status: <Badge variant="outline" className={`ml-2 ${getStatusColor(ticket.status)}`}>{ticket.status}</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleUpdateStatus("open")}>
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus("pending")}>
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus("closed")}>
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Closed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Priority: <Badge variant="outline" className={`ml-2 ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleUpdatePriority("high")}>
                  High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdatePriority("medium")}>
                  Medium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdatePriority("low")}>
                  Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>ID: {ticket.userId}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            <span>{ticket.department}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Created: {formatDate(ticket.createdAt)}</span>
          </div>
        </div>
        
        <p className="mt-4">{ticket.description}</p>
        
        {ticket.tags && ticket.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            {ticket.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </div>
      
      <Tabs defaultValue="conversation" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="notes">Internal Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conversation" className="flex-1 flex flex-col space-y-4">
          <ScrollArea className="flex-1">
            <div className="space-y-4">
              {ticket.messages
                .filter(message => !message.isInternal)
                .map((message) => (
                  <Card key={message.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{getMessageSenderInitials(message.userId)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">
                            {getMessageSenderName(message)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(message.createdAt)}
                          </div>
                        </div>
                        <p className="mt-2">{message.content}</p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </ScrollArea>
          
          <div className="mt-auto border-t pt-4">
            <div className="flex items-center mb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={!isInternal ? "bg-primary/10" : ""}
                onClick={() => setIsInternal(false)}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Reply
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={isInternal ? "bg-primary/10" : ""}
                onClick={() => setIsInternal(true)}
              >
                <Lock className="h-4 w-4 mr-1" />
                Internal Note
              </Button>
            </div>
            
            <div className="flex items-start gap-2">
              <Textarea
                placeholder={isInternal ? "Add an internal note..." : "Type your reply..."}
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button className="flex-shrink-0" onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                {isInternal ? "Add Note" : "Send"}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="customer" className="flex-1">
          <p>Customer information will appear here.</p>
        </TabsContent>
        
        <TabsContent value="notes" className="flex-1">
          <ScrollArea className="flex-1">
            <div className="space-y-4">
              {ticket.messages
                .filter(message => message.isInternal)
                .map((message) => (
                  <Card key={message.id} className="p-4 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{getMessageSenderInitials(message.userId)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">
                            {getMessageSenderName(message)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(message.createdAt)}
                          </div>
                        </div>
                        <p className="mt-2">{message.content}</p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
