
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Clock, 
  MessageSquare, 
  AlertCircle,
  PauseCircle,
  CheckCircle,
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HumanAgent, SupportQueue } from "@/types/omnichannel";

interface QueueManagementProps {
  queues: SupportQueue[];
  agents: HumanAgent[];
}

export const QueueManagement: React.FC<QueueManagementProps> = ({ queues, agents }) => {
  const formatWaitTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 border-red-200";
      case "medium":
        return "text-amber-600 bg-amber-100 border-amber-200";
      case "low":
        return "text-green-600 bg-green-100 border-green-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "text-green-600 bg-green-100 border-green-200" 
      : "text-gray-600 bg-gray-100 border-gray-200";
  };

  const getStatusIcon = (status: string) => {
    return status === "active" ? <CheckCircle className="h-4 w-4 mr-1" /> : <PauseCircle className="h-4 w-4 mr-1" />;
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-600 bg-green-100 border-green-200";
      case "away":
        return "text-amber-600 bg-amber-100 border-amber-200";
      case "offline":
        return "text-gray-600 bg-gray-100 border-gray-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Queue List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Support Queues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Queue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Wait Time</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queues.map((queue) => (
                <TableRow key={queue.id}>
                  <TableCell className="font-medium">
                    <div>
                      {queue.name}
                      <div className="text-xs text-muted-foreground mt-1">
                        {queue.conversations} conversations in queue
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`flex items-center w-fit ${getStatusColor(queue.status)}`}>
                      {getStatusIcon(queue.status)}
                      {queue.status === "active" ? "Active" : "Paused"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {formatWaitTime(queue.waitTime)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`w-fit ${getPriorityColor(queue.priority)}`}>
                      {queue.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Agent List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Support Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Conversations</TableHead>
                <TableHead>Avg. Response</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={agent.avatar} alt={agent.name} />
                        <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`w-fit ${getAgentStatusColor(agent.status)}`}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                      {agent.assignedConversations} / {agent.maxConcurrentChats || "-"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {agent.responseTime ? `${agent.responseTime} min` : "-"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
