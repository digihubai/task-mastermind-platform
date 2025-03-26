
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Users, 
  Plus, 
  Play, 
  PauseCircle, 
  Download, 
  MoreHorizontal, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight,
  FileText,
  Upload,
  RefreshCw,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCampaigns, useCallActivity, useContactLists, useCallScripts, useTwilioConnection } from "@/services/outboundCallService";
import OutboundCallCampaigns from "@/components/outbound/OutboundCallCampaigns";
import OutboundCallActivity from "@/components/outbound/OutboundCallActivity";
import OutboundContactLists from "@/components/outbound/OutboundContactLists";
import OutboundCallScripts from "@/components/outbound/OutboundCallScripts";
import OutboundCallAnalytics from "@/components/outbound/OutboundCallAnalytics";

const OutboundCalls = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [twilioConnected, setTwilioConnected] = useState(false);
  const { connectTwilio } = useTwilioConnection();
  const { campaigns } = useCampaigns();
  const { activities } = useCallActivity();
  const { contactLists } = useContactLists();
  const { scripts } = useCallScripts();
  
  const handleConnectTwilio = async () => {
    try {
      const connected = await connectTwilio('mock-api-key', 'mock-account-sid');
      if (connected) {
        setTwilioConnected(true);
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Twilio. Please check your credentials and try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Outbound Calls</h1>
            <p className="text-muted-foreground mt-1">
              Manage automated outbound call campaigns
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex gap-2">
              <Download size={16} />
              <span>Export</span>
            </Button>
            
            <Button className="flex gap-2">
              <Plus size={16} />
              <span>New Campaign</span>
            </Button>
          </div>
        </div>
        
        {!twilioConnected ? (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Phone size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Connect Your Phone System</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                To start making outbound calls, connect your Twilio account or other VoIP service.
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <Button onClick={handleConnectTwilio} className="flex gap-2">
                  <Phone size={16} />
                  <span>Connect Twilio</span>
                </Button>
                <Button variant="outline">
                  Connect Other Provider
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="contacts">Contact Lists</TabsTrigger>
                <TabsTrigger value="scripts">Call Scripts</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="campaigns" className="space-y-4 mt-6">
                <OutboundCallCampaigns campaigns={campaigns} />
                <OutboundCallActivity activities={activities} />
              </TabsContent>
              
              <TabsContent value="contacts" className="space-y-4 mt-6">
                <OutboundContactLists contactLists={contactLists} />
              </TabsContent>
              
              <TabsContent value="scripts" className="space-y-4 mt-6">
                <OutboundCallScripts scripts={scripts} />
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4 mt-6">
                <OutboundCallAnalytics />
              </TabsContent>
            </Tabs>
          </>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Industry Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  industry: "Healthcare",
                  templates: [
                    "Appointment Reminders",
                    "Medication Refill Alerts",
                    "Follow-up Consultations"
                  ],
                  icon: <CheckCircle2 size={18} className="text-blue-500" />
                },
                {
                  industry: "Real Estate",
                  templates: [
                    "Property Viewing Confirmation",
                    "New Listing Alerts",
                    "Client Follow-up Call"
                  ],
                  icon: <CheckCircle2 size={18} className="text-green-500" />
                },
                {
                  industry: "Financial Services",
                  templates: [
                    "Investment Opportunity Call",
                    "Account Review Scheduler",
                    "Service Renewal Notice"
                  ],
                  icon: <CheckCircle2 size={18} className="text-amber-500" />
                },
                {
                  industry: "Education",
                  templates: [
                    "Enrollment Follow-up",
                    "Course Registration Reminder",
                    "Alumni Engagement"
                  ],
                  icon: <CheckCircle2 size={18} className="text-indigo-500" />
                },
                {
                  industry: "Retail",
                  templates: [
                    "Order Status Updates",
                    "Special Promotion Call",
                    "Customer Satisfaction Survey"
                  ],
                  icon: <CheckCircle2 size={18} className="text-rose-500" />
                },
                {
                  industry: "Professional Services",
                  templates: [
                    "Consultation Scheduler",
                    "Service Follow-up",
                    "Client Check-in Call"
                  ],
                  icon: <CheckCircle2 size={18} className="text-violet-500" />
                }
              ].map((item, i) => (
                <Card key={i} className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {item.icon}
                      <h3 className="font-medium">{item.industry}</h3>
                    </div>
                    <ul className="space-y-2">
                      {item.templates.map((template, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          {template}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="w-full mt-4 flex gap-1.5">
                      <RefreshCw size={14} />
                      Use Templates
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default OutboundCalls;
