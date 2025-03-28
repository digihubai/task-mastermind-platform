
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PhoneIcon, PlusCircle } from "lucide-react";
import MessagingServiceCard from './MessagingServiceCard';
import { useToast } from "@/hooks/use-toast";
import { MessagingServiceProps, PhoneNumber, NumberSearchParams } from './types';
import { useMessagingService } from './utils';

const TwilioIntegration: React.FC<MessagingServiceProps> = ({ 
  connected = false, 
  connecting = null, 
  onConnect, 
  onDisconnect 
}) => {
  const { toast } = useToast();
  const [internalConnecting, setInternalConnecting] = useState<string | null>(null);
  const [internalConnected, setInternalConnected] = useState<{[key: string]: boolean}>({ twilio: connected });
  const { simulateConnection, handleDisconnect } = useMessagingService();

  const [accountSid, setAccountSid] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [showPhoneNumbers, setShowPhoneNumbers] = useState(false);
  
  // For phone number search
  const [searchParams, setSearchParams] = useState<NumberSearchParams>({
    country: "US",
    areaCode: "",
    type: "local"
  });
  
  // Mock phone numbers that would be returned from Twilio API
  const [availablePhoneNumbers, setAvailablePhoneNumbers] = useState<PhoneNumber[]>([
    {
      id: "PN1",
      number: "+1 (415) 555-1234",
      capabilities: ["voice", "SMS"],
      region: "San Francisco, CA",
      monthlyPrice: 1.00
    },
    {
      id: "PN2",
      number: "+1 (415) 555-5678",
      capabilities: ["voice", "SMS", "MMS"],
      region: "San Francisco, CA",
      monthlyPrice: 2.00
    },
    {
      id: "PN3",
      number: "+1 (212) 555-1212",
      capabilities: ["voice", "SMS", "MMS", "fax"],
      region: "New York, NY",
      monthlyPrice: 2.50
    }
  ]);
  
  // Numbers actually purchased and owned by the account
  const [ownedPhoneNumbers, setOwnedPhoneNumbers] = useState<PhoneNumber[]>([]);
  
  const handleSearchParamChange = (param: keyof NumberSearchParams, value: string) => {
    setSearchParams(prev => ({ ...prev, [param]: value }));
  };
  
  const handleSearchNumbers = () => {
    // In a real implementation, this would make an API call to Twilio
    toast({
      title: "Phone numbers found",
      description: `Found ${availablePhoneNumbers.length} numbers matching your criteria.`,
    });
    
    // For the demo, we're just showing the mock numbers
    setShowPhoneNumbers(true);
  };
  
  const handlePurchaseNumber = (number: PhoneNumber) => {
    // In a real implementation, this would make an API call to Twilio
    setOwnedPhoneNumbers(prev => [...prev, number]);
    
    toast({
      title: "Phone number purchased",
      description: `Successfully purchased ${number.number}`,
    });
  };
  
  const handleReleaseNumber = (numberId: string) => {
    // In a real implementation, this would make an API call to Twilio
    setOwnedPhoneNumbers(prev => prev.filter(n => n.id !== numberId));
    
    toast({
      title: "Phone number released",
      description: "Phone number has been released and is no longer associated with your account.",
    });
  };

  const handleConnect = () => {
    if (internalConnected.twilio) {
      toast({
        title: "Already Connected",
        description: "Twilio is already connected.",
      });
      return;
    }

    if (!accountSid || !authToken) {
      toast({
        title: "Missing Credentials",
        description: "Please enter your Twilio Account SID and Auth Token.",
        variant: "destructive",
      });
      return;
    }

    if (onConnect) {
      onConnect('twilio');
    } else {
      simulateConnection(
        'twilio', 
        setInternalConnecting, 
        setInternalConnected, 
        internalConnected
      );
    }
  };

  const handleTwilioDisconnect = () => {
    if (onDisconnect) {
      onDisconnect('twilio');
    } else {
      handleDisconnect('twilio', setInternalConnected, internalConnected);
    }
    
    setAccountSid("");
    setAuthToken("");
    setShowPhoneNumbers(false);
    setOwnedPhoneNumbers([]);
  };

  const twilioService = {
    id: "twilio",
    name: "Twilio",
    description: "SMS, voice and video with Twilio",
    icon: <PhoneIcon className="h-5 w-5 text-red-600" />,
    backgroundColor: "bg-red-100",
    textColor: "text-red-600",
    connected: internalConnected.twilio || connected
  };

  return (
    <MessagingServiceCard 
      service={twilioService}
      connecting={connecting || internalConnecting}
      onConnect={handleConnect}
      onDisconnect={handleTwilioDisconnect}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="account-sid">Account SID</Label>
          <Input 
            id="account-sid"
            value={accountSid}
            onChange={(e) => setAccountSid(e.target.value)}
            placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
          
          <Label htmlFor="auth-token">Auth Token</Label>
          <Input 
            id="auth-token"
            type="password"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            placeholder="Enter your auth token"
          />
        </div>
        
        {(internalConnected.twilio || connected) && (
          <div className="mt-4 border-t pt-4">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Phone Numbers</h3>
              {ownedPhoneNumbers.length > 0 ? (
                <div className="space-y-2">
                  {ownedPhoneNumbers.map(number => (
                    <div key={number.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{number.number}</p>
                        <p className="text-xs text-gray-500">{number.capabilities.join(", ")}</p>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleReleaseNumber(number.id)}
                      >
                        Release
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No phone numbers in your account yet.</p>
              )}
            </div>
            
            <div>
              <Button 
                onClick={() => setShowPhoneNumbers(!showPhoneNumbers)} 
                variant="outline"
                className="w-full flex items-center justify-center"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                {showPhoneNumbers ? "Hide Available Numbers" : "Search for Phone Numbers"}
              </Button>
              
              {showPhoneNumbers && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <select 
                        id="country"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={searchParams.country}
                        onChange={(e) => handleSearchParamChange("country", e.target.value)}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="areaCode">Area Code</Label>
                      <Input 
                        id="areaCode"
                        value={searchParams.areaCode}
                        onChange={(e) => handleSearchParamChange("areaCode", e.target.value)}
                        placeholder="e.g. 415"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Number Type</Label>
                    <select 
                      id="type"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={searchParams.type}
                      onChange={(e) => handleSearchParamChange("type", e.target.value)}
                    >
                      <option value="local">Local</option>
                      <option value="tollfree">Toll Free</option>
                      <option value="mobile">Mobile</option>
                    </select>
                  </div>
                  
                  <Button onClick={handleSearchNumbers} className="w-full">Search</Button>
                  
                  <div className="space-y-2">
                    {availablePhoneNumbers.map(number => (
                      <div key={number.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{number.number}</p>
                          <p className="text-xs text-gray-500">{number.region} • ${number.monthlyPrice.toFixed(2)}/month</p>
                          <p className="text-xs text-gray-500">Capabilities: {number.capabilities.join(", ")}</p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handlePurchaseNumber(number)}
                        >
                          Buy
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MessagingServiceCard>
  );
};

export default TwilioIntegration;
