
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIVRMenus, usePhoneNumbers } from "@/services/ivrService";
import { 
  Phone, 
  Plus, 
  Settings, 
  Save, 
  Play,
  ArrowRight, 
  MessageSquare, 
  Mic, 
  Volume2, 
  PhoneForwarded, 
  PhoneOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IVRSystem = () => {
  const { toast } = useToast();
  const { menus, saveMenu, testMenu } = useIVRMenus();
  const { numbers, purchaseNumber, toggleNumberStatus } = usePhoneNumbers();
  
  const [activeTab, setActiveTab] = useState("menus");
  const [selectedMenu, setSelectedMenu] = useState(menus[0].id);
  const [isAddingNumber, setIsAddingNumber] = useState(false);
  const [newNumberForm, setNewNumberForm] = useState({
    country: "US",
    areaCode: "415",
    type: "local"
  });
  
  const handleSaveMenu = () => {
    const menuToSave = menus.find(m => m.id === selectedMenu);
    if (menuToSave) {
      saveMenu(menuToSave);
    }
  };
  
  const handleTestMenu = () => {
    testMenu(selectedMenu);
  };
  
  const handlePurchaseNumber = async () => {
    setIsAddingNumber(true);
    try {
      await purchaseNumber(
        newNumberForm.country, 
        newNumberForm.areaCode, 
        newNumberForm.type as 'local' | 'tollfree' | 'mobile'
      );
      setNewNumberForm({
        country: "US",
        areaCode: "415",
        type: "local"
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "There was an error purchasing the number. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAddingNumber(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">IVR System</h1>
            <p className="text-muted-foreground mt-1">
              Configure your Interactive Voice Response system
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button className="gap-2">
              <Phone className="h-4 w-4" />
              <span>Test Call</span>
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="menus">IVR Menus</TabsTrigger>
            <TabsTrigger value="numbers">Phone Numbers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menus" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-base">Menus</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[calc(100vh-350px)]">
                    <div className="space-y-1 p-2">
                      {menus.map((menu) => (
                        <Button
                          key={menu.id}
                          variant={selectedMenu === menu.id ? "secondary" : "ghost"}
                          className="w-full justify-start text-left"
                          onClick={() => setSelectedMenu(menu.id)}
                        >
                          {menu.name}
                        </Button>
                      ))}
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-left mt-2"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        New Menu
                      </Button>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base">
                    {menus.find(m => m.id === selectedMenu)?.name || "Menu Editor"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleTestMenu}>
                      <Play className="mr-1.5 h-3.5 w-3.5" />
                      Test
                    </Button>
                    <Button size="sm" onClick={handleSaveMenu}>
                      <Save className="mr-1.5 h-3.5 w-3.5" />
                      Save
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="menu-name">Menu Name</Label>
                        <Input 
                          id="menu-name" 
                          defaultValue={menus.find(m => m.id === selectedMenu)?.name}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="greeting">Greeting Message</Label>
                        <Select defaultValue="text-to-speech">
                          <SelectTrigger>
                            <SelectValue placeholder="Message Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text-to-speech">Text-to-Speech</SelectItem>
                            <SelectItem value="recording">Audio Recording</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="greeting-text">Greeting Text</Label>
                      <Textarea 
                        id="greeting-text" 
                        placeholder="Enter the greeting message for callers..."
                        rows={3}
                        defaultValue="Thank you for calling our company. Please select from the following options."
                      />
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-3">Menu Options</h3>
                      
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-1">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                {num}
                              </div>
                            </div>
                            <div className="col-span-3">
                              <Select defaultValue={num === 1 ? "transfer" : num === 2 ? "transfer" : num === 3 ? "submenu" : "voicemail"}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Action" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="transfer">Transfer Call</SelectItem>
                                  <SelectItem value="submenu">Submenu</SelectItem>
                                  <SelectItem value="message">Play Message</SelectItem>
                                  <SelectItem value="voicemail">Voicemail</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-7">
                              {num === 1 && (
                                <Select defaultValue="sales">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Department" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="sales">Sales Department</SelectItem>
                                    <SelectItem value="support">Support Department</SelectItem>
                                    <SelectItem value="billing">Billing Department</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                              {num === 2 && (
                                <Select defaultValue="support">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Department" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="sales">Sales Department</SelectItem>
                                    <SelectItem value="support">Support Department</SelectItem>
                                    <SelectItem value="billing">Billing Department</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                              {num === 3 && (
                                <Select defaultValue="submenu1">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Submenu" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="submenu1">Hours & Location</SelectItem>
                                    <SelectItem value="submenu2">Frequently Asked Questions</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                              {num === 4 && (
                                <Input defaultValue="Leave a message after the tone" />
                              )}
                              {num === 5 && (
                                <Input placeholder="Enter destination or message" />
                              )}
                            </div>
                            <div className="col-span-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full mt-2">
                          <Plus className="mr-1.5 h-4 w-4" />
                          Add Option
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="timeout" />
                        <Label htmlFor="timeout">Timeout Action</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="invalid" />
                        <Label htmlFor="invalid">Invalid Input Action</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Call Flow Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="border rounded-lg p-4 bg-background w-[200px] text-center">
                    <Phone className="mx-auto h-6 w-6 mb-2 text-primary" />
                    <p className="font-medium">Incoming Call</p>
                  </div>
                  
                  <ArrowRight className="h-6 w-6 rotate-90" />
                  
                  <div className="border rounded-lg p-4 bg-background w-[200px] text-center border-primary">
                    <MessageSquare className="mx-auto h-6 w-6 mb-2 text-primary" />
                    <p className="font-medium">Main Menu</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <ArrowRight className="h-6 w-6 rotate-90" />
                      <div className="border rounded-lg p-3 bg-background w-[150px] text-center">
                        <PhoneForwarded className="mx-auto h-5 w-5 mb-1 text-blue-500" />
                        <p className="font-medium text-sm">Sales</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <ArrowRight className="h-6 w-6 rotate-90" />
                      <div className="border rounded-lg p-3 bg-background w-[150px] text-center">
                        <PhoneForwarded className="mx-auto h-5 w-5 mb-1 text-green-500" />
                        <p className="font-medium text-sm">Support</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <ArrowRight className="h-6 w-6 rotate-90" />
                      <div className="border rounded-lg p-3 bg-background w-[150px] text-center">
                        <Volume2 className="mx-auto h-5 w-5 mb-1 text-amber-500" />
                        <p className="font-medium text-sm">Hours & Location</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="numbers" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Phone Numbers</CardTitle>
                <Button onClick={() => setIsAddingNumber(!isAddingNumber)}>
                  <Plus className="mr-1.5 h-4 w-4" />
                  Add Number
                </Button>
              </CardHeader>
              <CardContent>
                {isAddingNumber && (
                  <div className="border rounded-md p-4 mb-6">
                    <h3 className="font-medium mb-3">Purchase New Number</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select 
                          value={newNumberForm.country} 
                          onValueChange={(value) => setNewNumberForm({...newNumberForm, country: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="area-code">Area Code</Label>
                        <Input 
                          id="area-code"
                          value={newNumberForm.areaCode}
                          onChange={(e) => setNewNumberForm({...newNumberForm, areaCode: e.target.value})}
                          placeholder="e.g. 415"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="number-type">Number Type</Label>
                        <Select 
                          value={newNumberForm.type}
                          onValueChange={(value) => setNewNumberForm({...newNumberForm, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="local">Local</SelectItem>
                            <SelectItem value="tollfree">Toll Free</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddingNumber(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handlePurchaseNumber}
                        disabled={isAddingNumber}
                      >
                        {isAddingNumber ? "Purchasing..." : "Purchase Number"}
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {numbers.map((num) => (
                    <div key={num.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${num.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{num.number}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{num.label}</span>
                            <span>•</span>
                            <span>{num.country}</span>
                            <span>•</span>
                            <span className="capitalize">{num.type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`status-${num.id}`}
                            checked={num.active}
                            onCheckedChange={() => toggleNumberStatus(num.id)}
                          />
                          <Label htmlFor={`status-${num.id}`}>
                            {num.active ? 'Active' : 'Inactive'}
                          </Label>
                        </div>
                        
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Number Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {numbers.filter(n => n.active).map((num) => (
                    <div key={`assign-${num.id}`} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md">
                      <div>
                        <p className="font-medium">{num.number}</p>
                        <p className="text-sm text-muted-foreground">{num.label}</p>
                      </div>
                      
                      <div>
                        <Label htmlFor={`menu-${num.id}`} className="text-sm">IVR Menu</Label>
                        <Select defaultValue="main">
                          <SelectTrigger id={`menu-${num.id}`}>
                            <SelectValue placeholder="Select Menu" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="main">Main Menu</SelectItem>
                            <SelectItem value="submenu1">Hours & Location</SelectItem>
                            <SelectItem value="none">No Menu (Direct Transfer)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor={`fallback-${num.id}`} className="text-sm">Fallback Action</Label>
                        <Select defaultValue="voicemail">
                          <SelectTrigger id={`fallback-${num.id}`}>
                            <SelectValue placeholder="Select Fallback" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="voicemail">Voicemail</SelectItem>
                            <SelectItem value="transfer">Transfer to Support</SelectItem>
                            <SelectItem value="message">Play Message</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Voice Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Text-to-Speech Voice</Label>
                      <Select defaultValue="female">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Voice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female (US English)</SelectItem>
                          <SelectItem value="male">Male (US English)</SelectItem>
                          <SelectItem value="female-uk">Female (UK English)</SelectItem>
                          <SelectItem value="male-uk">Male (UK English)</SelectItem>
                          <SelectItem value="female-au">Female (Australian)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Speech Recognition Language</Label>
                      <Select defaultValue="en-US">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="en-AU">English (Australia)</SelectItem>
                          <SelectItem value="es-ES">Spanish</SelectItem>
                          <SelectItem value="fr-FR">French</SelectItem>
                          <SelectItem value="de-DE">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Default Greeting</Label>
                    <Textarea 
                      rows={3}
                      defaultValue="Thank you for calling our company. Please listen carefully to the following options."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Call Recording</Label>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Voice Analytics</Label>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Call Transcription</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Whisper Messages</Label>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Voicemail Transcription</Label>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Auto-Attendant AI</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Hours & Routing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium mb-3">Business Hours</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="border rounded-md p-3">
                          <p className="font-medium text-sm mb-2">{day}</p>
                          {day === "Saturday" || day === "Sunday" ? (
                            <p className="text-xs text-muted-foreground">Closed</p>
                          ) : (
                            <div className="space-y-1 text-xs">
                              <p>9:00 AM - 5:00 PM</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>After Hours Handling</Label>
                    <Select defaultValue="voicemail">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Handling" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="voicemail">Send to Voicemail</SelectItem>
                        <SelectItem value="message">Play Message</SelectItem>
                        <SelectItem value="emergency">Emergency Contact</SelectItem>
                        <SelectItem value="menu">Special After-Hours Menu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Holiday Schedule</Label>
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-1.5 h-4 w-4" />
                      Add Holiday Schedule
                    </Button>
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
