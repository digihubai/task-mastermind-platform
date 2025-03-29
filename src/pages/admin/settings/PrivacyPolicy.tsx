
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PrivacyPolicy = () => {
  return (
    <AdminLayout 
      title="Privacy Policy & Terms" 
      description="Manage legal content and compliance settings"
    >
      <Tabs defaultValue="privacy">
        <TabsList className="mb-6">
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy Settings</CardTitle>
              <CardDescription>
                Manage your site's privacy policy content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-privacy">Enable Privacy Policy Page</Label>
                  <p className="text-sm text-muted-foreground">
                    Display a privacy policy page on your site
                  </p>
                </div>
                <Switch id="enable-privacy" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="privacy-content">Privacy Policy Content</Label>
                <Textarea
                  id="privacy-content"
                  rows={12}
                  placeholder="Enter your privacy policy content..."
                  className="min-h-[300px] font-mono text-sm"
                  defaultValue={`# Privacy Policy\n\nLast updated: [Date]\n\n## 1. Introduction\n\nWelcome to [Your Company]. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.\n\n## 2. Information We Collect\n\nWe collect information that you provide directly to us when you:\n- Create an account\n- Use our services\n- Contact customer support\n\n## 3. How We Use Your Information\n\nWe may use the information we collect for various purposes, including to:\n- Provide and maintain our service\n- Notify you about changes to our service\n- Allow you to participate in interactive features\n\n## 4. Disclosure of Data\n\nWe may disclose your information in the following situations:\n- To comply with legal obligations\n- To protect and defend our rights or property\n- To prevent or investigate possible wrongdoing`}
                />
              </div>
              
              <div className="pt-4">
                <Button>Save Privacy Policy</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="terms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service Settings</CardTitle>
              <CardDescription>
                Manage your site's terms of service content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-terms">Enable Terms of Service Page</Label>
                  <p className="text-sm text-muted-foreground">
                    Display a terms of service page on your site
                  </p>
                </div>
                <Switch id="enable-terms" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="terms-content">Terms of Service Content</Label>
                <Textarea
                  id="terms-content"
                  rows={12}
                  placeholder="Enter your terms of service content..."
                  className="min-h-[300px] font-mono text-sm"
                  defaultValue={`# Terms of Service\n\nLast updated: [Date]\n\n## 1. Agreement to Terms\n\nBy accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you do not have permission to access the service.\n\n## 2. Use License\n\nPermission is granted to temporarily use our services for personal, non-commercial purposes only.\n\n## 3. Disclaimer\n\nOur services are provided "as is". We make no warranties, expressed or implied.\n\n## 4. Limitation of Liability\n\nIn no event shall we be liable for any damages arising out of the use or inability to use our services.`}
                />
              </div>
              
              <div className="pt-4">
                <Button>Save Terms of Service</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Settings</CardTitle>
              <CardDescription>
                Configure privacy compliance settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-cookie">Enable Cookie Consent Banner</Label>
                  <p className="text-sm text-muted-foreground">
                    Display a cookie consent banner for visitors
                  </p>
                </div>
                <Switch id="enable-cookie" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-gdpr">GDPR Compliance</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable GDPR-specific compliance features
                  </p>
                </div>
                <Switch id="enable-gdpr" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-ccpa">CCPA Compliance</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable California Consumer Privacy Act features
                  </p>
                </div>
                <Switch id="enable-ccpa" defaultChecked />
              </div>
              
              <div className="pt-4">
                <Button>Save Compliance Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default PrivacyPolicy;
