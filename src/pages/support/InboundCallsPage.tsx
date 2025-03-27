
import React from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  PhoneIncoming, Phone, Clock, CheckCircle, 
  AlarmClock, User, Filter, Headphones
} from "lucide-react";

const InboundCallsPage = () => {
  // Sample inbound calls data
  const inboundCalls = [
    {
      id: "1",
      name: "John Smith",
      number: "(555) 123-4567",
      time: "10:30 AM",
      duration: "3:45",
      status: "completed",
      agentName: "Alex Johnson",
      waitTime: "0:32"
    },
    {
      id: "2",
      name: "Sarah Wilson",
      number: "(555) 987-6543",
      time: "11:15 AM",
      duration: "5:12",
      status: "completed",
      agentName: "Emma Davis",
      waitTime: "1:05"
    },
    {
      id: "3",
      name: "Michael Brown",
      number: "(555) 456-7890",
      time: "1:25 PM",
      duration: "2:30",
      status: "missed",
      agentName: null,
      waitTime: "2:10"
    },
    {
      id: "4",
      name: "Jessica Taylor",
      number: "(555) 234-5678",
      time: "2:40 PM",
      duration: "4:20",
      status: "completed",
      agentName: "Ryan Miller",
      waitTime: "0:45"
    },
    {
      id: "5",
      name: "David Garcia",
      number: "(555) 876-5432",
      time: "3:15 PM",
      duration: "1:50",
      status: "completed",
      agentName: "Alex Johnson",
      waitTime: "0:15"
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold">Inbound Calls</h1>
            <p className="text-muted-foreground">Manage and track all incoming calls</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Phone className="mr-2 h-4 w-4" />
              Handle Call
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Inbound Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PhoneIncoming className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">42</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+15% from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlarmClock className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-2xl font-bold">1m 12s</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">-30s from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Headphones className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">8</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">2 agents on break</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inbound Call History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full mb-4">
              <Input
                placeholder="Search calls..."
                className="pl-9"
              />
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {inboundCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{call.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{call.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <PhoneIncoming className="h-3 w-3 mr-1" />
                          <span>{call.number}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center mx-4">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-sm">Duration: {call.duration}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <AlarmClock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-sm">Wait: {call.waitTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant={call.status === "completed" ? "outline" : "destructive"} 
                        className="text-xs mb-1"
                      >
                        {call.status === "completed" ? (
                          <div className="flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </div>
                        ) : (
                          "Missed"
                        )}
                      </Badge>
                      
                      {call.agentName ? (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          {call.agentName}
                        </div>
                      ) : (
                        <span className="text-xs text-destructive">No agent</span>
                      )}
                      
                      <span className="text-xs text-muted-foreground mt-1">{call.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default InboundCallsPage;
