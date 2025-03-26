
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Phone, CheckCircle, MapPin, Filter, ArrowUpDown, Download, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const TwilioNumbersPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("available");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for purchased numbers
  const purchasedNumbers = [
    { 
      id: "1", 
      number: "+1 (555) 123-4567", 
      country: "United States", 
      state: "California", 
      type: "Local", 
      capabilities: ["voice", "sms", "mms"],
      assignedTo: "Sales Team",
      monthlyPrice: "$1.00"
    },
    { 
      id: "2", 
      number: "+1 (555) 987-6543", 
      country: "United States", 
      state: "New York", 
      type: "Toll-Free", 
      capabilities: ["voice", "sms"],
      assignedTo: "Support",
      monthlyPrice: "$2.00"
    },
    { 
      id: "3", 
      number: "+44 20 1234 5678", 
      country: "United Kingdom", 
      state: "London", 
      type: "Local", 
      capabilities: ["voice"],
      assignedTo: "UK Sales",
      monthlyPrice: "£1.00"
    }
  ];
  
  // Mock data for available numbers
  const availableNumbers = [
    { 
      id: "a1", 
      number: "+1 (555) 111-2222", 
      country: "United States", 
      state: "Texas", 
      type: "Local", 
      capabilities: ["voice", "sms", "mms"],
      monthlyPrice: "$1.00"
    },
    { 
      id: "a2", 
      number: "+1 (555) 333-4444", 
      country: "United States", 
      state: "Florida", 
      type: "Local", 
      capabilities: ["voice", "sms"],
      monthlyPrice: "$1.00"
    },
    { 
      id: "a3", 
      number: "+1 (855) 555-6666", 
      country: "United States", 
      state: "Nevada", 
      type: "Toll-Free", 
      capabilities: ["voice", "sms", "mms"],
      monthlyPrice: "$2.00"
    },
    { 
      id: "a4", 
      number: "+1 (555) 777-8888", 
      country: "United States", 
      state: "Georgia", 
      type: "Local", 
      capabilities: ["voice", "sms"],
      monthlyPrice: "$1.00"
    }
  ];
  
  const handleSearchNumbers = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Search Complete",
        description: "Found 4 available numbers matching your criteria",
      });
    }, 1500);
  };
  
  const handlePurchaseNumber = (numberId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Number Purchased Successfully",
        description: `The number has been added to your account.`,
      });
    }, 1500);
  };
  
  const handleReleaseNumber = (numberId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Number Released",
        description: `The number has been removed from your account.`,
      });
    }, 1500);
  };
  
  const handleAssignNumber = (numberId: string) => {
    toast({
      title: "Number Assignment",
      description: "Please configure this number in the IVR System page",
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Phone Numbers</h1>
            <p className="text-muted-foreground mt-1">
              Purchase and manage your Twilio phone numbers
            </p>
          </div>
          
          <Button onClick={() => setActiveTab("available")}>
            <Plus size={16} className="mr-2" />
            Get New Number
          </Button>
        </div>
        
        <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">Available Numbers</TabsTrigger>
            <TabsTrigger value="purchased">Your Numbers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Search for Available Numbers</CardTitle>
                <CardDescription>
                  Search for phone numbers by country, region, and area code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Region</Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="areaCode">Area Code (Optional)</Label>
                    <Input 
                      id="areaCode" 
                      placeholder="e.g. 415"
                      value={selectedAreaCode}
                      onChange={(e) => setSelectedAreaCode(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      className="w-full" 
                      onClick={handleSearchNumbers}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                          <span>Searching...</span>
                        </div>
                      ) : (
                        <span>Search Numbers</span>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Available Numbers</CardTitle>
                <CardDescription>
                  Select a number to purchase and add to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {availableNumbers.map((number) => (
                      <div key={number.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Phone size={18} className="text-primary" />
                            <span className="font-medium">{number.number}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <MapPin size={14} />
                            <span>{number.state}, {number.country}</span>
                            <Badge variant="outline">{number.type}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {number.capabilities.includes('voice') && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Voice</Badge>
                            )}
                            {number.capabilities.includes('sms') && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">SMS</Badge>
                            )}
                            {number.capabilities.includes('mms') && (
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">MMS</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium">{number.monthlyPrice}</div>
                            <div className="text-xs text-muted-foreground">per month</div>
                          </div>
                          
                          <Button 
                            onClick={() => handlePurchaseNumber(number.id)}
                            disabled={isLoading}
                          >
                            Purchase
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="purchased" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Your Phone Numbers</CardTitle>
                  <CardDescription>
                    Manage and configure the phone numbers in your account
                  </CardDescription>
                </div>
                
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm">
                    <Upload size={16} className="mr-2" />
                    Import
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input 
                      placeholder="Search phone numbers..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Filter size={16} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ArrowUpDown size={16} />
                    </Button>
                  </div>
                </div>
                
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {purchasedNumbers.map((number) => (
                      <div key={number.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Phone size={18} className="text-primary" />
                            <span className="font-medium">{number.number}</span>
                            {number.assignedTo && (
                              <Badge variant="outline" className="ml-2">
                                {number.assignedTo}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <MapPin size={14} />
                            <span>{number.state}, {number.country}</span>
                            <Badge variant="outline">{number.type}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {number.capabilities.includes('voice') && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Voice</Badge>
                            )}
                            {number.capabilities.includes('sms') && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">SMS</Badge>
                            )}
                            {number.capabilities.includes('mms') && (
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">MMS</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="text-right mr-4">
                            <div className="font-medium">{number.monthlyPrice}</div>
                            <div className="text-xs text-muted-foreground">per month</div>
                          </div>
                          
                          <Button 
                            variant="outline"
                            onClick={() => handleAssignNumber(number.id)}
                          >
                            Configure
                          </Button>
                          
                          <Button 
                            variant="destructive"
                            onClick={() => handleReleaseNumber(number.id)}
                            disabled={isLoading}
                          >
                            Release
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default TwilioNumbersPage;
