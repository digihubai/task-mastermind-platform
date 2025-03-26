
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCode, Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Integration = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Integration</h1>
          <p className="text-muted-foreground mt-1">
            Connect and manage third-party integrations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13.143 16.922l-2.501 4.342c-.076.13-.281.057-.274-.098l.086-1.924-3.607 2.13c-.376-.24-.74-.5-1.098-.776l3.135-1.862-1.615-.698c-.07-.03-.077-.128-.013-.165l3.527-2.044-4.024-1.737c-.227-.419-.44-.85-.64-1.292l4.467 1.925-1.427-3.99c.425-.225.86-.429 1.304-.618l1.61 4.498 1.385-3.873c.464-.115.932-.208 1.405-.288l-1.547 4.345 3.262-2.578c.379.043.754.099 1.127.166L13.143 16.922zM21.45 3.16a1.99 1.99 0 00-1.554-.731 1.99 1.99 0 00-1.554.73 1.993 1.993 0 00-.444 1.694c.06.263.156.509.284.731-2.03 1.39-3.646 3.316-4.66 5.52a9.1 9.1 0 00-4.649-.873c-3.647.14-6.887 2.487-8.152 5.916a9.3 9.3 0 00.266 7.232 9.272 9.272 0 005.222 5.208 9.251 9.251 0 007.217.11 9.2 9.2 0 004.935-12.362c-.05-.102-.103-.204-.158-.304a12.18 12.18 0 013.59-3.82 1.989 1.989 0 001.226-1.843 1.99 1.99 0 00-.589-1.408zm-9.393 20.076a7.063 7.063 0 01-8.03-5.698 7.063 7.063 0 115.698-8.03 7.063 7.063 0 012.332 13.728z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Slack</h3>
                  <p className="text-xs text-muted-foreground">Messaging platform</p>
                </div>
              </div>
              
              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Connected</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Send notifications and chat messages to your Slack workspace
            </p>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Configure
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Disconnect
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.848 12.46c.202.037.202.332.001.369-1.907.345-3.015-.778-3.015-1.718 0-.937 1.108-2.062 3.014-1.718.2.036.2.331 0 .367-1.218.221-1.975.798-1.975 1.351 0 .552.757 1.13 1.975 1.349zm-6.634-3.807c-.988-.182-1.902.387-2.032 1.264-.13.876.558 1.733 1.545 1.916.988.182 1.902-.387 2.032-1.263.13-.877-.559-1.734-1.545-1.917zM5.458 12c-.685 0-1.235-.55-1.235-1.234 0-.683.55-1.234 1.235-1.234s1.235.551 1.235 1.234c0 .684-.55 1.234-1.235 1.234z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Zapier</h3>
                  <p className="text-xs text-muted-foreground">Automation platform</p>
                </div>
              </div>
              
              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Connected</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Create automated workflows between apps
            </p>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Configure
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Disconnect
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.32 6l-3.45 11.46c-.24.74-.85 1.57-1.52 1.57-1 0-1.37-1.67-1.67-2.75-.38-1.36-.74-2.64-2.49-2.64-1.38 0-2.39.85-3.2 1.57l-1.11.99V9.7c0-.57-.42-1.15-1.03-1.15-.84 0-1.92.85-2.65 1.57l-1.99 1.94V8.15c0-.57-.4-1.15-1.01-1.15-.83 0-1.92.85-2.65 1.57L1.01 10.8V4.71c0-.57-.39-1.04-1.01-1.04v14.75c0 .58.39 1.04 1.01 1.04l.47-.43v-6.33c.66-.39 1.66-.95 2.26-.95.31 0 .39.12.39.43v6.33c0 .58.4 1.04 1.01 1.04l.47-.43v-6.33c.65-.39 1.66-.95 2.26-.95.31 0 .39.12.39.43v6.33c0 .57.4 1.04 1.01 1.04l.47-.43v-6.33c1.38-1.2 3.35-2.04 4.35-2.04.71 0 .9.53.9 1.23v6.33c0 .57.4 1.04 1.01 1.04l.47-.43v-5.69c1.38-1.14 3.25-2.04 4.35-2.04.65 0 .9.43.9 1.04v6.33c0 .57.4 1.04 1.01 1.04l.47-.43V7.19c.2-.73.68-1.14 1.18-1.14.65 0 .83.57.66 1.04l-3.55 12.98c-.18.65-.9 1.28-1.6 1.28-1.01 0-1.37-1.28-1.62-2.37-.3-1.33-.72-2.87-2.25-2.87-1.25 0-2.19.94-2.89 1.71l-1.3 1.4V14.1c0-.98-.74-1.28-1.12-1.28-.55 0-1.36.49-1.99 1.04L9.85 15V9.7c0-.83-.6-1.28-1.12-1.28-.56 0-1.31.39-1.99 1.04l-2.67 2.46V4.71c0-.79-.59-1.18-1.12-1.18-.82 0-1.88.57-2.64 1.28L1.01 6.11 0 7.19v13.23c0 .58.39 1.04 1.01 1.04h21.29c.59 0 1.01-.43 1.01-1.04V6c0-.58-.27-1.04-.99-1.04z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Google Analytics</h3>
                  <p className="text-xs text-muted-foreground">Analytics platform</p>
                </div>
              </div>
              
              <Badge variant="outline" className="bg-muted text-muted-foreground">Not Connected</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Track user behavior and analytics
            </p>
            
            <Button variant="outline" size="sm" className="w-full">
              <Check size={16} className="mr-2" />
              Connect
            </Button>
          </Card>
        </div>
        
        <Card className="p-6 border border-border/40">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">API Integration</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileCode size={16} />
              <span>Documentation</span>
            </Button>
          </div>
          
          <p className="text-muted-foreground mb-4">
            Use our API to integrate directly with our platform
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">API Key</label>
              <div className="flex gap-2">
                <input type="password" value="••••••••••••••••••••••••••" readOnly className="flex-1 p-2 border rounded-md bg-muted" />
                <Button variant="outline">Show</Button>
                <Button variant="outline">Copy</Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Webhook URL</label>
              <div className="flex gap-2">
                <input type="text" value="https://api.digihubai.com/webhook/user123" readOnly className="flex-1 p-2 border rounded-md" />
                <Button variant="outline">Copy</Button>
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink size={16} />
                <span>View API Usage</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Integration;
