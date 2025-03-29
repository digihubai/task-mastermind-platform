
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trello, Github, GitBranch, TimerReset } from "lucide-react";

const ProjectIntegrations = () => {
  return (
    <AdminLayout 
      title="Project Management Integrations" 
      description="Connect and manage your project management tool integrations"
    >
      <Tabs defaultValue="project" className="space-y-4">
        <TabsList>
          <TabsTrigger value="project">Project Management</TabsTrigger>
          <TabsTrigger value="code">Code Repositories</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="project">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Trello className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Jira</CardTitle>
                  <CardDescription>Issue tracking system</CardDescription>
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
                  <Trello className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Trello</CardTitle>
                  <CardDescription>Kanban-style boards</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect Trello</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <Trello className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Asana</CardTitle>
                  <CardDescription>Project management platform</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect Asana</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="code">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Github className="h-6 w-6 text-gray-800" />
                </div>
                <div>
                  <CardTitle>GitHub</CardTitle>
                  <CardDescription>Code hosting platform</CardDescription>
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
                <div className="bg-orange-50 p-3 rounded-lg">
                  <GitBranch className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle>GitLab</CardTitle>
                  <CardDescription>DevOps platform</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect GitLab</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <GitBranch className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Bitbucket</CardTitle>
                  <CardDescription>Git repository management</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect Bitbucket</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="time">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <TimerReset className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Toggl</CardTitle>
                  <CardDescription>Time tracking software</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect Toggl</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <TimerReset className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Harvest</CardTitle>
                  <CardDescription>Time tracking platform</CardDescription>
                </div>
                <Badge className="ml-auto" variant="outline">Not Connected</Badge>
              </CardHeader>
              <CardContent>
                <Button>Connect Harvest</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <TimerReset className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Clockify</CardTitle>
                  <CardDescription>Time tracking tool</CardDescription>
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
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default ProjectIntegrations;
