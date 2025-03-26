
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ArrowUpRight } from "lucide-react";

interface CallActivity {
  id: string;
  phone: string;
  status: string;
  duration: string;
  time: string;
  campaign: string;
}

interface OutboundCallActivityProps {
  activities: CallActivity[];
}

const OutboundCallActivity: React.FC<OutboundCallActivityProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Call Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No recent call activities
            </div>
          ) : (
            activities.map((call) => (
              <div key={call.id} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{call.phone}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{call.time}</span>
                      <span>•</span>
                      <span>{call.campaign}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge 
                      variant={
                        call.status === "Answered" ? "default" : 
                        call.status === "Voicemail" ? "secondary" : 
                        "outline"
                      }
                    >
                      {call.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{call.duration}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowUpRight size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OutboundCallActivity;
