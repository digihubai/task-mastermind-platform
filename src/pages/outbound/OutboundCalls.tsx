
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  PhoneOutgoing,
  Users,
  CalendarClock,
  FileText,
  Settings,
  Play,
  Edit,
  Trash2,
  Copy,
  Plus,
  Check,
  AlertCircle,
  BarChart3,
  Clock,
  RefreshCw,
  ChevronRight,
  Save,
  Upload,
  Download,
  Search,
  Filter,
  UserPlus,
  CheckCircle,
  Phone,
  X,
  Pause
} from 'lucide-react';

const OutboundCalls = () => {
  const { toast } = useToast();
  const [campaignStatus, setCampaignStatus] = useState(true);
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
              Outbound Calls
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your outbound call campaigns and agent scripts
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch 
                id="campaign-active" 
                checked={campaignStatus} 
                onCheckedChange={setCampaignStatus} 
              />
              <Label htmlFor="campaign-active" className="text-sm">
                {campaignStatus ? (
                  <span className="text-green-600 flex items-center">
                    <Check size={16} className="mr-1" /> Active
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <X size={16} className="mr-1" /> Paused
                  </span>
                )}
              </Label>
            </div>
            
            <Button>
              <PhoneOutgoing size={16} className="mr-2" />
              New Campaign
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="scripts">Call Scripts</TabsTrigger>
            <TabsTrigger value="contacts">Contact Lists</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="overflow-hidden">
                <CardHeader className="bg-card p-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">New Customer Welcome</CardTitle>
                    <CampaignBadge status="active" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-medium">Running • 42% complete</p>
                        <div className="w-[100px] h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{width: '42%'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Details</p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
                        <p className="text-xs">Contacts:</p>
                        <p className="text-xs font-medium">245</p>
                        <p className="text-xs">Connected:</p>
                        <p className="text-xs font-medium">103</p>
                        <p className="text-xs">Script:</p>
                        <p className="text-xs font-medium">Welcome Call v2</p>
                        <p className="text-xs">Schedule:</p>
                        <p className="text-xs font-medium">Weekdays 9am-5pm</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Pause size={14} className="mr-1" /> Pause
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-card p-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Renewal Reminder</CardTitle>
                    <CampaignBadge status="scheduled" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-sm font-medium mt-1">Scheduled to start Oct 15, 2023</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Details</p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
                        <p className="text-xs">Contacts:</p>
                        <p className="text-xs font-medium">178</p>
                        <p className="text-xs">Connected:</p>
                        <p className="text-xs font-medium">0</p>
                        <p className="text-xs">Script:</p>
                        <p className="text-xs font-medium">Renewal Reminder v1</p>
                        <p className="text-xs">Schedule:</p>
                        <p className="text-xs font-medium">Weekdays 10am-4pm</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Play size={14} className="mr-1" /> Start Now
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-card p-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Feedback Survey</CardTitle>
                    <CampaignBadge status="completed" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-sm font-medium mt-1">Completed on Oct 2, 2023</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Results</p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
                        <p className="text-xs">Contacts:</p>
                        <p className="text-xs font-medium">312</p>
                        <p className="text-xs">Connected:</p>
                        <p className="text-xs font-medium">287</p>
                        <p className="text-xs">Answered:</p>
                        <p className="text-xs font-medium">201</p>
                        <p className="text-xs">Conversion:</p>
                        <p className="text-xs font-medium">64.4%</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Copy size={14} className="mr-1" /> Clone
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart3 size={14} className="mr-1" /> Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-dashed border-2 hover:border-violet-300 transition-colors cursor-pointer h-full flex items-center justify-center">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full w-12 h-12 bg-violet-100 dark:bg-violet-900/20 text-violet-600 flex items-center justify-center mx-auto mb-4">
                    <PhoneOutgoing size={24} />
                  </div>
                  <h3 className="font-medium text-lg mb-1">New Campaign</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a new outbound call campaign
                  </p>
                  <Button variant="outline" className="mt-2">
                    <Plus size={16} className="mr-2" />
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="scripts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Call Scripts</CardTitle>
                    <Button size="sm">
                      <Plus size={16} className="mr-2" />
                      New Script
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ScriptCard 
                      title="Welcome Call v2"
                      lastUpdated="Oct 8, 2023"
                      usedIn={2}
                      hasVariants={true}
                    />
                    
                    <ScriptCard 
                      title="Renewal Reminder v1"
                      lastUpdated="Sep 25, 2023"
                      usedIn={1}
                      hasVariants={false}
                    />
                    
                    <ScriptCard 
                      title="Customer Satisfaction Survey"
                      lastUpdated="Sep 12, 2023"
                      usedIn={1}
                      hasVariants={true}
                    />
                    
                    <ScriptCard 
                      title="Product Upgrade Offer"
                      lastUpdated="Aug 30, 2023"
                      usedIn={0}
                      hasVariants={false}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Script Preview: Welcome Call v2</CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Introduction</h3>
                    <p className="text-sm mb-4 bg-muted p-3 rounded-md border">
                      "Hello [Customer.FirstName], this is [Agent.Name] from DigiHub AI. I'm calling to welcome you to our service and ensure you're getting the most from your new account. Do you have a moment to chat?"
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Key Benefits</h3>
                    <div className="text-sm mb-4 bg-muted p-3 rounded-md border">
                      <p className="mb-2">
                        "I'd like to highlight some key features that our customers find most valuable:"
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Our AI assistant that helps automate your workflow</li>
                        <li>The analytics dashboard that provides real-time insights</li>
                        <li>24/7 customer support through multiple channels</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Questions & Objections</h3>
                    <div className="text-sm mb-4 bg-muted p-3 rounded-md border">
                      <div className="mb-3">
                        <p className="font-medium">If they ask about pricing:</p>
                        <p>"Your current plan is [Customer.Plan] at [Customer.Price] per month. We also offer [UpgradeOption] with additional features at [UpgradePrice]."</p>
                      </div>
                      <div>
                        <p className="font-medium">If they mention they're busy:</p>
                        <p>"I understand. When would be a better time for me to call back? I'd love to ensure you're getting the full value from your subscription."</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Closing</h3>
                    <p className="text-sm bg-muted p-3 rounded-md border">
                      "Thank you for your time today, [Customer.FirstName]. Remember, you can reach our support team at support@digihubai.com or through the chat feature in your dashboard. Have a great day!"
                    </p>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Download size={14} className="mr-1" /> Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy size={14} className="mr-1" /> Clone
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="contacts">
            <div className="flex mb-4 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search contacts..." 
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Upload size={16} className="mr-2" />
                Import
              </Button>
              <Button>
                <UserPlus size={16} className="mr-2" />
                Add Contact
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-2 px-2">Name</th>
                      <th className="text-left font-medium py-2 px-2">Phone</th>
                      <th className="text-left font-medium py-2 px-2">List</th>
                      <th className="text-left font-medium py-2 px-2">Last Contact</th>
                      <th className="text-left font-medium py-2 px-2">Status</th>
                      <th className="text-left font-medium py-2 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ContactRow 
                      name="John Smith"
                      phone="(555) 123-4567"
                      list="New Customers"
                      lastContact="Oct 10, 2023"
                      status="Contacted"
                    />
                    <ContactRow 
                      name="Sarah Johnson"
                      phone="(555) 234-5678"
                      list="Renewals Q4"
                      lastContact="Never"
                      status="Scheduled"
                    />
                    <ContactRow 
                      name="Michael Brown"
                      phone="(555) 345-6789"
                      list="Feedback Survey"
                      lastContact="Oct 2, 2023"
                      status="Completed"
                    />
                    <ContactRow 
                      name="Emily Davis"
                      phone="(555) 456-7890"
                      list="New Customers"
                      lastContact="Oct 9, 2023"
                      status="No Answer"
                    />
                    <ContactRow 
                      name="David Wilson"
                      phone="(555) 567-8901"
                      list="Feedback Survey"
                      lastContact="Oct 2, 2023"
                      status="Interested"
                    />
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Total Calls" 
                value="972" 
                change="+15.3%" 
                trend="up" 
              />
              <StatCard 
                title="Connected Rate" 
                value="68.4%" 
                change="+2.7%" 
                trend="up" 
              />
              <StatCard 
                title="Avg. Call Duration" 
                value="4:12" 
                change="+0:22" 
                trend="up" 
              />
              <StatCard 
                title="Conversion Rate" 
                value="23.8%" 
                change="+5.2%" 
                trend="up" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 size={48} className="mx-auto mb-2 text-muted-foreground/50" />
                      <p>Campaign performance visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Call Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <div className="text-center text-muted-foreground">
                      <PieChartIcon size={48} className="mx-auto mb-2 text-muted-foreground/50" />
                      <p>Call outcomes distribution chart would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Outbound Call Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">General Settings</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="caller-id">Default Caller ID</Label>
                      <Input id="caller-id" defaultValue="(555) 987-6543" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="calling-hours">Calling Hours</Label>
                      <Select defaultValue="9-5">
                        <SelectTrigger id="calling-hours">
                          <SelectValue placeholder="Select calling hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9-5">9:00 AM - 5:00 PM (Mon-Fri)</SelectItem>
                          <SelectItem value="8-6">8:00 AM - 6:00 PM (Mon-Fri)</SelectItem>
                          <SelectItem value="10-8">10:00 AM - 8:00 PM (Mon-Sat)</SelectItem>
                          <SelectItem value="custom">Custom Schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="max-attempts">Maximum Call Attempts</Label>
                      <Select defaultValue="3">
                        <SelectTrigger id="max-attempts">
                          <SelectValue placeholder="Select maximum attempts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 attempt</SelectItem>
                          <SelectItem value="2">2 attempts</SelectItem>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="4">4 attempts</SelectItem>
                          <SelectItem value="5">5 attempts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="retry-interval">Retry Interval</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="retry-interval">
                          <SelectValue placeholder="Select retry interval" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="2">2 days</SelectItem>
                          <SelectItem value="3">3 days</SelectItem>
                          <SelectItem value="7">1 week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Advanced Settings</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="voicemail-behavior">Voicemail Behavior</Label>
                      <Select defaultValue="leave">
                        <SelectTrigger id="voicemail-behavior">
                          <SelectValue placeholder="Select voicemail behavior" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leave">Leave message</SelectItem>
                          <SelectItem value="hang-up">Hang up</SelectItem>
                          <SelectItem value="custom">Custom per campaign</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="default-voicemail">Default Voicemail Script</Label>
                      <Textarea 
                        id="default-voicemail" 
                        placeholder="Enter your default voicemail script"
                        defaultValue="Hello, this is [Agent.Name] from DigiHub AI. Sorry we missed you. Please call us back at (555) 987-6543 at your convenience. Thank you!"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="call-recording">Call Recording</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="call-recording" defaultChecked />
                        <Label htmlFor="call-recording">Enabled</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="do-not-call-compliance">Do Not Call Compliance</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="do-not-call-compliance" defaultChecked />
                        <Label htmlFor="do-not-call-compliance">Enabled</Label>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Automatically check numbers against national Do Not Call registry
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex items-center justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={() => {
                    toast({
                      title: "Settings saved",
                      description: "Your outbound call settings have been updated",
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

interface ScriptCardProps {
  title: string;
  lastUpdated: string;
  usedIn: number;
  hasVariants: boolean;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ 
  title, 
  lastUpdated, 
  usedIn, 
  hasVariants 
}) => {
  return (
    <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
          <FileText size={18} />
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Used in</p>
          <p className="text-sm">{usedIn} campaign{usedIn !== 1 ? 's' : ''}</p>
        </div>
        {hasVariants && (
          <div className="bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400 px-2 py-1 rounded text-xs">
            Has variants
          </div>
        )}
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>
    </div>
  );
};

interface CampaignBadgeProps {
  status: 'active' | 'paused' | 'scheduled' | 'completed';
}

const CampaignBadge: React.FC<CampaignBadgeProps> = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  let label = '';
  let icon = null;
  
  switch (status) {
    case 'active':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      label = 'Active';
      icon = <Play size={12} className="mr-1" />;
      break;
    case 'paused':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      label = 'Paused';
      icon = <Pause size={12} className="mr-1" />;
      break;
    case 'scheduled':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      label = 'Scheduled';
      icon = <Clock size={12} className="mr-1" />;
      break;
    case 'completed':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      label = 'Completed';
      icon = <CheckCircle size={12} className="mr-1" />;
      break;
  }
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full flex items-center ${bgColor} ${textColor}`}>
      {icon}
      {label}
    </span>
  );
};

interface ContactRowProps {
  name: string;
  phone: string;
  list: string;
  lastContact: string;
  status: 'Contacted' | 'No Answer' | 'Scheduled' | 'Completed' | 'Interested';
}

const ContactRow: React.FC<ContactRowProps> = ({ 
  name, 
  phone, 
  list, 
  lastContact, 
  status 
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'Contacted':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Contacted</span>;
      case 'No Answer':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">No Answer</span>;
      case 'Scheduled':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Scheduled</span>;
      case 'Completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>;
      case 'Interested':
        return <span className="px-2 py-1 bg-violet-100 text-violet-800 text-xs rounded-full">Interested</span>;
    }
  };
  
  return (
    <tr className="border-b hover:bg-muted/30 transition-colors">
      <td className="py-3 px-2">{name}</td>
      <td className="py-3 px-2">{phone}</td>
      <td className="py-3 px-2">{list}</td>
      <td className="py-3 px-2">{lastContact}</td>
      <td className="py-3 px-2">{getStatusBadge()}</td>
      <td className="py-3 px-2">
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Phone size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight size={16} />
          </Button>
        </div>
      </td>
    </tr>
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
          <p className="text-2xl font-semibold">{value}</p>
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

export default OutboundCalls;
