
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, Loader2, Search, Plus, X } from "lucide-react";
import MessagingServiceCard from './MessagingServiceCard';
import { useToast } from "@/hooks/use-toast";
import { MessagingServiceProps, NumberSearchParams, PhoneNumber } from './types';
import { useMessagingService } from './utils';

const TwilioIntegration: React.FC<MessagingServiceProps> = ({ onConnect, onDisconnect }) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string>("");
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<{[key: string]: boolean}>({ twilio: false });
  const { simulateConnection, handleDisconnect } = useMessagingService();
  
  // Phone number purchasing states
  const [showPhoneSearch, setShowPhoneSearch] = useState<boolean>(false);
  const [searchingNumbers, setSearchingNumbers] = useState<boolean>(false);
  const [searchedNumbers, setSearchedNumbers] = useState<PhoneNumber[]>([]);
  const [purchasingNumber, setPurchasingNumber] = useState<string | null>(null);
  const [numberSearchParams, setNumberSearchParams] = useState<NumberSearchParams>({
    country: "US",
    areaCode: "",
    type: "local"
  });

  const handleInputChange = (value: string) => {
    setApiKey(value);
  };

  const handleConnect = () => {
    if (connected.twilio) {
      toast({
        title: "Already Connected",
        description: "Your Twilio account is already connected.",
      });
      return;
    }
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Twilio API key or credentials.",
        variant: "destructive",
      });
      return;
    }
    
    // Show phone number search interface
    setShowPhoneSearch(true);
  };

  const handleTwilioDisconnect = () => {
    handleDisconnect('twilio', setConnected, connected);
    setApiKey("");
    setShowPhoneSearch(false);
    setSearchedNumbers([]);
    
    if (onDisconnect) {
      onDisconnect('twilio');
    }
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

  const twilioService = {
    id: "twilio",
    name: "Twilio",
    description: "Connect Twilio for SMS and voice calls",
    icon: <Phone className="h-5 w-5 text-red-600" />,
    backgroundColor: "bg-red-100",
    textColor: "text-red-600",
    connected: connected.twilio
  };

  return (
    <MessagingServiceCard 
      service={twilioService}
      connecting={connecting}
      onConnect={handleConnect}
      onDisconnect={handleTwilioDisconnect}
    >
      {twilioService.connected && (
        <Button 
          variant="default"
          size="sm"
          className="w-full mt-2 mb-3"
          onClick={() => window.location.href = "/phone/numbers"}
        >
          <Phone className="mr-2 h-4 w-4" />
          Manage Phone Numbers
        </Button>
      )}
      
      {showPhoneSearch ? (
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
              value={apiKey}
              onChange={(e) => handleInputChange(e.target.value)}
              type="password"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => simulateConnection(
                'twilio', 
                setConnecting, 
                setConnected, 
                connected, 
                onConnect
              )}
            >
              I already have a Twilio account
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Input
            placeholder="Twilio API Key"
            className="mb-1"
            value={apiKey}
            onChange={(e) => handleInputChange(e.target.value)}
            type="password"
          />
          <p className="text-xs text-muted-foreground mb-1">
            Connect your Twilio account to enable SMS and voice functionality.
          </p>
        </div>
      )}
    </MessagingServiceCard>
  );
};

export default TwilioIntegration;
