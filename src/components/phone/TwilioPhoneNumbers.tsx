
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Phone, Check, Loader2, PhoneCall, PhoneForwarded, RefreshCw, AlertCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const TwilioPhoneNumbers: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const [searchCountry, setSearchCountry] = useState("US");
  const [searchType, setSearchType] = useState("local");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  
  // Mock data for owned phone numbers
  const [ownedNumbers, setOwnedNumbers] = useState([
    {
      id: "1",
      number: "+1 (555) 123-4567",
      friendlyName: "Main Support Line",
      capabilities: ["voice", "sms", "mms"],
      assignedTo: "Support IVR",
      status: "active",
      purchaseDate: "2023-05-10",
      monthlyPrice: 1.00,
      country: "US"
    },
    {
      id: "2",
      number: "+1 (555) 234-5678",
      friendlyName: "Sales Line",
      capabilities: ["voice", "sms"],
      assignedTo: "Sales IVR",
      status: "active",
      purchaseDate: "2023-06-15",
      monthlyPrice: 1.00,
      country: "US"
    },
    {
      id: "3",
      number: "+1 (555) 345-6789",
      friendlyName: "Outbound Calls",
      capabilities: ["voice"],
      assignedTo: "Outbound Dialer",
      status: "active",
      purchaseDate: "2023-07-20",
      monthlyPrice: 1.00,
      country: "US"
    },
    {
      id: "4",
      number: "+44 20 7123 4567",
      friendlyName: "UK Support",
      capabilities: ["voice", "sms"],
      assignedTo: null,
      status: "inactive",
      purchaseDate: "2023-08-05",
      monthlyPrice: 2.00,
      country: "GB"
    }
  ]);

  // Mock search results
  const mockSearchResults = [
    {
      id: "avail-1",
      number: "+1 (555) 987-6543",
      formattedNumber: "(555) 987-6543",
      region: "San Francisco, CA",
      capabilities: ["voice", "sms", "mms"],
      monthlyPrice: 1.00,
      country: "US"
    },
    {
      id: "avail-2",
      number: "+1 (555) 876-5432",
      formattedNumber: "(555) 876-5432",
      region: "New York, NY",
      capabilities: ["voice", "sms"],
      monthlyPrice: 1.00,
      country: "US"
    },
    {
      id: "avail-3",
      number: "+1 (555) 765-4321",
      formattedNumber: "(555) 765-4321",
      region: "Los Angeles, CA",
      capabilities: ["voice", "sms", "mms"],
      monthlyPrice: 1.00,
      country: "US"
    },
    {
      id: "avail-4",
      number: "+1 (555) 654-3210",
      formattedNumber: "(555) 654-3210",
      region: "Chicago, IL",
      capabilities: ["voice", "sms"],
      monthlyPrice: 1.00,
      country: "US"
    }
  ];

  const handleSearchNumbers = () => {
    setSearchLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setSearchLoading(false);
    }, 1000);
  };

  const handlePurchaseNumber = (numberId: string) => {
    // Set loading state for this specific number
    setPurchaseLoading(numberId);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Find the number from search results
      const numberToPurchase = searchResults.find(num => num.id === numberId);
      
      if (numberToPurchase) {
        // Add to owned numbers
        const newNumber = {
          id: Date.now().toString(),
          number: numberToPurchase.number,
          friendlyName: `New Number (${numberToPurchase.formattedNumber})`,
          capabilities: numberToPurchase.capabilities,
          assignedTo: null,
          status: "active",
          purchaseDate: new Date().toISOString().split('T')[0],
          monthlyPrice: numberToPurchase.monthlyPrice,
          country: numberToPurchase.country
        };
        
        setOwnedNumbers(prev => [...prev, newNumber]);
        
        // Remove from search results
        setSearchResults(prev => prev.filter(num => num.id !== numberId));
        
        // Show success toast
        toast({
          title: "Number Purchased",
          description: `${numberToPurchase.number} has been successfully purchased and added to your account.`,
        });
      }
      
      // Clear loading state
      setPurchaseLoading(null);
    }, 1500);
  };

  const handleReleaseNumber = (numberId: string) => {
    // In a real app, this would make an API call to release the number
    setOwnedNumbers(prev => prev.filter(num => num.id !== numberId));
    
    toast({
      title: "Number Released",
      description: "The phone number has been released from your account.",
    });
  };

  const handleAssignNumber = (numberId: string, assignTo: string) => {
    // In a real app, this would make an API call to assign the number to the specified flow
    setOwnedNumbers(prev => 
      prev.map(num => 
        num.id === numberId ? { ...num, assignedTo: assignTo } : num
      )
    );
    
    toast({
      title: "Number Assigned",
      description: `The phone number has been assigned to ${assignTo}.`,
    });
  };

  const handleToggleNumberStatus = (numberId: string) => {
    // In a real app, this would make an API call to toggle the number status
    setOwnedNumbers(prev => 
      prev.map(num => 
        num.id === numberId ? { ...num, status: num.status === "active" ? "inactive" : "active" } : num
      )
    );
    
    const number = ownedNumbers.find(num => num.id === numberId);
    const newStatus = number?.status === "active" ? "inactive" : "active";
    
    toast({
      title: `Number ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      description: `The phone number is now ${newStatus}.`,
    });
  };

  const filteredOwnedNumbers = ownedNumbers.filter(num => 
    activeTab === "all" || num.status === activeTab
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Twilio Phone Numbers</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Purchase and manage phone numbers for your IVR system and call flows
              </p>
            </div>
            
            <Button onClick={() => setSearchResults([])}>
              <Plus size={16} className="mr-1.5" />
              Get New Number
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {searchResults.length > 0 ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                  <div>
                    <Label htmlFor="search-country">Country</Label>
                    <Select 
                      value={searchCountry} 
                      onValueChange={setSearchCountry}
                    >
                      <SelectTrigger id="search-country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="ES">Spain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="search-type">Number Type</Label>
                    <Select 
                      value={searchType} 
                      onValueChange={setSearchType}
                    >
                      <SelectTrigger id="search-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local</SelectItem>
                        <SelectItem value="toll-free">Toll-Free</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="search-query">Area Code or Number (Optional)</Label>
                    <Input
                      id="search-query"
                      placeholder="e.g., 415"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button onClick={handleSearchNumbers} disabled={searchLoading} className="w-full sm:w-auto">
                    {searchLoading ? (
                      <>
                        <Loader2 size={16} className="mr-1.5 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search size={16} className="mr-1.5" />
                        Search Numbers
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium mb-3">Available Numbers</h3>
                
                <div className="space-y-3">
                  {searchResults.map((number) => (
                    <div key={number.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-primary" />
                          <span className="font-medium">{number.formattedNumber}</span>
                          <Badge variant="outline" className="text-xs">
                            {number.region}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span>Capabilities:</span>
                            <div className="flex gap-1">
                              {number.capabilities.includes('voice') && (
                                <Badge variant="secondary" className="text-xs">Voice</Badge>
                              )}
                              {number.capabilities.includes('sms') && (
                                <Badge variant="secondary" className="text-xs">SMS</Badge>
                              )}
                              {number.capabilities.includes('mms') && (
                                <Badge variant="secondary" className="text-xs">MMS</Badge>
                              )}
                            </div>
                          </div>
                          
                          <span>•</span>
                          <span>${number.monthlyPrice.toFixed(2)}/month</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handlePurchaseNumber(number.id)}
                        disabled={!!purchaseLoading}
                        className="sm:w-auto"
                      >
                        {purchaseLoading === number.id ? (
                          <>
                            <Loader2 size={16} className="mr-1.5 animate-spin" />
                            Purchasing...
                          </>
                        ) : (
                          <>
                            <Check size={16} className="mr-1.5" />
                            Purchase Number
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" onClick={() => setSearchResults([])}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Tabs defaultValue="active" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Numbers</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
                
                <div className="mt-6">
                  {filteredOwnedNumbers.length > 0 ? (
                    <div className="space-y-4">
                      {filteredOwnedNumbers.map((number) => (
                        <div key={number.id} className="border rounded-lg overflow-hidden">
                          <div className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <div className={`p-1.5 rounded-full ${
                                    number.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    <Phone size={14} />
                                  </div>
                                  <span className="font-medium">{number.number}</span>
                                  <Badge variant={number.status === 'active' ? 'default' : 'outline'} className="text-xs">
                                    {number.status.charAt(0).toUpperCase() + number.status.slice(1)}
                                  </Badge>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground">
                                  <span>{number.friendlyName}</span>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <span>Capabilities:</span>
                                    <div className="flex gap-1">
                                      {number.capabilities.includes('voice') && (
                                        <Badge variant="secondary" className="text-xs">Voice</Badge>
                                      )}
                                      {number.capabilities.includes('sms') && (
                                        <Badge variant="secondary" className="text-xs">SMS</Badge>
                                      )}
                                      {number.capabilities.includes('mms') && (
                                        <Badge variant="secondary" className="text-xs">MMS</Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  <Label htmlFor={`activate-${number.id}`} className="mr-2 text-sm">
                                    Active
                                  </Label>
                                  <Switch 
                                    id={`activate-${number.id}`} 
                                    checked={number.status === 'active'}
                                    onCheckedChange={() => handleToggleNumberStatus(number.id)}
                                  />
                                </div>
                                
                                <Select onValueChange={(value) => handleAssignNumber(number.id, value)}>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={number.assignedTo || "Assign to flow"} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Support IVR">Support IVR</SelectItem>
                                    <SelectItem value="Sales IVR">Sales IVR</SelectItem>
                                    <SelectItem value="Outbound Dialer">Outbound Dialer</SelectItem>
                                    <SelectItem value="After Hours">After Hours</SelectItem>
                                  </SelectContent>
                                </Select>
                                
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => handleReleaseNumber(number.id)}
                                >
                                  <AlertCircle size={16} className="text-destructive" />
                                </Button>
                              </div>
                            </div>
                            
                            <Separator className="my-3" />
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                              <div className="flex items-center gap-x-3 flex-wrap">
                                <div className="flex items-center gap-1">
                                  <PhoneCall size={14} className="text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    {number.assignedTo || "Not assigned to any flow"}
                                  </span>
                                </div>
                                
                                {number.assignedTo && (
                                  <>
                                    <span className="text-muted-foreground">•</span>
                                    <div className="flex items-center gap-1">
                                      <PhoneForwarded size={14} className="text-muted-foreground" />
                                      <span className="text-muted-foreground">
                                        Forwards to: Main Queue
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-x-3">
                                <span className="text-muted-foreground">
                                  ${number.monthlyPrice.toFixed(2)}/month
                                </span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground">
                                  Purchased: {number.purchaseDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-12 border border-dashed rounded-lg">
                      <Phone size={40} className="mx-auto text-muted-foreground mb-3" />
                      <h3 className="font-medium text-lg">No Phone Numbers Found</h3>
                      <p className="text-muted-foreground mt-1 mb-4">
                        {activeTab === "active" 
                          ? "You don't have any active phone numbers yet." 
                          : activeTab === "inactive"
                            ? "You don't have any inactive phone numbers."
                            : "You don't have any phone numbers yet."}
                      </p>
                      <Button onClick={() => setSearchResults(mockSearchResults)}>
                        <Plus size={16} className="mr-1.5" />
                        Get Your First Number
                      </Button>
                    </div>
                  )}
                </div>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Twilio Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-green-100 text-green-600">
                  <Check size={16} />
                </div>
                <h3 className="font-medium">Account Connected</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your Twilio account is connected and ready to use.
              </p>
              <Button variant="outline" size="sm" className="mt-3 w-full flex gap-1.5">
                <RefreshCw size={14} />
                Refresh Connection
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600">
                  <Phone size={16} />
                </div>
                <h3 className="font-medium">Active Numbers</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                You have {ownedNumbers.filter(n => n.status === 'active').length} active numbers
              </p>
              <p className="text-sm text-muted-foreground">
                Monthly cost: ${ownedNumbers
                  .filter(n => n.status === 'active')
                  .reduce((total, num) => total + num.monthlyPrice, 0)
                  .toFixed(2)}
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-yellow-100 text-yellow-600">
                  <AlertTriangle size={16} />
                </div>
                <h3 className="font-medium">Twilio Balance</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                Current balance: $128.45
              </p>
              <Button size="sm" className="mt-1 w-full">
                Add Credits
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwilioPhoneNumbers;
