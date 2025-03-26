
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SupportUser, SupportTicket } from "@/types/support";
import { 
  User, 
  Mail, 
  Calendar, 
  Clock, 
  Globe, 
  Monitor, 
  Phone, 
  MapPin,
  Building,
  Hash,
  Link as LinkIcon,
  Edit,
  ArrowLeft,
  MessageSquare,
  Eye,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface UserDetailsProps {
  user: SupportUser;
  tickets?: SupportTicket[];
  onBack: () => void;
  onViewTicket?: (ticket: SupportTicket) => void;
  onEdit?: () => void;
  onStartConversation?: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  tickets,
  onBack,
  onViewTicket,
  onEdit,
  onStartConversation,
}) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return "bg-blue-50 text-blue-800 border-blue-200";
      case 'in_progress':
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case 'resolved':
        return "bg-green-50 text-green-800 border-green-200";
      case 'closed':
        return "bg-gray-50 text-gray-800 border-gray-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
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
          <span>Back</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border border-border/40 md:col-span-1">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-semibold text-center">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            
            <div className="flex gap-2 mt-3">
              {onEdit && (
                <Button size="sm" variant="outline" onClick={onEdit} className="gap-1">
                  <Edit size={16} />
                  <span>Edit</span>
                </Button>
              )}
              
              {onStartConversation && (
                <Button size="sm" onClick={onStartConversation} className="gap-1">
                  <MessageSquare size={16} />
                  <span>Message</span>
                </Button>
              )}
            </div>
          </div>
          
          <Separator className="mb-6" />
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User size={16} className="text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">User ID</span>
                <p className="text-sm font-medium">{user.id}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Created</span>
                <p className="text-sm font-medium">{formatDate(user.createdAt)}</p>
              </div>
            </div>
            
            {user.lastActivity && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Last Activity</span>
                  <p className="text-sm font-medium">{formatDate(user.lastActivity)}</p>
                </div>
              </div>
            )}
            
            {user.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <p className="text-sm font-medium">{user.phone}</p>
                </div>
              </div>
            )}
            
            {user.company && (
              <div className="flex items-center gap-2">
                <Building size={16} className="text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Company</span>
                  <p className="text-sm font-medium">{user.company}</p>
                </div>
              </div>
            )}
          </div>
          
          <Separator className="my-6" />
          
          <h3 className="text-sm font-medium mb-3">Technical Details</h3>
          
          <div className="space-y-3">
            {user.browser && (
              <div className="flex items-center gap-2">
                <Monitor size={16} className="text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Browser</span>
                  <p className="text-sm font-medium">{user.browser}</p>
                </div>
              </div>
            )}
            
            {user.os && (
              <div className="flex items-center gap-2">
                <Monitor size={16} className="text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">OS</span>
                  <p className="text-sm font-medium">{user.os}</p>
                </div>
              </div>
            )}
            
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Location</span>
                  <p className="text-sm font-medium">{user.location}</p>
                </div>
              </div>
            )}
            
            {user.ip && (
              <div className="flex items-center gap-2">
                <Hash size={16} className="text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">IP Address</span>
                  <p className="text-sm font-medium">{user.ip}</p>
                </div>
              </div>
            )}
            
            {user.currentUrl && (
              <div className="flex items-center gap-2">
                <LinkIcon size={16} className="text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Current URL</span>
                  <p className="text-sm font-medium truncate max-w-[200px]">{user.currentUrl}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
        
        <Card className="p-6 border border-border/40 md:col-span-2">
          <h3 className="text-lg font-medium mb-4">Support Tickets</h3>
          
          {tickets && tickets.length > 0 ? (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="flex justify-between items-center p-3 border rounded-md hover:border-primary/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{ticket.subject}</h4>
                      <Badge variant="outline" className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Created: {formatDate(ticket.createdAt)}</p>
                  </div>
                  
                  {onViewTicket && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewTicket(ticket)}
                      className="gap-1"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-medium">No tickets found</h3>
              <p className="text-sm text-muted-foreground">This user hasn't created any support tickets yet.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
