
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SupportTicket, SupportMessage } from "@/types/support";
import { 
  ArrowLeft, 
  Paperclip, 
  Send, 
  User, 
  Clock, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  XCircle,
  Clock8
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TicketDetailsProps {
  ticket: SupportTicket;
  messages: SupportMessage[];
  onBack: () => void;
  onReply: (message: string) => void;
}

export const TicketDetails: React.FC<TicketDetailsProps> = ({
  ticket,
  messages,
  onBack,
  onReply,
}) => {
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const getStatusIcon = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="text-blue-500" size={16} />;
      case 'in_progress':
        return <Clock8 className="text-yellow-500" size={16} />;
      case 'resolved':
        return <CheckCircle2 className="text-green-500" size={16} />;
      case 'closed':
        return <XCircle className="text-gray-500" size={16} />;
    }
  };

  const getStatusText = (status: SupportTicket['status']) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText("");
      toast({
        title: "Reply sent",
        description: "Your reply has been sent successfully.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          <span>Back to tickets</span>
        </Button>
      </div>
      
      <Card className="p-6 border border-border/40">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-semibold">{ticket.subject}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User size={14} />
                <span>User ID: {ticket.userId}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock size={14} />
                <span>Created: {formatDate(ticket.createdAt)}</span>
              </div>
              {ticket.department && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Tag size={14} />
                  <span>Department: {ticket.department}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              {getStatusIcon(ticket.status)}
              <span>{getStatusText(ticket.status)}</span>
            </Badge>
            <Badge variant="outline" className={
              ticket.priority === 'urgent' ? 'bg-red-50 text-red-800 border-red-200' :
              ticket.priority === 'high' ? 'bg-orange-50 text-orange-800 border-orange-200' :
              ticket.priority === 'medium' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
              'bg-green-50 text-green-800 border-green-200'
            }>
              Priority: {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div className="bg-secondary/30 p-4 rounded-md mb-6">
          <p className="whitespace-pre-wrap">{ticket.description}</p>
        </div>
        
        <Separator className="my-6" />
        
        <h3 className="text-lg font-medium mb-4">Conversation</h3>
        
        <div className="space-y-6 mb-6">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={message.senderType === 'user' ? undefined : '/avatar.png'} />
                <AvatarFallback>
                  {message.senderType === 'user' ? 'U' : message.senderType === 'agent' ? 'A' : 'S'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {message.senderType === 'user' 
                      ? 'Customer' 
                      : message.senderType === 'agent' 
                        ? 'Support Agent' 
                        : 'System'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
                
                <div className="bg-secondary/30 p-3 rounded-md">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-1 text-sm bg-background p-1.5 rounded border">
                        <Paperclip size={14} />
                        <span>{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No messages yet. Start the conversation by replying below.
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Reply</h4>
          
          <Textarea
            placeholder="Type your message here..."
            className="resize-none min-h-[120px]"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" className="gap-1">
              <Paperclip size={16} />
              <span>Attach File</span>
            </Button>
            
            <Button 
              className="gap-1"
              disabled={!replyText.trim()}
              onClick={handleSubmitReply}
            >
              <Send size={16} />
              <span>Send Reply</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
