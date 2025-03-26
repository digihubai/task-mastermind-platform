
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

const AdminAffiliates = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Affiliates</h1>
          <p className="text-muted-foreground mt-1">
            Manage affiliate program
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Affiliate Management</h3>
                <p className="text-xs text-muted-foreground">Manage affiliate users and payouts</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminAffiliates;
