
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Settings,
  UserCog,
  Users,
  CreditCard,
  Bell,
  PlugZap,
  Palette,
  Globe,
  Lock,
  Bot,
  Sparkles,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useRoleBasedSettings from "@/hooks/use-role-based-settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getOpenAIApiKey } from "@/services/ai/contentGenerationAI";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { userRole, availableSettings } = useRoleBasedSettings();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("account");
  const hasOpenAiKey = !!getOpenAIApiKey();
  
  const isAdmin = userRole === "admin" || userRole === "super_admin";

  const openAITabDescription = isAdmin
    ? "Configure organization-wide AI settings including API keys and model preferences"
    : "View AI capabilities available to your account";

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs 
          defaultValue={activeTab} 
          className="space-y-4"
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="ai">AI Settings</TabsTrigger>
            {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholders/user-01.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">{userRole === "super_admin" ? "Super Admin" : userRole === "admin" ? "Administrator" : "John Doe"}</h3>
                    <p className="text-sm text-muted-foreground">{userRole === "super_admin" || userRole === "admin" ? "admin@digihub.com" : "user@example.com"}</p>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">Change Password</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Notification settings will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-1 md:col-span-3">
                <CardHeader>
                  <CardTitle>Available Integrations</CardTitle>
                  <CardDescription>Connect with external services and platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleNavigate("/settings/integrations")}>
                    Manage Integrations
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      AI Configuration
                    </div>
                  </CardTitle>
                  <CardDescription>{openAITabDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                        <span>OpenAI Integration</span>
                      </div>
                      <div>
                        {hasOpenAiKey ? (
                          <span className="text-sm bg-green-100 text-green-800 rounded-full px-2 py-0.5 dark:bg-green-900/30 dark:text-green-400">
                            Configured
                          </span>
                        ) : (
                          <span className="text-sm bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 dark:bg-amber-900/30 dark:text-amber-400">
                            Not Configured
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleNavigate("/settings/ai-configuration")}
                      className={isAdmin ? "bg-purple-600 hover:bg-purple-700" : ""}
                    >
                      {isAdmin ? "Configure AI Settings" : "View AI Settings"}
                    </Button>
                    
                    {!hasOpenAiKey && isAdmin && (
                      <p className="text-sm text-amber-600 mt-2">
                        <span className="font-medium">Important:</span> You need to configure your OpenAI API key to use AI features.
                      </p>
                    )}
                    
                    {!isAdmin && !hasOpenAiKey && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Contact your administrator to enable AI features.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {isAdmin && (
            <TabsContent value="admin" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Administrator Settings</CardTitle>
                  <CardDescription>Manage organization-wide settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link to="/settings/teams" className="block">
                      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Users className="h-5 w-5 mr-2" />
                            Teams
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Manage team members and permissions
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                    
                    <Link to="/settings/ai-configuration" className="block">
                      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                            AI Configuration
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Set up AI models and API keys
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                    
                    <Link to="/settings/integrations" className="block">
                      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <PlugZap className="h-5 w-5 mr-2" />
                            Integrations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Connect external services and APIs
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
