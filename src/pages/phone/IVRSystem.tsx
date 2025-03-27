
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PhoneCall, 
  PlusCircle, 
  BarChart2, 
  FileText, 
  MessageSquare, 
  Settings, 
  Phone,
  PhoneForwarded,
  Clock,
  UserX,
  CheckCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useIVRFlows, useIVRMetrics, useIVRPhoneNumbers, type IVRFlow } from "@/services/ivrService";

const IVRSystem = () => {
  const { data: flows, isLoading: flowsLoading } = useIVRFlows();
  const { data: metrics } = useIVRMetrics();
  const { data: phoneNumbers } = useIVRPhoneNumbers();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">IVR System</h1>
            <p className="text-muted-foreground mt-1">
              Manage interactive voice response flows
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Phone size={16} />
              <span>Manage Numbers</span>
            </Button>
            
            <Button
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              <span>New Flow</span>
            </Button>
          </div>
        </div>
        
        {/* IVR Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Total Calls</p>
                  <p className="text-3xl font-semibold mt-1">{metrics.totalCalls.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-3xl font-semibold mt-1">{metrics.avgCallDuration}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Transfer Rate</p>
                  <p className="text-3xl font-semibold mt-1">{metrics.transferRate}%</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Abandon Rate</p>
                  <p className="text-3xl font-semibold mt-1">{metrics.abandonRate}%</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Menu Completion</p>
                  <p className="text-3xl font-semibold mt-1">{metrics.menuCompletionRate}%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <Tabs defaultValue="flows" className="space-y-4">
          <TabsList>
            <TabsTrigger value="flows">IVR Flows</TabsTrigger>
            <TabsTrigger value="numbers">Phone Numbers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flows" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flowsLoading ? (
                <p>Loading IVR flows...</p>
              ) : (
                <>
                  {flows?.map((flow: IVRFlow) => (
                    <Card key={flow.id} className="border border-border/40">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{flow.name}</CardTitle>
                          <Badge variant={flow.status === 'active' ? 'default' : 'secondary'}>
                            {flow.status.charAt(0).toUpperCase() + flow.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{flow.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-xs text-muted-foreground">
                            <p>Last updated: {new Date(flow.updatedAt).toLocaleDateString()}</p>
                            <p>{flow.nodes.length} nodes</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                            <Button variant="outline" size="sm" className="flex-1">Duplicate</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Card className="border border-dashed flex items-center justify-center min-h-[200px] cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="text-center p-6">
                      <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                        <PlusCircle size={24} className="text-primary" />
                      </div>
                      <h3 className="font-medium">Create New Flow</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Design a new IVR call flow
                      </p>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="numbers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Phone Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {phoneNumbers?.map((number) => (
                    <div key={number.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-primary" />
                          <h3 className="font-medium">{number.phoneNumber}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{number.friendlyName}</p>
                      </div>
                      
                      <div className="text-sm">
                        <p>Flow: <span className="font-medium">{number.flowName}</span></p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={number.active ? 'default' : 'secondary'}>
                            {number.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                  
                  <Button className="w-full" variant="outline">
                    <PlusCircle size={16} className="mr-2" />
                    Add New Number
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Call Volume by Hour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChart2 size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Chart visualization would be shown here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <PhoneForwarded size={16} className="text-blue-500 mr-2" />
                          <span>Transfer Rate</span>
                        </div>
                        <span className="font-medium">{metrics?.transferRate}%</span>
                      </div>
                      <Progress value={metrics?.transferRate || 0} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <Clock size={16} className="text-amber-500 mr-2" />
                          <span>Average Wait Time</span>
                        </div>
                        <span className="font-medium">32s</span>
                      </div>
                      <Progress value={32} max={120} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <UserX size={16} className="text-red-500 mr-2" />
                          <span>Abandon Rate</span>
                        </div>
                        <span className="font-medium">{metrics?.abandonRate}%</span>
                      </div>
                      <Progress value={metrics?.abandonRate || 0} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          <span>Menu Completion</span>
                        </div>
                        <span className="font-medium">{metrics?.menuCompletionRate}%</span>
                      </div>
                      <Progress value={metrics?.menuCompletionRate || 0} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>IVR System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Default Greeting</h3>
                      <p className="text-sm text-muted-foreground">Set the default greeting for new flows</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Text-to-Speech Voice</h3>
                      <p className="text-sm text-muted-foreground">Configure the voice used for text-to-speech</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Hours of Operation</h3>
                      <p className="text-sm text-muted-foreground">Set business hours for call routing</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Call Recording</h3>
                      <p className="text-sm text-muted-foreground">Configure call recording settings</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default IVRSystem;
