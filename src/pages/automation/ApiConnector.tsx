
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Database, FileText, Lock, Globe, RefreshCw, Plus, Search, 
  Trash2, Copy, Check, Save, ChevronDown, ChevronRight, ArrowRight
} from "lucide-react";

const ApiConnector = () => {
  const { toast } = useToast();
  const [selectedApi, setSelectedApi] = useState<string | null>(null);
  const [apiName, setApiName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiMethod, setApiMethod] = useState("GET");
  const [apiHeaders, setApiHeaders] = useState([{ key: "", value: "" }]);
  const [apiParameters, setApiParameters] = useState([{ key: "", value: "", type: "query" }]);
  const [apiAuthentication, setApiAuthentication] = useState("none");
  const [apiTestResponse, setApiTestResponse] = useState("");
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [expandedSection, setExpandedSection] = useState("basic");

  // Sample APIs
  const predefinedApis = [
    { 
      id: "twilio", 
      name: "Twilio SMS", 
      category: "Messaging",
      description: "Send SMS messages via Twilio API",
      icon: <MessageIcon />
    },
    { 
      id: "stripe", 
      name: "Stripe Payments", 
      category: "Payments",
      description: "Process payments with Stripe API",
      icon: <PaymentIcon />
    },
    { 
      id: "sendgrid", 
      name: "SendGrid Email", 
      category: "Messaging",
      description: "Send emails via SendGrid API",
      icon: <EmailIcon />
    },
    { 
      id: "slack", 
      name: "Slack Notifications", 
      category: "Messaging",
      description: "Send notifications to Slack channels",
      icon: <SlackIcon />
    },
    { 
      id: "google-sheets", 
      name: "Google Sheets", 
      category: "Data",
      description: "Read and write data to Google Sheets",
      icon: <SheetsIcon />
    },
    { 
      id: "hubspot", 
      name: "HubSpot CRM", 
      category: "CRM",
      description: "Manage contacts and deals in HubSpot",
      icon: <CrmIcon />
    },
    { 
      id: "custom", 
      name: "Custom API", 
      category: "Custom",
      description: "Configure a custom API endpoint",
      icon: <CustomIcon />
    }
  ];

  // Category filters
  const categories = ["All", "Messaging", "Payments", "Data", "CRM", "Custom"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredApis = activeCategory === "All" 
    ? predefinedApis 
    : predefinedApis.filter(api => api.category === activeCategory);

  const addHeaderField = () => {
    setApiHeaders([...apiHeaders, { key: "", value: "" }]);
  };

  const removeHeaderField = (index: number) => {
    const newHeaders = [...apiHeaders];
    newHeaders.splice(index, 1);
    setApiHeaders(newHeaders);
  };

  const updateHeaderField = (index: number, field: string, value: string) => {
    const newHeaders = [...apiHeaders];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setApiHeaders(newHeaders);
  };

  const addParameterField = () => {
    setApiParameters([...apiParameters, { key: "", value: "", type: "query" }]);
  };

  const removeParameterField = (index: number) => {
    const newParameters = [...apiParameters];
    newParameters.splice(index, 1);
    setApiParameters(newParameters);
  };

  const updateParameterField = (index: number, field: string, value: string) => {
    const newParameters = [...apiParameters];
    newParameters[index] = { ...newParameters[index], [field]: value };
    setApiParameters(newParameters);
  };

  const handleApiTest = () => {
    setIsTestingApi(true);
    
    // Simulate API testing
    setTimeout(() => {
      setApiTestResponse(JSON.stringify({
        success: true,
        status: 200,
        data: {
          message: "API connection successful",
          timestamp: new Date().toISOString()
        }
      }, null, 2));
      
      setIsTestingApi(false);
      
      toast({
        title: "API Test Successful",
        description: "The API connection was tested successfully",
        variant: "default",
      });
    }, 1500);
  };

  const handleSaveApi = () => {
    if (!apiName || !apiUrl) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and URL for your API.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "API Saved",
      description: "Your API connector has been saved and is ready to use in workflows",
      variant: "default",
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">API Connector</h1>
          <p className="text-muted-foreground mt-1">Connect to external services and APIs for your workflows</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="mb-4 bg-muted/50">
            <TabsTrigger value="browse">Browse APIs</TabsTrigger>
            <TabsTrigger value="custom">Custom API</TabsTrigger>
            <TabsTrigger value="connected">Connected APIs</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <Badge 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${activeCategory === category ? 'bg-violet-600' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredApis.map(api => (
                <Card 
                  key={api.id} 
                  className={`cursor-pointer hover:border-violet-300 transition-all ${selectedApi === api.id ? 'border-violet-600 ring-1 ring-violet-600' : ''}`}
                  onClick={() => setSelectedApi(api.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                        {api.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{api.name}</h3>
                        <p className="text-sm text-muted-foreground">{api.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">{api.category}</Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 text-violet-600 border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                      size="sm"
                    >
                      <Plus size={16} className="mr-2" />
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Custom API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-muted"
                    onClick={() => toggleSection("basic")}
                  >
                    <div className="flex items-center gap-2">
                      <Database size={18} className="text-violet-600" />
                      <h3 className="font-medium">Basic Information</h3>
                    </div>
                    {expandedSection === "basic" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                  
                  {expandedSection === "basic" && (
                    <div className="pl-8 pr-2 pb-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">API Name</label>
                        <Input 
                          placeholder="E.g., My Custom API" 
                          value={apiName}
                          onChange={(e) => setApiName(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">API URL</label>
                        <Input 
                          placeholder="https://api.example.com/v1/endpoint" 
                          value={apiUrl}
                          onChange={(e) => setApiUrl(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">HTTP Method</label>
                        <Select 
                          value={apiMethod} 
                          onValueChange={setApiMethod}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select HTTP method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-muted"
                    onClick={() => toggleSection("auth")}
                  >
                    <div className="flex items-center gap-2">
                      <Lock size={18} className="text-violet-600" />
                      <h3 className="font-medium">Authentication</h3>
                    </div>
                    {expandedSection === "auth" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                  
                  {expandedSection === "auth" && (
                    <div className="pl-8 pr-2 pb-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Authentication Type</label>
                        <Select 
                          value={apiAuthentication} 
                          onValueChange={setApiAuthentication}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select authentication type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Authentication</SelectItem>
                            <SelectItem value="api_key">API Key</SelectItem>
                            <SelectItem value="basic">Basic Auth</SelectItem>
                            <SelectItem value="bearer">Bearer Token</SelectItem>
                            <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {apiAuthentication === "api_key" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-1">API Key Name</label>
                            <Input placeholder="E.g., api_key, x-api-key" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">API Key Value</label>
                            <Input placeholder="Your API key" type="password" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Add to</label>
                            <Select defaultValue="header">
                              <SelectTrigger>
                                <SelectValue placeholder="Select where to add API key" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="header">Header</SelectItem>
                                <SelectItem value="query">Query Parameter</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-muted"
                    onClick={() => toggleSection("headers")}
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-violet-600" />
                      <h3 className="font-medium">Headers</h3>
                    </div>
                    {expandedSection === "headers" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                  
                  {expandedSection === "headers" && (
                    <div className="pl-8 pr-2 pb-4 space-y-4">
                      {apiHeaders.map((header, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input 
                            placeholder="Header name" 
                            className="flex-1"
                            value={header.key}
                            onChange={(e) => updateHeaderField(index, "key", e.target.value)}
                          />
                          <Input 
                            placeholder="Value" 
                            className="flex-1"
                            value={header.value}
                            onChange={(e) => updateHeaderField(index, "value", e.target.value)}
                          />
                          <Button 
                            variant="ghost"
                            size="icon"
                            onClick={() => removeHeaderField(index)}
                          >
                            <Trash2 size={16} className="text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={addHeaderField}
                      >
                        <Plus size={16} className="mr-2" />
                        Add Header
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-muted"
                    onClick={() => toggleSection("params")}
                  >
                    <div className="flex items-center gap-2">
                      <Globe size={18} className="text-violet-600" />
                      <h3 className="font-medium">Parameters</h3>
                    </div>
                    {expandedSection === "params" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                  
                  {expandedSection === "params" && (
                    <div className="pl-8 pr-2 pb-4 space-y-4">
                      {apiParameters.map((param, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input 
                            placeholder="Parameter name" 
                            className="flex-1"
                            value={param.key}
                            onChange={(e) => updateParameterField(index, "key", e.target.value)}
                          />
                          <Input 
                            placeholder="Value" 
                            className="flex-1"
                            value={param.value}
                            onChange={(e) => updateParameterField(index, "value", e.target.value)}
                          />
                          <Select 
                            value={param.type}
                            onValueChange={(value) => updateParameterField(index, "type", value)}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="query">Query</SelectItem>
                              <SelectItem value="path">Path</SelectItem>
                              <SelectItem value="body">Body</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button 
                            variant="ghost"
                            size="icon"
                            onClick={() => removeParameterField(index)}
                          >
                            <Trash2 size={16} className="text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={addParameterField}
                      >
                        <Plus size={16} className="mr-2" />
                        Add Parameter
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-muted"
                    onClick={() => toggleSection("test")}
                  >
                    <div className="flex items-center gap-2">
                      <RefreshCw size={18} className="text-violet-600" />
                      <h3 className="font-medium">Test API</h3>
                    </div>
                    {expandedSection === "test" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                  
                  {expandedSection === "test" && (
                    <div className="pl-8 pr-2 pb-4 space-y-4">
                      <Button 
                        variant="outline"
                        className="mr-2"
                        disabled={isTestingApi}
                        onClick={handleApiTest}
                      >
                        {isTestingApi ? (
                          <RefreshCw size={16} className="mr-2 animate-spin" />
                        ) : (
                          <RefreshCw size={16} className="mr-2" />
                        )}
                        Test Connection
                      </Button>
                      
                      {apiTestResponse && (
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium">Response</h4>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(apiTestResponse);
                                toast({
                                  title: "Copied",
                                  description: "Response copied to clipboard",
                                  variant: "default",
                                });
                              }}
                            >
                              <Copy size={14} className="mr-1" /> Copy
                            </Button>
                          </div>
                          <pre className="bg-muted p-4 rounded-md text-xs overflow-auto max-h-[200px]">
                            {apiTestResponse}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="pt-4 space-x-2">
                  <Button 
                    className="bg-violet-600 hover:bg-violet-700"
                    onClick={handleSaveApi}
                  >
                    <Save size={16} className="mr-2" />
                    Save API
                  </Button>
                  <Button variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connected">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                        <MessageIcon />
                      </div>
                      <div>
                        <h3 className="font-medium">Twilio SMS</h3>
                        <p className="text-sm text-muted-foreground">Connected 2 days ago</p>
                        <Badge variant="outline" className="mt-1 text-xs">Messaging</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Check size={16} className="mr-2 text-green-600" />
                        Connected
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowRight size={16} className="mr-2" />
                        Use in Workflow
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                        <EmailIcon />
                      </div>
                      <div>
                        <h3 className="font-medium">SendGrid Email</h3>
                        <p className="text-sm text-muted-foreground">Connected 1 week ago</p>
                        <Badge variant="outline" className="mt-1 text-xs">Messaging</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Check size={16} className="mr-2 text-green-600" />
                        Connected
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowRight size={16} className="mr-2" />
                        Use in Workflow
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                        <SheetsIcon />
                      </div>
                      <div>
                        <h3 className="font-medium">Google Sheets</h3>
                        <p className="text-sm text-muted-foreground">Connected 3 days ago</p>
                        <Badge variant="outline" className="mt-1 text-xs">Data</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Check size={16} className="mr-2 text-green-600" />
                        Connected
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowRight size={16} className="mr-2" />
                        Use in Workflow
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

// Icon components
const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PaymentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9H22M5 18H9M13 18H19M2 5H22V19H2V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6L12 13L22 6M2 6V18H22V6M2 6H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SlackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12H4V7M9 12V17H14M9 12L4 7M15 7H20V12M15 7V2H10M15 7L20 12M15 17H20V12M15 17V22H10M15 17L20 12M9 22V17M9 22H4V17M4 17L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SheetsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 9H21M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CrmIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CustomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M5 12C3.89543 12 3 11.1046 3 10V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V10C21 11.1046 20.1046 12 19 12M5 12C3.89543 12 3 12.8954 3 14V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V14C21 12.8954 20.1046 12 19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default ApiConnector;
