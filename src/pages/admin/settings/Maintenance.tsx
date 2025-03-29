
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const Maintenance = () => {
  return (
    <AdminLayout 
      title="Maintenance Mode" 
      description="Configure maintenance mode settings"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Mode Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  When enabled, all users except administrators will see a maintenance page
                </p>
              </div>
              <Switch id="maintenance-mode" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenance-title">Maintenance Page Title</Label>
              <Input 
                id="maintenance-title"
                defaultValue="We'll be back soon!"
                placeholder="Enter maintenance page title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenance-message">Maintenance Message</Label>
              <Textarea
                id="maintenance-message"
                rows={4}
                defaultValue="We are currently performing scheduled maintenance on our site. Please check back soon."
                placeholder="Enter maintenance message"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected-time">Expected Completion Time</Label>
              <Input
                id="expected-time"
                type="datetime-local"
              />
            </div>

            <div className="pt-4">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Maintenance;
