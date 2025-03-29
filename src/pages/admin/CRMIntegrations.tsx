
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database, Users, Calendar, FileText, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CRMIntegrations = () => {
  return (
    <AdminLayout 
      title="CRM Integrations" 
      description="Connect and manage your CRM integrations"
    >
      <Tabs defaultValue="salesforce" className="space-y-4">
        <TabsList>
          <TabsTrigger value="salesforce">Salesforce</TabsTrigger>
          <TabsTrigger value="hubspot">HubSpot</TabsTrigger>
          <TabsTrigger value="zoho">Zoho CRM</TabsTrigger>
          <TabsTrigger value="pipedrive">Pipedrive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="salesforce">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Salesforce Integration</CardTitle>
                <CardDescription>Connect your Salesforce account to sync customer data</CardDescription>
              </div>
              <Badge className="ml-auto" variant="outline">Connected</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-token">API Token</Label>
                <div className="flex gap-2 mt-1">
                  <Input type="password" id="api-token" value="••••••••••••••••••••" readOnly className="flex-1" />
                  <Button variant="outline">Show</Button>
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Contacts</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold">1,245</p>
                  <p className="text-xs text-muted-foreground">Last synced 2 hours ago</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Deals</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold">84</p>
                  <p className="text-xs text-muted-foreground">Last synced 2 hours ago</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Activities</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold">362</p>
                  <p className="text-xs text-muted-foreground">Last synced 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button>Sync Now</Button>
                <Button variant="outline">View Logs</Button>
                <Button variant="destructive">Disconnect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hubspot">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-orange-50 p-3 rounded-lg">
                <Database className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle>HubSpot Integration</CardTitle>
                <CardDescription>Connect your HubSpot account to sync marketing data</CardDescription>
              </div>
              <Badge className="ml-auto" variant="outline">Not Connected</Badge>
            </CardHeader>
            <CardContent>
              <Button>Connect HubSpot</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="zoho">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle>Zoho CRM Integration</CardTitle>
                <CardDescription>Connect your Zoho CRM account</CardDescription>
              </div>
              <Badge className="ml-auto" variant="outline">Not Connected</Badge>
            </CardHeader>
            <CardContent>
              <Button>Connect Zoho CRM</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pipedrive">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle>Pipedrive Integration</CardTitle>
                <CardDescription>Connect your Pipedrive account</CardDescription>
              </div>
              <Badge className="ml-auto" variant="outline">Not Connected</Badge>
            </CardHeader>
            <CardContent>
              <Button>Connect Pipedrive</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default CRMIntegrations;
