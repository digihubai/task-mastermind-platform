
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CheckoutRegistration = () => {
  return (
    <AdminLayout 
      title="Checkout & Registration" 
      description="Configure checkout process and user registration settings"
    >
      <Tabs defaultValue="registration">
        <TabsList className="mb-6">
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="checkout">Checkout</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="registration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Registration Settings</CardTitle>
              <CardDescription>
                Configure how users register on your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allow-registration">Allow New Registrations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable new user registrations
                  </p>
                </div>
                <Switch id="allow-registration" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-verification">Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Require email verification for new accounts
                  </p>
                </div>
                <Switch id="email-verification" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="automatic-approval">Automatic Account Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically approve new user accounts
                  </p>
                </div>
                <Switch id="automatic-approval" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-role">Default User Role</Label>
                <select 
                  id="default-role" 
                  className="w-full p-2 border rounded-md"
                >
                  <option value="subscriber">Subscriber</option>
                  <option value="contributor">Contributor</option>
                  <option value="author">Author</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="checkout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Checkout Process Settings</CardTitle>
              <CardDescription>
                Configure the checkout experience for your customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="guest-checkout">Allow Guest Checkout</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable purchasing without creating an account
                  </p>
                </div>
                <Switch id="guest-checkout" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="tax-calculation">Automatic Tax Calculation</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically calculate taxes based on location
                  </p>
                </div>
                <Switch id="tax-calculation" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <select 
                  id="currency" 
                  className="w-full p-2 border rounded-md"
                >
                  <option value="usd">USD ($)</option>
                  <option value="eur">EUR (€)</option>
                  <option value="gbp">GBP (£)</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button>Save Checkout Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Configure payment providers and options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Stripe</div>
                  </div>
                  <Switch id="enable-stripe" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">PayPal</div>
                  </div>
                  <Switch id="enable-paypal" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Credit Cards</div>
                  </div>
                  <Switch id="enable-cc" defaultChecked />
                </div>
                
                <div className="pt-4">
                  <Button>Save Payment Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default CheckoutRegistration;
