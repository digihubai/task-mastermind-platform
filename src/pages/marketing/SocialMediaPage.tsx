
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, BarChart, PlusCircle, Calendar, MessageSquare, Heart, Repeat } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SocialMediaPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Social Media</h1>
            <p className="text-muted-foreground mt-1">
              Schedule and manage your social media content
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Post</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="font-medium">Product Announcement</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Twitter</Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">Instagram</Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              Excited to announce our latest product feature: AI-powered content generation...
            </p>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Scheduled for Tomorrow</span>
              </div>
              <Badge variant="outline">Ready</Badge>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400 p-2 rounded-full">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="font-medium">Customer Testimonial</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Facebook</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">LinkedIn</Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              Our customers love our platform! Here's what @JaneDoe had to say about their experience...
            </p>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Scheduled for Next Week</span>
              </div>
              <Badge variant="outline">Draft</Badge>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="text-xl font-medium mb-4">Performance</div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Engagement Rate</span>
                  <span className="font-medium">4.2%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Impressions</span>
                  <span className="font-medium">12.5K</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-pink-600">
                    <Heart size={16} />
                    <span className="font-medium">452</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Likes</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-blue-600">
                    <MessageSquare size={16} />
                    <span className="font-medium">48</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Comments</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-green-600">
                    <Repeat size={16} />
                    <span className="font-medium">32</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Shares</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SocialMediaPage;
