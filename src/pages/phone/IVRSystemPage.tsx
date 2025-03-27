
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Users, Settings, FileText, PieChart } from "lucide-react";

const IVRSystemPage = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">IVR System</h1>
            <p className="text-muted-foreground">Manage your Interactive Voice Response system</p>
          </div>
          <Button>Configure IVR</Button>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">
              <PieChart className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="calls">
              <Phone className="w-4 h-4 mr-2" />
              Call Logs
            </TabsTrigger>
            <TabsTrigger value="flows">
              <FileText className="w-4 h-4 mr-2" />
              IVR Flows
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Calls Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground mt-1">+12% from yesterday</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1:45</div>
                  <p className="text-xs text-muted-foreground mt-1">-30s from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Call Resolution Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76%</div>
                  <p className="text-xs text-muted-foreground mt-1">+4% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Agent Transfers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground mt-1">24% of total calls</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>IVR Performance</CardTitle>
                <CardDescription>Call handling metrics for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Menu Navigation Success</span>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <Progress value={82} />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Speech Recognition Accuracy</span>
                      <span className="text-sm font-medium">76%</span>
                    </div>
                    <Progress value={76} />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Self-Service Completion</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Caller Satisfaction</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <Progress value={88} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calls" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Call Logs</CardTitle>
                <CardDescription>View and manage recent call activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((call) => (
                    <div 
                      key={call}
                      className="flex items-center justify-between p-3 hover:bg-secondary rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          {call % 3 === 0 ? (
                            <PhoneIncoming className="text-green-500 h-5 w-5" />
                          ) : call % 3 === 1 ? (
                            <PhoneOutgoing className="text-blue-500 h-5 w-5" />
                          ) : (
                            <PhoneMissed className="text-red-500 h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">+1 555-123-456{call}</p>
                          <p className="text-xs text-muted-foreground">
                            {call % 3 === 0 ? "Incoming" : call % 3 === 1 ? "Outgoing" : "Missed"}
                            {" · "}
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs mr-2">{Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="flows" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>IVR Flows</CardTitle>
                    <CardDescription>Configure your call routing and response flows</CardDescription>
                  </div>
                  <Button>Create New Flow</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Main Menu</h3>
                        <p className="text-sm text-muted-foreground">Primary customer greeting and routing</p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Support Queue</h3>
                        <p className="text-sm text-muted-foreground">Technical support routing and wait handling</p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Sales Inquiry</h3>
                        <p className="text-sm text-muted-foreground">New customer and sales call handling</p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>IVR System Settings</CardTitle>
                <CardDescription>Configure your IVR system settings and integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Phone Numbers</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span>+1 (555) 123-4567</span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span>+1 (555) 987-6543</span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">Add Number</Button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Voice Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Text-to-Speech Voice</span>
                      <select className="border rounded p-1">
                        <option>Female (US)</option>
                        <option>Male (US)</option>
                        <option>Female (UK)</option>
                        <option>Male (UK)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Speech Recognition Language</span>
                      <select className="border rounded p-1">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">Edit Hours</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default IVRSystemPage;
