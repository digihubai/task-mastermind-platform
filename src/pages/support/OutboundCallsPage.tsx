
import React from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  PhoneOutgoing, Phone, Clock, CheckCircle, User, Plus, 
  Search, BarChart2, PhoneX, PhoneCheck
} from "lucide-react";

const OutboundCallsPage = () => {
  // Sample outbound calls data
  const outboundCalls = [
    {
      id: "1",
      name: "Robert Miller",
      number: "(555) 567-8901",
      time: "9:30 AM",
      duration: "4:15",
      status: "completed",
      agentName: "Emma Davis",
      result: "Demo scheduled"
    },
    {
      id: "2",
      name: "Jennifer Adams",
      number: "(555) 432-1098",
      time: "10:45 AM",
      duration: "2:30",
      status: "completed",
      agentName: "Ryan Wilson",
      result: "Call back later"
    },
    {
      id: "3",
      name: "Thomas Lee",
      number: "(555) 345-6789",
      time: "11:20 AM",
      duration: "0:15",
      status: "no-answer",
      agentName: "Alex Johnson",
      result: "No answer"
    },
    {
      id: "4",
      name: "Lisa Wang",
      number: "(555) 789-0123",
      time: "1:15 PM",
      duration: "5:45",
      status: "completed",
      agentName: "Emma Davis",
      result: "Meeting scheduled"
    },
    {
      id: "5",
      name: "Kevin Martinez",
      number: "(555) 234-5678",
      time: "2:30 PM",
      duration: "3:20",
      status: "completed",
      agentName: "Ryan Wilson",
      result: "Interested in upgrade"
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold">Outbound Calls</h1>
            <p className="text-muted-foreground">Manage outgoing calls and campaigns</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Search Contacts
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Call
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Outbound</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PhoneOutgoing className="h-5 w-5 text-indigo-500 mr-2" />
                <span className="text-2xl font-bold">35</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+8% from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Successful Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PhoneCheck className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">28</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">80% success rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">No Answer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PhoneX className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-2xl font-bold">7</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">20% missed rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Call Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">3m 12s</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+45s from average</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Outbound Call History</CardTitle>
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
                {outboundCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{call.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{call.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <PhoneOutgoing className="h-3 w-3 mr-1" />
                          <span>{call.number}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mx-4">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-sm">{call.duration}</span>
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
                          "No Answer"
                        )}
                      </Badge>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {call.agentName}
                      </div>
                      
                      <span className="text-sm mt-1">{call.result}</span>
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

export default OutboundCallsPage;
