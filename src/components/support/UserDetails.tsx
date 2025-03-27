
import React from "react";
import { SupportUser, SupportTicket } from "@/types/support";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Building, Clock, Map, Globe } from "lucide-react";

export interface UserDetailsProps {
  user: SupportUser;
  tickets?: SupportTicket[];
  onBack?: () => void;
  onViewTicket?: (ticket: SupportTicket) => void;
  onEdit?: () => void;
  onStartConversation?: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ 
  user, 
  tickets = [],
  onBack,
  onViewTicket,
  onEdit,
  onStartConversation
}) => {
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

  return (
    <div className="space-y-6">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Back to Users
        </Button>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-medium">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge className="mt-2">{user.role || user.type || "User"}</Badge>
              
              {(onEdit || onStartConversation) && (
                <div className="flex gap-2 mt-4">
                  {onEdit && (
                    <Button size="sm" variant="outline" onClick={onEdit}>
                      Edit Profile
                    </Button>
                  )}
                  {onStartConversation && (
                    <Button size="sm" onClick={onStartConversation}>
                      Message
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">ID:</span>
                <span className="ml-2">{user.id}</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="ml-2">{user.email}</span>
              </div>
              
              {user.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="ml-2">{user.phone}</span>
                </div>
              )}
              
              {user.company && (
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Company:</span>
                  <span className="ml-2">{user.company}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span className="ml-2">{formatDate(user.createdAt)}</span>
              </div>
              
              {user.lastActivity && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Last Active:</span>
                  <span className="ml-2">{formatDate(user.lastActivity)}</span>
                </div>
              )}
              
              {user.location && (
                <div className="flex items-center">
                  <Map className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="ml-2">{user.location}</span>
                </div>
              )}
              
              {user.timezone && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Timezone:</span>
                  <span className="ml-2">{user.timezone}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            {tickets && tickets.length > 0 ? (
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewTicket && onViewTicket(ticket)}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">{ticket.subject}</h4>
                      <Badge variant="outline">
                        {ticket.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {ticket.description}
                    </p>
                    <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                      <span>{formatDate(ticket.createdAt)}</span>
                      <Badge variant="secondary">{ticket.priority}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No tickets found for this user.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
