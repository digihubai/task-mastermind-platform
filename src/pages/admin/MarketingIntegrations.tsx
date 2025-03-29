
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Mail, MessageSquare, FileBarChart } from "lucide-react";

const MarketingIntegrations = () => {
  return (
    <AdminLayout 
      title="Marketing Integrations" 
      description="Connect and manage your marketing platform integrations"
    >
      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="automation">Marketing Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Mailchimp</CardTitle>
                  <CardDescription>Email marketing platform</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Connected</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline">Configure</Button>
                  <Button variant="destructive">Disconnect</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>SendGrid</CardTitle>
                  <CardDescription>Email sending platform</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect SendGrid</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="social">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Facebook & Instagram</CardTitle>
                  <CardDescription>Meta marketing platforms</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect Meta</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Twitter</CardTitle>
                  <CardDescription>Twitter marketing integration</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect Twitter</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="automation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <FileBarChart className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle>HubSpot Marketing</CardTitle>
                  <CardDescription>Marketing automation platform</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect HubSpot</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <FileBarChart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Marketo</CardTitle>
                  <CardDescription>Marketing automation platform</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect Marketo</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FileBarChart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Google Analytics</CardTitle>
                  <CardDescription>Web analytics platform</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Connected</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline">Configure</Button>
                  <Button variant="destructive">Disconnect</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FileBarChart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Mixpanel</CardTitle>
                  <CardDescription>Product analytics platform</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect Mixpanel</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default MarketingIntegrations;
