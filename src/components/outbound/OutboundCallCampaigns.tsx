
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
import { CallCampaign } from '@/services/outboundCallService';

interface OutboundCallCampaignsProps {
  campaigns: CallCampaign[];
  isLoading?: boolean;
}

const OutboundCallCampaigns: React.FC<OutboundCallCampaignsProps> = ({ campaigns, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="bg-muted/40 pb-3">
              <div className="h-6 w-28 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-5 w-16 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[1, 2, 3].map((j) => (
                    <div key={j}>
                      <div className="h-8 w-full bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-muted rounded animate-pulse mt-1"></div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-8 bg-muted rounded animate-pulse"></div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-9 w-full bg-muted rounded animate-pulse"></div>
                  <div className="h-9 w-full bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden">
          <CardHeader className="bg-muted/40 pb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{campaign.name}</h3>
                <Badge 
                  variant={campaign.status === "active" ? "default" : campaign.status === "paused" ? "outline" : "secondary"}
                  className="mt-1"
                >
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
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
                {campaign.status === "active" ? (
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
