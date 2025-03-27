
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  VoicemailIcon, 
  XCircle 
} from "lucide-react";

const OutboundCallAnalytics: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Total Calls</p>
              <p className="text-3xl font-semibold mt-1">1,248</p>
              <div className="flex items-center text-green-600 text-sm mt-2">
                <ArrowUp size={14} className="mr-1" />
                <span>12% from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Answer Rate</p>
              <p className="text-3xl font-semibold mt-1">32%</p>
              <div className="flex items-center text-green-600 text-sm mt-2">
                <ArrowUp size={14} className="mr-1" />
                <span>5% from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Avg. Call Duration</p>
              <p className="text-3xl font-semibold mt-1">2m 48s</p>
              <div className="flex items-center text-green-600 text-sm mt-2">
                <ArrowUp size={14} className="mr-1" />
                <span>18s from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-3xl font-semibold mt-1">14%</p>
              <div className="flex items-center text-red-600 text-sm mt-2">
                <ArrowDown size={14} className="mr-1" />
                <span>2% from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Call Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <span className="text-sm">Answered</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">398</span>
                  <span className="text-sm text-muted-foreground">32%</span>
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{ width: '32%' }} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <VoicemailIcon size={14} className="text-blue-500" />
                  <span className="text-sm">Voicemail</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">274</span>
                  <span className="text-sm text-muted-foreground">22%</span>
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2" style={{ width: '22%' }} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <XCircle size={14} className="text-amber-500" />
                  <span className="text-sm">No Answer</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">461</span>
                  <span className="text-sm text-muted-foreground">37%</span>
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="bg-amber-500 rounded-full h-2" style={{ width: '37%' }} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <XCircle size={14} className="text-red-500" />
                  <span className="text-sm">Busy/Failed</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">115</span>
                  <span className="text-sm text-muted-foreground">9%</span>
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="bg-red-500 rounded-full h-2" style={{ width: '9%' }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Best Calling Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">10:00 AM - 12:00 PM</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">43% Answer Rate</span>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{ width: '43%' }} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">2:00 PM - 4:00 PM</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">38% Answer Rate</span>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{ width: '38%' }} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">4:00 PM - 6:00 PM</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">35% Answer Rate</span>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{ width: '35%' }} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">8:00 AM - 10:00 AM</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">28% Answer Rate</span>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{ width: '28%' }} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">6:00 PM - 8:00 PM</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">18% Answer Rate</span>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{ width: '18%' }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                name: "Lead Follow-up", 
                calls: 248, 
                answered: 92, 
                answerRate: 37, 
                conversions: 28, 
                conversionRate: 11,
                trend: "up" 
              },
              { 
                name: "Customer Feedback", 
                calls: 120, 
                answered: 45, 
                answerRate: 38, 
                conversions: 22, 
                conversionRate: 18,
                trend: "up" 
              },
              { 
                name: "Product Announcement", 
                calls: 215, 
                answered: 58, 
                answerRate: 27, 
                conversions: 12, 
                conversionRate: 6,
                trend: "down" 
              }
            ].map((campaign, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">{campaign.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{campaign.calls} calls</span>
                    <span>•</span>
                    <span>{campaign.answered} answered</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Answer Rate</p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{campaign.answerRate}%</span>
                      <div className={`flex items-center text-xs ${campaign.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {campaign.trend === 'up' ? (
                          <ArrowUp size={12} className="mr-0.5" />
                        ) : (
                          <ArrowDown size={12} className="mr-0.5" />
                        )}
                        <span>3%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{campaign.conversionRate}%</span>
                      <div className={`flex items-center text-xs ${campaign.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {campaign.trend === 'up' ? (
                          <ArrowUp size={12} className="mr-0.5" />
                        ) : (
                          <ArrowDown size={12} className="mr-0.5" />
                        )}
                        <span>2%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OutboundCallAnalytics;
