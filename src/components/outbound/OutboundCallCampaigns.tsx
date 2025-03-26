
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal,
  Play,
  PauseCircle,
  Settings,
  Clock
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  status: string;
  calls: number;
  completed: number;
  answered: number;
  progress: number;
  scheduled: string;
}

interface OutboundCallCampaignsProps {
  campaigns: Campaign[];
}

const OutboundCallCampaigns: React.FC<OutboundCallCampaignsProps> = ({ campaigns }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden">
          <CardHeader className="bg-muted/40 pb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{campaign.name}</h3>
                <Badge 
                  variant={campaign.status === "Active" ? "default" : campaign.status === "Paused" ? "outline" : "secondary"}
                  className="mt-1"
                >
                  {campaign.status}
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={18} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-semibold">{campaign.calls}</p>
                  <p className="text-xs text-muted-foreground">Total Calls</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">{campaign.completed}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">{campaign.answered}</p>
                  <p className="text-xs text-muted-foreground">Answered</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span>{campaign.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={14} />
                <span>{campaign.scheduled}</span>
              </div>
              
              <div className="flex gap-2">
                {campaign.status === "Active" ? (
                  <Button variant="outline" size="sm" className="flex-1">
                    <PauseCircle size={14} className="mr-1.5" /> Pause
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play size={14} className="mr-1.5" /> Start
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings size={14} className="mr-1.5" /> Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OutboundCallCampaigns;
