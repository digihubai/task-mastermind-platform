
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool, PlusCircle, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BrandVoice = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Brand Voice</h1>
            <p className="text-muted-foreground mt-1">
              Manage and customize your brand's tone and voice
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Voice Profile</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border border-border/40">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <PenTool size={20} className="text-primary" />
                </div>
                <h3 className="font-medium">Company Default</h3>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <span className="text-xs font-medium block mb-1">Tone</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">Professional</Badge>
                  <Badge variant="outline" className="text-xs">Friendly</Badge>
                  <Badge variant="outline" className="text-xs">Helpful</Badge>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium block mb-1">Style</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">Concise</Badge>
                  <Badge variant="outline" className="text-xs">Clear</Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">Edit Profile</Button>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <PenTool size={20} className="text-primary" />
                </div>
                <h3 className="font-medium">Marketing</h3>
              </div>
              <Badge variant="outline">Draft</Badge>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <span className="text-xs font-medium block mb-1">Tone</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">Enthusiastic</Badge>
                  <Badge variant="outline" className="text-xs">Persuasive</Badge>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium block mb-1">Style</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">Engaging</Badge>
                  <Badge variant="outline" className="text-xs">Descriptive</Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">Edit Profile</Button>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Settings size={20} className="text-primary" />
                </div>
                <h3 className="font-medium">Voice Settings</h3>
              </div>
            </div>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <span>Manage Voice Profiles</span>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <span>Import Voice Profile</span>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <span>Export Voice Profile</span>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <span>Test Voice Generator</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default BrandVoice;
