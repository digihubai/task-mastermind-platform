
import React from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OmnichannelInbox from '@/components/communication/OmnichannelInbox';
import SupportStats from '@/components/support/SupportStats';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, CheckCircle, Clock, AlertCircle } from "lucide-react";

const OmnichannelSupportPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-semibold">Support Dashboard</h1>
          
          <SupportStats />
          
          <Tabs defaultValue="inbox" className="w-full">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="inbox" className="flex-1">Omnichannel Inbox</TabsTrigger>
              <TabsTrigger value="tickets" className="flex-1">Support Tickets</TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inbox" className="mt-6">
              <OmnichannelInbox />
            </TabsContent>
            
            <TabsContent value="tickets" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Support tickets functionality will be integrated here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Support analytics will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default OmnichannelSupportPage;
