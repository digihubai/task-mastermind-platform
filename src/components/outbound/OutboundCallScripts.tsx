
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  MoreHorizontal, 
  Plus, 
  Users, 
  CalendarClock, 
  MessageSquare, 
  VoicemailIcon
} from "lucide-react";
import { CallScript } from "@/services/outboundCallService";

interface OutboundCallScriptsProps {
  scripts: CallScript[];
}

const OutboundCallScripts: React.FC<OutboundCallScriptsProps> = ({ scripts }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Call Scripts</CardTitle>
        <Button size="sm" className="flex gap-1">
          <Plus size={14} />
          New Script
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scripts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No call scripts available
            </div>
          ) : (
            scripts.map((script) => (
              <div key={script.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{script.name}</p>
                    <p className="text-sm text-muted-foreground">{script.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>Edited {script.lastEdited}</span>
                      <span>•</span>
                      <span>{script.type}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={18} />
                </Button>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Script Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "Lead Qualification", icon: <Users size={18} /> },
              { name: "Appointment Setting", icon: <CalendarClock size={18} /> },
              { name: "Feedback Collection", icon: <MessageSquare size={18} /> },
              { name: "Event Invitation", icon: <FileText size={18} /> },
              { name: "Voicemail Script", icon: <VoicemailIcon size={18} /> },
              { name: "Custom Script", icon: <Plus size={18} /> }
            ].map((template, i) => (
              <div key={i} className="p-3 border rounded-md flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {template.icon}
                </div>
                <span className="text-sm font-medium">{template.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutboundCallScripts;
