
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Globe, Shield, Users, Mail, CreditCard, Settings, Languages, Smartphone, Code, Database, FileText } from "lucide-react";

const GeneralTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState("company");

  return (
    <Card className="border border-border/40">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">General Settings</h2>
        
        <Tabs defaultValue="company" className="w-full" onValueChange={setActiveSubTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="company" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Enter company name" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="company-website">Website</Label>
                <Input id="company-website" placeholder="https://example.com" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="company-email">Support Email</Label>
                <Input id="company-email" placeholder="support@example.com" className="mt-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-logo">Logo</Label>
                  <Input id="company-logo" type="file" accept="image/*" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="company-favicon">Favicon</Label>
                  <Input id="company-favicon" type="file" accept="image/*" className="mt-1" />
                </div>
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="multilingual">Multilingual Support</Label>
                  <p className="text-sm text-muted-foreground">Enable support for multiple languages</p>
                </div>
                <Switch id="multilingual" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-registration">Allow User Registration</Label>
                  <p className="text-sm text-muted-foreground">Let visitors create accounts</p>
                </div>
                <Switch id="allow-registration" />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="email-verification">Email Verification</Label>
                  <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                </div>
                <Switch id="email-verification" />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="social-login">Social Login</Label>
                  <p className="text-sm text-muted-foreground">Allow login with social accounts</p>
                </div>
                <Switch id="social-login" />
              </div>
              
              <div>
                <Label htmlFor="default-role">Default User Role</Label>
                <select
                  id="default-role"
                  className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary/20 transition-colors"
                >
                  <option value="customer">Customer</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                </div>
                <Switch id="two-factor" />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Automatically logout inactive users</p>
                </div>
                <Switch id="session-timeout" />
              </div>
              
              <div>
                <Label htmlFor="timeout-minutes">Timeout Duration (minutes)</Label>
                <Input id="timeout-minutes" type="number" min="5" defaultValue="30" className="mt-1" />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="gdpr-compliance">GDPR Compliance</Label>
                  <p className="text-sm text-muted-foreground">Enable GDPR privacy features</p>
                </div>
                <Switch id="gdpr-compliance" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-medium">WhatsApp Integration</h3>
                  <p className="text-sm text-muted-foreground">Connect your WhatsApp Business account</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-medium">Facebook Messenger</h3>
                  <p className="text-sm text-muted-foreground">Connect Facebook Messenger to your chatbot</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-medium">Slack Integration</h3>
                  <p className="text-sm text-muted-foreground">Connect Slack for team notifications</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-medium">Email Service</h3>
                  <p className="text-sm text-muted-foreground">Configure SMTP settings</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put the system in maintenance mode</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable detailed error logging</p>
                </div>
                <Switch id="debug-mode" />
              </div>
              
              <div>
                <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                <Input id="cache-ttl" type="number" min="0" defaultValue="3600" className="mt-1" />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-pwa">Enable PWA</Label>
                  <p className="text-sm text-muted-foreground">Enable Progressive Web App features</p>
                </div>
                <Switch id="enable-pwa" />
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-medium">Export Data</h3>
                  <p className="text-sm text-muted-foreground">Export all system data</p>
                </div>
                <Button variant="outline">Export</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-medium">Import Data</h3>
                  <p className="text-sm text-muted-foreground">Import system data from backup</p>
                </div>
                <Button variant="outline">Import</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default GeneralTab;
