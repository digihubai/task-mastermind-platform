
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Copy, BarChart3, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";

const Affiliates = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Affiliates</h1>
          <p className="text-muted-foreground mt-1">
            Manage your affiliate program and track referrals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <h3 className="text-2xl font-semibold">126</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <h3 className="text-2xl font-semibold">$1,245.00</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <DollarSign size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Payout</p>
                <h3 className="text-2xl font-semibold">$245.00</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-amber-100 p-2 rounded-full">
                <BarChart3 size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <h3 className="text-2xl font-semibold">12.5%</h3>
              </div>
            </div>
          </Card>
        </div>
        
        <Card className="p-6 border border-border/40">
          <h3 className="text-lg font-medium mb-4">Your Affiliate Link</h3>
          <div className="flex gap-2 mb-6">
            <Input value="https://digihubai.com/?ref=user123" readOnly className="flex-1" />
            <Button variant="outline" className="flex items-center gap-2">
              <Copy size={16} />
              <span>Copy</span>
            </Button>
          </div>
          
          <h4 className="text-sm font-medium mb-2">Promotion Materials</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">Social Media Kit</Button>
            <Button variant="outline" className="justify-start">Banner Ads</Button>
            <Button variant="outline" className="justify-start">Email Templates</Button>
          </div>
        </Card>
        
        <Card className="p-6 border border-border/40">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Recent Referrals</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
                <div>
                  <p className="font-medium">User1{i}@example.com</p>
                  <p className="text-xs text-muted-foreground">Registered {i} day{i > 1 ? 's' : ''} ago</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">${i * 15}.00</p>
                  <p className="text-xs">Pro Plan</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Affiliates;
