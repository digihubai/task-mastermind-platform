
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GeneralTab: React.FC = () => {
  return (
    <Card className="border border-border/40">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">General Settings</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium">Company Information</h3>
                <p className="text-sm text-muted-foreground">Update your company details and branding</p>
              </div>
              <Button variant="outline">Edit</Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium">User Management</h3>
                <p className="text-sm text-muted-foreground">Manage users, roles and permissions</p>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium">Email Templates</h3>
                <p className="text-sm text-muted-foreground">Customize notification and marketing emails</p>
              </div>
              <Button variant="outline">Customize</Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium">Security Settings</h3>
                <p className="text-sm text-muted-foreground">Configure security options and access controls</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium">Billing & Subscription</h3>
                <p className="text-sm text-muted-foreground">Manage payment methods and subscription details</p>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GeneralTab;
