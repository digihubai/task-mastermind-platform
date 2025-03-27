
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SupportUser, SupportTicket } from "@/types/support";
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Building, 
  Globe, 
  Clock, 
  Monitor, 
  Server, 
  User,
  MessageSquare,
  Link,
  ExternalLink
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserDetailsProps {
  user: SupportUser;
  tickets: SupportTicket[];
  onBack: () => void;
  onViewTicket: (ticket: SupportTicket) => void;
  onEdit: () => void;
  onStartConversation: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  tickets,
  onBack,
  onViewTicket,
  onEdit,
  onStartConversation,
}) => {
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

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400";
      case 'in-progress':
        return "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400";
      case 'resolved':
        return "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400";
      case 'closed':
        return "bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'urgent':
        return "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400";
      case 'high':
        return "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400";
      case 'medium':
        return "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400";
      case 'low':
        return "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400";
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
          <span>Back to users</span>
        </Button>
      </div>
      
      <Card className="p-6 border border-border/40">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-20 w-20 mb-3">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-lg">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={onEdit}
                >
                  <User size={14} />
                  <span>Edit</span>
                </Button>
                
                <Button 
                  size="sm" 
                  className="gap-1"
                  onClick={onStartConversation}
                >
                  <MessageSquare size={14} />
                  <span>Message</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Contact Information</h3>
              
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <Mail size={16} className="text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                
                <div className="flex gap-2 items-center">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
                
                <div className="flex gap-2 items-center">
                  <Clock size={16} className="text-muted-foreground" />
                  <span>Last active: {user.lastActive ? formatDate(user.lastActive) : 'Never'}</span>
                </div>
                
                {user.phone && (
                  <div className="flex gap-2 items-center">
                    <Phone size={16} className="text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
                
                {user.company && (
                  <div className="flex gap-2 items-center">
                    <Building size={16} className="text-muted-foreground" />
                    <span>{user.company}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-medium">System Information</h3>
              
              <div className="space-y-2">
                {user.browser && (
                  <div className="flex gap-2 items-center">
                    <Monitor size={16} className="text-muted-foreground" />
                    <span>Browser: {user.browser}</span>
                  </div>
                )}
                
                {user.os && (
                  <div className="flex gap-2 items-center">
                    <Server size={16} className="text-muted-foreground" />
                    <span>OS: {user.os}</span>
                  </div>
                )}
                
                {user.location && (
                  <div className="flex gap-2 items-center">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span>Location: {user.location}</span>
                  </div>
                )}
                
                {user.ip && (
                  <div className="flex gap-2 items-center">
                    <Globe size={16} className="text-muted-foreground" />
                    <span>IP: {user.ip}</span>
                  </div>
                )}
                
                {user.currentUrl && (
                  <div className="flex gap-2 items-center">
                    <Link size={16} className="text-muted-foreground" />
                    <span>Current page: <a href={user.currentUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{user.currentUrl.substring(0, 30)}...</a></span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-lg font-medium mb-4">Ticket History</h3>
            
            {tickets.length > 0 ? (
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="p-4 border rounded-md hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => onViewTicket(ticket)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{ticket.subject}</h4>
                      <div className="flex gap-1">
                        <Badge variant="outline" className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                      {ticket.description}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      Created: {formatDate(ticket.createdAt)} • Last updated: {formatDate(ticket.updatedAt)}
                      {ticket.department && ` • Department: ${ticket.department}`}
                    </div>
                    
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="ghost" className="h-8 gap-1">
                        <ExternalLink size={14} />
                        <span>View</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-md">
                <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/50 mb-2" />
                <h4 className="font-medium">No tickets found</h4>
                <p className="text-sm text-muted-foreground">
                  This user hasn't created any support tickets yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
