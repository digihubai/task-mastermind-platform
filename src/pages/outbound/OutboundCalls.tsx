
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OutboundCallAnalytics from "@/components/outbound/OutboundCallAnalytics";
import OutboundCallCampaigns from "@/components/outbound/OutboundCallCampaigns";
import OutboundCallScripts from "@/components/outbound/OutboundCallScripts";
import OutboundContactLists from "@/components/outbound/OutboundContactLists";
import { useCallCampaigns, useCallStats, useCallScripts, useContactLists } from "@/services/outboundCallService";
import { Button } from "@/components/ui/button";
import { PlusCircle, Phone } from "lucide-react";

const OutboundCalls = () => {
  const { data: campaigns, isLoading: campaignsLoading } = useCallCampaigns();
  const { data: stats, isLoading: statsLoading } = useCallStats();
  const { data: scripts, isLoading: scriptsLoading } = useCallScripts();
  const { data: contactLists, isLoading: contactsLoading } = useContactLists();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Outbound Calls</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track outbound call campaigns
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Phone size={16} />
              New Call
            </Button>
            <Button className="flex items-center gap-2">
              <PlusCircle size={16} />
              New Campaign
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="scripts">Call Scripts</TabsTrigger>
            <TabsTrigger value="contacts">Contact Lists</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-4">
            <OutboundCallAnalytics stats={stats} isLoading={statsLoading} />
          </TabsContent>
          
          <TabsContent value="campaigns">
            <OutboundCallCampaigns campaigns={campaigns || []} isLoading={campaignsLoading} />
          </TabsContent>
          
          <TabsContent value="scripts">
            <OutboundCallScripts scripts={scripts || []} />
          </TabsContent>
          
          <TabsContent value="contacts">
            <OutboundContactLists contactLists={contactLists || []} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default OutboundCalls;
