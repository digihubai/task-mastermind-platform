
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Phone,
  PhoneCall,
  UserPlus,
  X,
  Plus,
  Check,
  Save,
  Settings,
  Headphones,
  MessageSquare,
  PlusCircle,
  ArrowRight,
  FileText,
  Users,
  RefreshCw,
  BarChart3,
  Clock,
  Volume2,
  VolumeX,
  Play,
  Square,
  Edit
} from 'lucide-react';

const IVRSystem = () => {
  const { toast } = useToast();
  const [activeIVR, setActiveIVR] = useState(true);
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
              IVR System
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your Interactive Voice Response system and call flows
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch 
                id="ivr-active" 
                checked={activeIVR} 
                onCheckedChange={setActiveIVR} 
              />
              <Label htmlFor="ivr-active" className="text-sm">
                {activeIVR ? (
                  <span className="text-green-600 flex items-center">
                    <Check size={16} className="mr-1" /> Active
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <X size={16} className="mr-1" /> Inactive
                  </span>
                )}
              </Label>
            </div>
            
            <Button>
              <PlusCircle size={16} className="mr-2" />
              Create Flow
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="flows" className="space-y-6">
          <TabsList>
            <TabsTrigger value="flows">Call Flows</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="numbers">Phone Numbers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flows">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="overflow-hidden">
                <CardHeader className="bg-card p-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Main Menu</CardTitle>
                    <Badge status="active" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Last updated</p>
                      <p className="text-sm font-medium">Oct 10, 2023 • 10:45 AM</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Menu Options</p>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>1 - Sales Department</li>
                        <li>2 - Support</li>
                        <li>3 - Billing</li>
                        <li>4 - Speak to Agent</li>
                      </ul>
                    </div>
                    
                    <div className="pt-2 flex justify-between">
                      <Button variant="outline" size="sm">
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play size={14} className="mr-1" /> Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-card p-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Support Queue</CardTitle>
                    <Badge status="active" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Last updated</p>
                      <p className="text-sm font-medium">Oct 8, 2023 • 3:20 PM</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Features</p>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>Estimated wait time</li>
                        <li>Position in queue</li>
                        <li>Callback option</li>
                        <li>Music on hold</li>
                      </ul>
                    </div>
                    
                    <div className="pt-2 flex justify-between">
                      <Button variant="outline" size="sm">
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play size={14} className="mr-1" /> Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-card p-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">After Hours</CardTitle>
                    <Badge status="scheduled" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Schedule</p>
                      <p className="text-sm font-medium">Weekdays 6PM - 9AM, Weekends</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Actions</p>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>Office hours announcement</li>
                        <li>Voicemail option</li>
                        <li>Email notification</li>
                        <li>Emergency contact option</li>
                      </ul>
                    </div>
                    
                    <div className="pt-2 flex justify-between">
                      <Button variant="outline" size="sm">
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play size={14} className="mr-1" /> Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-dashed border-2 hover:border-violet-300 transition-colors cursor-pointer h-full flex items-center justify-center">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full w-12 h-12 bg-violet-100 dark:bg-violet-900/20 text-violet-600 flex items-center justify-center mx-auto mb-4">
                    <PlusCircle size={24} />
                  </div>
                  <h3 className="font-medium text-lg mb-1">Create New Flow</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Design a custom call flow for your business needs
                  </p>
                  <Button variant="outline" className="mt-2">
                    <Plus size={16} className="mr-2" />
                    Create Flow
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TemplateCard 
                title="Basic Customer Service"
                description="Simple IVR with options for support, sales, and billing departments."
                steps={4}
                icon={<Headphones size={20} />}
              />
              
              <TemplateCard 
                title="Multi-level Directory"
                description="Complex IVR with nested menus for large organizations with many departments."
                steps={8}
                icon={<Users size={20} />}
              />
              
              <TemplateCard 
                title="Support Ticket Lookup"
                description="Allow callers to enter ticket numbers and get status updates via the phone system."
                steps={6}
                icon={<FileText size={20} />}
              />
              
              <TemplateCard 
                title="Appointment Scheduling"
                description="Let callers schedule, confirm, or cancel appointments through the IVR system."
                steps={7}
                icon={<Clock size={20} />}
              />
              
              <TemplateCard 
                title="Automated Survey"
                description="Collect customer feedback with an automated survey after calls or interactions."
                steps={5}
                icon={<MessageSquare size={20} />}
              />
              
              <TemplateCard 
                title="Payment Processing"
                description="Secure system for taking payments over the phone with PCI compliance."
                steps={9}
                icon={<RefreshCw size={20} />}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="numbers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Phone Numbers</CardTitle>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Number
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-2 px-2">Phone Number</th>
                      <th className="text-left font-medium py-2 px-2">Assigned Flow</th>
                      <th className="text-left font-medium py-2 px-2">Type</th>
                      <th className="text-left font-medium py-2 px-2">Status</th>
                      <th className="text-left font-medium py-2 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2">(555) 123-4567</td>
                      <td className="py-3 px-2">Main Menu</td>
                      <td className="py-3 px-2">Main Line</td>
                      <td className="py-3 px-2"><Badge status="active" /></td>
                      <td className="py-3 px-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">(555) 234-5678</td>
                      <td className="py-3 px-2">Support Queue</td>
                      <td className="py-3 px-2">Support</td>
                      <td className="py-3 px-2"><Badge status="active" /></td>
                      <td className="py-3 px-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">(555) 345-6789</td>
                      <td className="py-3 px-2">After Hours</td>
                      <td className="py-3 px-2">Fallback</td>
                      <td className="py-3 px-2"><Badge status="scheduled" /></td>
                      <td className="py-3 px-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatCard 
                title="Total Calls" 
                value="1,247" 
                change="+12.5%" 
                trend="up" 
              />
              <StatCard 
                title="Avg. Wait Time" 
                value="1:32" 
                change="-8.3%" 
                trend="down" 
              />
              <StatCard 
                title="Abandonment Rate" 
                value="4.2%" 
                change="-2.1%" 
                trend="down" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Call Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 size={48} className="mx-auto mb-2 text-muted-foreground/50" />
                      <p>Call distribution visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Menu Option Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <div className="text-center text-muted-foreground">
                      <PieChartIcon size={48} className="mx-auto mb-2 text-muted-foreground/50" />
                      <p>Menu option usage chart would appear here</p>
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
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">General Settings</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="business-hours">Business Hours</Label>
                      <Select defaultValue="9-5">
                        <SelectTrigger id="business-hours">
                          <SelectValue placeholder="Select business hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9-5">9:00 AM - 5:00 PM (Mon-Fri)</SelectItem>
                          <SelectItem value="8-6">8:00 AM - 6:00 PM (Mon-Fri)</SelectItem>
                          <SelectItem value="24-7">24/7 Operation</SelectItem>
                          <SelectItem value="custom">Custom Schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern Time (ET)</SelectItem>
                          <SelectItem value="cst">Central Time (CT)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="default-greeting">Default Greeting</Label>
                      <Input id="default-greeting" defaultValue="Welcome to DigiHub AI. Please listen to the following options." />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-type">Voice Type</Label>
                        <Button variant="ghost" size="sm" className="h-6">
                          <Volume2 size={14} className="mr-1" /> Preview
                        </Button>
                      </div>
                      <Select defaultValue="female-1">
                        <SelectTrigger id="voice-type">
                          <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female-1">Female Voice 1</SelectItem>
                          <SelectItem value="female-2">Female Voice 2</SelectItem>
                          <SelectItem value="male-1">Male Voice 1</SelectItem>
                          <SelectItem value="male-2">Male Voice 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Advanced Settings</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="max-hold-time">Maximum Hold Time</Label>
                      </div>
                      <Select defaultValue="10">
                        <SelectTrigger id="max-hold-time">
                          <SelectValue placeholder="Select maximum hold time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="20">20 minutes</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="queue-callback">Queue Callback Option</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="queue-callback" defaultChecked />
                        <Label htmlFor="queue-callback">Enabled</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="voicemail">Voicemail</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="voicemail" defaultChecked />
                        <Label htmlFor="voicemail">Enabled</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="call-recording">Call Recording</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="call-recording" defaultChecked />
                        <Label htmlFor="call-recording">Enabled</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ivr-timeout">IVR Timeout (seconds)</Label>
                      <Input id="ivr-timeout" type="number" defaultValue="10" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex items-center justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={() => {
                    toast({
                      title: "Settings saved",
                      description: "Your IVR system settings have been updated",
                    })
                  }}>
                    <Save size={16} className="mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

interface BadgeProps {
  status: 'active' | 'inactive' | 'scheduled';
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  let label = '';
  
  switch (status) {
    case 'active':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      label = 'Active';
      break;
    case 'inactive':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      label = 'Inactive';
      break;
    case 'scheduled':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      label = 'Scheduled';
      break;
  }
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${bgColor} ${textColor}`}>
      {status === 'active' && <Check size={12} className="inline mr-1" />}
      {status === 'inactive' && <X size={12} className="inline mr-1" />}
      {status === 'scheduled' && <Clock size={12} className="inline mr-1" />}
      {label}
    </span>
  );
};

interface TemplateCardProps {
  title: string;
  description: string;
  steps: number;
  icon: React.ReactNode;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  title, 
  description, 
  steps, 
  icon 
}) => {
  return (
    <Card className="overflow-hidden hover:border-violet-300 transition-all">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
            {icon}
          </div>
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-muted-foreground">{steps} steps</span>
          <Button variant="outline" size="sm">
            <ArrowRight size={14} className="mr-1" /> Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-1">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-semibold">{value}</p>
          <span className={`text-xs px-2 py-1 rounded-full flex items-center ${
            trend === 'up' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
          }`}>
            {trend === 'up' 
              ? <ArrowUp size={12} className="mr-1" /> 
              : <ArrowDown size={12} className="mr-1" />}
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const PieChartIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
  </svg>
);

export default IVRSystem;
