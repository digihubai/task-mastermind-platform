
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OmnichannelInbox from "@/components/communication/OmnichannelInbox";
import SupportStats from "@/components/support/SupportStats";
import { Button } from "@/components/ui/button";
import { PlusCircle, TicketIcon, MessageSquare, Phone, Users } from "lucide-react";

const SupportDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <AppLayout showModuleName moduleName="Support Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Support Dashboard</h1>
          <div className="flex gap-3">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Team Members
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        </div>

        <SupportStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">
              <TicketIcon className="h-4 w-4 mr-2" />
              Tickets
            </TabsTrigger>
            <TabsTrigger value="inbox">
              <MessageSquare className="h-4 w-4 mr-2" />
              Inbox
            </TabsTrigger>
            <TabsTrigger value="calls">
              <Phone className="h-4 w-4 mr-2" />
              Calls
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    No recent tickets found. Create a new ticket to get started.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Team performance metrics will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for TicketList component */}
                <p className="text-muted-foreground">
                  Support tickets will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inbox" className="space-y-4 h-[calc(100vh-22rem)]">
            <OmnichannelInbox />
          </TabsContent>
          
          <TabsContent value="calls" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Call Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  View all call center activity here.
                </p>
                <div className="mt-4">
                  <Button variant="outline" onClick={() => window.location.href = "/support/call-center"}>
                    <Phone className="mr-2 h-4 w-4" />
                    Go to Call Center
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SupportDashboardPage;
