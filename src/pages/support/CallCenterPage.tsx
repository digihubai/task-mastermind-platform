
import React from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PhoneCall, PhoneIncoming, PhoneOutgoing, Plus, Users, Headphones, Clock, CheckCircle, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const CallCenterPage = () => {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Call Center</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Call
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Calls</TabsTrigger>
            <TabsTrigger value="inbound">Inbound</TabsTrigger>
            <TabsTrigger value="outbound">Outbound</TabsTrigger>
            <TabsTrigger value="missed">Missed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Call Stats Cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <PhoneCall className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-2xl font-bold">247</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Inbound Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <PhoneIncoming className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-2xl font-bold">142</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+5% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Outbound Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <PhoneOutgoing className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-2xl font-bold">105</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+18% from last week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Calls */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full">
                  <Input
                    placeholder="Search calls..."
                    className="mb-4 pl-9"
                  />
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>

                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {[
                      {
                        name: "Michael Brown",
                        number: "(555) 123-4567",
                        time: "10:45 AM",
                        duration: "5:32",
                        type: "inbound",
                        status: "completed"
                      },
                      {
                        name: "Sarah Johnson",
                        number: "(555) 987-6543",
                        time: "9:30 AM",
                        duration: "3:15",
                        type: "outbound",
                        status: "completed"
                      },
                      {
                        name: "David Wilson",
                        number: "(555) 456-7890",
                        time: "Yesterday",
                        duration: "1:45",
                        type: "inbound",
                        status: "missed"
                      },
                      {
                        name: "Jennifer Martinez",
                        number: "(555) 789-0123",
                        time: "Yesterday",
                        duration: "7:22",
                        type: "outbound",
                        status: "completed"
                      },
                      {
                        name: "Robert Davis",
                        number: "(555) 234-5678",
                        time: "2 days ago",
                        duration: "2:10",
                        type: "inbound",
                        status: "completed"
                      }
                    ].map((call, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{call.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{call.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              {call.type === "inbound" ? (
                                <PhoneIncoming className="h-3 w-3 mr-1" />
                              ) : (
                                <PhoneOutgoing className="h-3 w-3 mr-1" />
                              )}
                              <span>{call.number}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{call.duration}</span>
                          </div>
                          
                          <div className="flex items-center mt-1">
                            <Badge 
                              variant={call.status === "completed" ? "outline" : "destructive"} 
                              className="text-xs">
                              {call.status === "completed" ? (
                                <div className="flex items-center">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Completed
                                </div>
                              ) : (
                                "Missed"
                              )}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-2">{call.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inbound">
            <Card>
              <CardHeader>
                <CardTitle>Inbound Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Inbound call management will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outbound">
            <Card>
              <CardHeader>
                <CardTitle>Outbound Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Outbound call management will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="missed">
            <Card>
              <CardHeader>
                <CardTitle>Missed Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Missed calls will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CallCenterPage;
