
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Channels {
  website: boolean;
  email: boolean;
  whatsapp: boolean;
  messenger: boolean;
  telegram: boolean;
  slack: boolean;
  sms: boolean;
  instagram: boolean;
  twitter: boolean;
  viber: boolean;
  line: boolean;
  wechat: boolean;
}

interface ChannelSettingsProps {
  channels: Channels;
  setChannels: (channels: Channels) => void;
}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({ channels, setChannels }) => {
  const handleChannelChange = (channel: keyof Channels) => (checked: boolean) => {
    setChannels({ ...channels, [channel]: checked });
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Channels</h3>
      <p className="text-sm text-muted-foreground">Select which channels the AI assistant should monitor</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="website">Website Chat</Label>
          <Switch 
            id="website" 
            checked={channels.website} 
            onCheckedChange={handleChannelChange("website")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="email">Email</Label>
          <Switch 
            id="email" 
            checked={channels.email} 
            onCheckedChange={handleChannelChange("email")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Switch 
            id="whatsapp" 
            checked={channels.whatsapp} 
            onCheckedChange={handleChannelChange("whatsapp")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="messenger">Facebook Messenger</Label>
          <Switch 
            id="messenger" 
            checked={channels.messenger} 
            onCheckedChange={handleChannelChange("messenger")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="telegram">Telegram</Label>
          <Switch 
            id="telegram" 
            checked={channels.telegram} 
            onCheckedChange={handleChannelChange("telegram")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="slack">Slack</Label>
          <Switch 
            id="slack" 
            checked={channels.slack} 
            onCheckedChange={handleChannelChange("slack")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="sms">SMS</Label>
          <Switch 
            id="sms" 
            checked={channels.sms} 
            onCheckedChange={handleChannelChange("sms")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="instagram">Instagram</Label>
          <Switch 
            id="instagram" 
            checked={channels.instagram || false} 
            onCheckedChange={handleChannelChange("instagram")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="twitter">Twitter/X</Label>
          <Switch 
            id="twitter" 
            checked={channels.twitter || false} 
            onCheckedChange={handleChannelChange("twitter")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="viber">Viber</Label>
          <Switch 
            id="viber" 
            checked={channels.viber || false} 
            onCheckedChange={handleChannelChange("viber")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="line">LINE</Label>
          <Switch 
            id="line" 
            checked={channels.line || false} 
            onCheckedChange={handleChannelChange("line")} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="wechat">WeChat</Label>
          <Switch 
            id="wechat" 
            checked={channels.wechat || false} 
            onCheckedChange={handleChannelChange("wechat")} 
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelSettings;
