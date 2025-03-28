
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, Phone, Check, X, Loader2, Mail, 
  ArrowRight, MessageSquare, Plus, Search
} from "lucide-react";
import { 
  BrandFacebook, BrandTwitter, BrandWhatsapp, 
  BrandTelegram, BrandSlack, BrandViber, BrandLine
} from "@/components/ui/custom-icons";
import { IntegrationProps } from './types';
import { Label } from "@/components/ui/label";

const MessagingIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<{[key: string]: boolean}>({
    whatsapp: false,
    messenger: false,
    twitter: false,
    telegram: false,
    slack: false,
    email: false,
    twilio: false,
    viber: false,
    line: false,
  });
  
  const [apiKeys, setApiKeys] = useState<{[key: string]: string}>({
    whatsapp: "",
    messenger: "",
    twitter: "",
    telegram: "",
    slack: "",
    twilio: "",
    viber: "",
    line: "",
  });

  const [emailConfig, setEmailConfig] = useState({
    host: "",
    port: "587",
    username: "",
    password: "",
    secure: false
  });
  
  // New state for phone number purchasing
  const [showPhoneSearch, setShowPhoneSearch] = useState(false);
  const [searchingNumbers, setSearchingNumbers] = useState(false);
  const [searchedNumbers, setSearchedNumbers] = useState<any[]>([]);
  const [purchasingNumber, setPurchasingNumber] = useState<string | null>(null);
  const [numberSearchParams, setNumberSearchParams] = useState({
    country: "US",
    areaCode: "",
    type: "local"
  });

  const handleInputChange = (service: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [service]: value }));
  };

  const handleEmailConfigChange = (field: keyof typeof emailConfig, value: string | boolean) => {
    setEmailConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleConnect = (service: string) => {
    if (connected[service]) {
      toast({
        title: "Already Connected",
        description: `Your ${getServiceName(service)} is already connected.`,
      });
      return;
    }

    // For email, check SMTP configuration
    if (service === "email") {
      if (!emailConfig.host || !emailConfig.username || !emailConfig.password) {
        toast({
          title: "SMTP Configuration Required",
          description: `Please enter your SMTP server details.`,
          variant: "destructive",
        });
        return;
      }
    } 
    // Special case for Twilio
    else if (service === "twilio") {
      if (!apiKeys[service]) {
        toast({
          title: "API Key Required",
          description: `Please enter your ${getServiceName(service)} API key or credentials.`,
          variant: "destructive",
        });
        return;
      }
      
      // Show phone number search interface
      setShowPhoneSearch(true);
      return;
    }
    // For other services, check API key
    else if (!apiKeys[service]) {
      toast({
        title: "API Key Required",
        description: `Please enter your ${getServiceName(service)} API key or credentials.`,
        variant: "destructive",
      });
      return;
    }

    setConnecting(service);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(null);
      setConnected({...connected, [service]: true});
      toast({
        title: "Connection Successful",
        description: `Your ${getServiceName(service)} account has been connected successfully.`,
      });
      
      if (onConnect) {
        onConnect(service);
      }
    }, 1500);
  };

  const handleDisconnect = (service: string) => {
    setConnected({...connected, [service]: false});
    
    if (service === "email") {
      setEmailConfig({
        host: "",
        port: "587",
        username: "",
        password: "",
        secure: false
      });
    } else {
      setApiKeys(prev => ({ ...prev, [service]: "" }));
    }
    
    // Reset phone number search if disconnecting Twilio
    if (service === "twilio") {
      setShowPhoneSearch(false);
      setSearchedNumbers([]);
    }
    
    toast({
      title: "Disconnected",
      description: `Your ${getServiceName(service)} account has been disconnected.`,
    });
  };

  const getServiceName = (service: string): string => {
    const serviceNames: {[key: string]: string} = {
      whatsapp: "WhatsApp Business",
      messenger: "Facebook Messenger",
      twitter: "Twitter",
      telegram: "Telegram",
      slack: "Slack",
      email: "Email",
      twilio: "Twilio",
      viber: "Viber",
      line: "LINE",
    };
    return serviceNames[service] || service;
  };

  // Function to search for available phone numbers
  const searchPhoneNumbers = () => {
    setSearchingNumbers(true);
    
    // Simulate API call to search for numbers
    setTimeout(() => {
      // Mock data for available phone numbers
      const mockNumbers = [
        { id: '1', number: '+1 (555) 123-4567', capabilities: ['voice', 'sms'], region: 'US - New York', monthlyPrice: 1.00 },
        { id: '2', number: '+1 (555) 234-5678', capabilities: ['voice', 'sms', 'mms'], region: 'US - California', monthlyPrice: 1.00 },
        { id: '3', number: '+1 (555) 345-6789', capabilities: ['voice'], region: 'US - Texas', monthlyPrice: 1.00 },
        { id: '4', number: '+1 (555) 456-7890', capabilities: ['voice', 'sms'], region: 'US - Illinois', monthlyPrice: 1.00 },
      ];
      
      setSearchedNumbers(mockNumbers);
      setSearchingNumbers(false);
    }, 1500);
  };
  
  // Function to purchase a phone number
  const purchasePhoneNumber = (numberId: string) => {
    setPurchasingNumber(numberId);
    
    // Simulate purchasing process
    setTimeout(() => {
      setPurchasingNumber(null);
      setShowPhoneSearch(false);
      setConnected({...connected, ['twilio']: true});
      
      toast({
        title: "Phone Number Purchased",
        description: "Your phone number has been successfully purchased and added to your Twilio account.",
      });
      
      if (onConnect) {
        onConnect('twilio');
      }
    }, 2000);
  };

  // Helper function to create Messaging integration cards
  const renderMessagingCard = (
    service: string, 
    name: string, 
    description: string, 
    icon: React.ReactNode,
    backgroundColor: string,
    textColor: string
  ) => (
    <Card className="p-5 border">
      <div className="flex items-center gap-3 mb-4">
        <div className={`${backgroundColor} p-2 rounded-full`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      
      {connected[service] ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Connected</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleDisconnect(service)}
          >
            <X className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
          
          {/* Special case for Twilio - show manage numbers button */}
          {service === 'twilio' && (
            <Button 
              variant="default"
              size="sm"
              className="w-full mt-2"
              onClick={() => window.location.href = "/phone/numbers"}
            >
              <Phone className="mr-2 h-4 w-4" />
              Manage Phone Numbers
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* Special case for Twilio - show phone number search interface */}
          {service === 'twilio' && showPhoneSearch ? (
            <div className="space-y-4">
              <div className="p-3 border rounded-md bg-muted/30">
                <h5 className="font-medium text-sm mb-2">Find a Phone Number</h5>
                
                <div className="space-y-2 mb-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="number-country" className="text-xs">Country</Label>
                      <select 
                        id="number-country"
                        className="w-full p-2 text-xs border rounded-md bg-background"
                        value={numberSearchParams.country}
                        onChange={(e) => setNumberSearchParams({...numberSearchParams, country: e.target.value})}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="number-type" className="text-xs">Type</Label>
                      <select 
                        id="number-type"
                        className="w-full p-2 text-xs border rounded-md bg-background"
                        value={numberSearchParams.type}
                        onChange={(e) => setNumberSearchParams({...numberSearchParams, type: e.target.value})}
                      >
                        <option value="local">Local</option>
                        <option value="toll-free">Toll-Free</option>
                        <option value="mobile">Mobile</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="area-code" className="text-xs">Area Code (optional)</Label>
                    <Input
                      id="area-code"
                      placeholder="e.g. 212"
                      className="text-xs"
                      value={numberSearchParams.areaCode}
                      onChange={(e) => setNumberSearchParams({...numberSearchParams, areaCode: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setShowPhoneSearch(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="text-xs"
                    onClick={searchPhoneNumbers}
                    disabled={searchingNumbers}
                  >
                    {searchingNumbers ? (
                      <>
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-1 h-3 w-3" />
                        Search Numbers
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {searchedNumbers.length > 0 && (
                <div>
                  <h5 className="font-medium text-xs mb-2">Available Numbers</h5>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {searchedNumbers.map((number) => (
                      <div key={number.id} className="p-2 border rounded-md flex justify-between items-center">
                        <div>
                          <p className="text-xs font-medium">{number.number}</p>
                          <div className="flex gap-1 items-center mt-1">
                            <span className="text-xs text-muted-foreground">{number.region}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">${number.monthlyPrice.toFixed(2)}/mo</span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => purchasePhoneNumber(number.id)}
                          disabled={!!purchasingNumber}
                        >
                          {purchasingNumber === number.id ? (
                            <>
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              Purchasing...
                            </>
                          ) : (
                            "Purchase"
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t pt-3">
                <Input
                  placeholder="Twilio API Key"
                  className="mb-3"
                  value={apiKeys['twilio']}
                  onChange={(e) => handleInputChange('twilio', e.target.value)}
                  type="password"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleConnect('twilio')}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  I already have a Twilio account
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Special case for email - show SMTP fields */}
              {service === "email" ? (
                <div className="space-y-2">
                  <Input
                    placeholder="SMTP Server (e.g. smtp.gmail.com)"
                    className="mb-2"
                    value={emailConfig.host}
                    onChange={(e) => handleEmailConfigChange('host', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Port (e.g. 587)"
                      value={emailConfig.port}
                      onChange={(e) => handleEmailConfigChange('port', e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="secure-connection" 
                        checked={emailConfig.secure}
                        onChange={(e) => handleEmailConfigChange('secure', e.target.checked)} 
                      />
                      <label htmlFor="secure-connection" className="text-xs">SSL/TLS</label>
                    </div>
                  </div>
                  <Input
                    placeholder="Username/Email"
                    className="mb-2 mt-2"
                    value={emailConfig.username}
                    onChange={(e) => handleEmailConfigChange('username', e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="mb-3"
                    value={emailConfig.password}
                    onChange={(e) => handleEmailConfigChange('password', e.target.value)}
                  />
                </div>
              ) : service === "twilio" ? (
                <div className="space-y-3">
                  <Input
                    placeholder={`${name} API Key`}
                    className="mb-1"
                    value={apiKeys[service]}
                    onChange={(e) => handleInputChange(service, e.target.value)}
                    type="password"
                  />
                  <p className="text-xs text-muted-foreground mb-1">Connect your Twilio account to enable SMS and voice functionality.</p>
                </div>
              ) : (
                // API key field for other services
                <Input
                  placeholder={`${name} API Key`}
                  className="mb-3"
                  value={apiKeys[service]}
                  onChange={(e) => handleInputChange(service, e.target.value)}
                  type={service === "viber" || service === "line" ? "password" : "text"}
                />
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleConnect(service)}
                disabled={connecting === service}
              >
                {connecting === service ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : service === "twilio" ? (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Get a Phone Number
                  </>
                ) : (
                  <>
                    Connect <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </>
          )}
        </>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Messaging Integrations</h2>
      <p className="text-sm text-muted-foreground">
        Connect your messaging platforms to automate customer communication
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* WhatsApp */}
        {renderMessagingCard(
          "whatsapp",
          "WhatsApp Business",
          "Connect your WhatsApp Business account",
          <BrandWhatsapp className="h-5 w-5 text-green-600" />,
          "bg-green-100",
          "text-green-600"
        )}
        
        {/* Facebook Messenger */}
        {renderMessagingCard(
          "messenger",
          "Facebook Messenger",
          "Connect your Messenger for customer chat",
          <BrandFacebook className="h-5 w-5 text-blue-600" />,
          "bg-blue-100",
          "text-blue-600"
        )}
        
        {/* Twitter */}
        {renderMessagingCard(
          "twitter",
          "Twitter",
          "Connect Twitter for direct messages",
          <BrandTwitter className="h-5 w-5 text-blue-600" />,
          "bg-blue-100",
          "text-blue-600"
        )}
        
        {/* Viber - New */}
        {renderMessagingCard(
          "viber",
          "Viber",
          "Connect Viber for business messaging",
          <BrandViber className="h-5 w-5 text-purple-600" />,
          "bg-purple-100",
          "text-purple-600"
        )}
        
        {/* LINE - New */}
        {renderMessagingCard(
          "line",
          "LINE",
          "Connect LINE for customer messaging",
          <BrandLine className="h-5 w-5 text-green-600" />,
          "bg-green-100",
          "text-green-600"
        )}
        
        {/* Telegram */}
        {renderMessagingCard(
          "telegram",
          "Telegram",
          "Connect Telegram bot for customer service",
          <BrandTelegram className="h-5 w-5 text-blue-600" />,
          "bg-blue-100",
          "text-blue-600"
        )}
        
        {/* Slack */}
        {renderMessagingCard(
          "slack",
          "Slack",
          "Connect Slack for team notifications",
          <BrandSlack className="h-5 w-5 text-purple-600" />,
          "bg-purple-100",
          "text-purple-600"
        )}
        
        {/* Email */}
        {renderMessagingCard(
          "email",
          "Email Integration",
          "Connect email for support tickets",
          <Mail className="h-5 w-5 text-amber-600" />,
          "bg-amber-100",
          "text-amber-600"
        )}
        
        {/* Twilio */}
        {renderMessagingCard(
          "twilio",
          "Twilio",
          "Connect Twilio for SMS and voice calls",
          <Phone className="h-5 w-5 text-red-600" />,
          "bg-red-100",
          "text-red-600"
        )}
      </div>
    </div>
  );
};

export default MessagingIntegrations;
