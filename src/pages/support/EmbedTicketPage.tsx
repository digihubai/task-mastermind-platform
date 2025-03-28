
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink } from "lucide-react";
import { EmbeddableTicketForm, FormCustomizationInterface } from '@/components/support/EmbeddableTicketForm';

const EmbedTicketPage = () => {
  const { toast } = useToast();
  const [formSettings, setFormSettings] = useState({
    customTitle: "Support Request",
    customDescription: "Submit a new support request and we'll get back to you as soon as possible.",
    compact: false,
    theme: 'auto' as 'light' | 'dark' | 'auto',
    showAiSupportOption: true,
    availableCategories: ["General", "Technical", "Billing", "Feature Request"],
    availableDepartments: ["Support", "Sales", "Billing", "Product"],
    requiredFields: { phone: false, company: false }
  });

  const handleFormSettingsChange = (newSettings: any) => {
    setFormSettings({...formSettings, ...newSettings});
  };
  
  const embedCode = `<div id="digihub-support-form"></div>
<script>
  (function(w,d,s,o,f,js,fjs){
    w['DigiHub-Widget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','dhsupport','https://your-app-domain.com/support-embed.js'));
  dhsupport('init', { 
    selector: '#digihub-support-form',
    title: "${formSettings.customTitle}",
    description: "${formSettings.customDescription}",
    compact: ${formSettings.compact},
    theme: "${formSettings.theme}",
    showAiSupport: ${formSettings.showAiSupportOption},
    categories: ${JSON.stringify(formSettings.availableCategories)},
    departments: ${JSON.stringify(formSettings.availableDepartments)},
    requiredFields: ${JSON.stringify(formSettings.requiredFields)}
  });
</script>`;

  const iframeCode = `<iframe src="${window.location.origin}/support/ticket-form?title=${encodeURIComponent(formSettings.customTitle)}&description=${encodeURIComponent(formSettings.customDescription)}&compact=${formSettings.compact}&theme=${formSettings.theme}" width="100%" height="600" frameborder="0"></iframe>`;
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied",
      description: "The embed code has been copied to your clipboard."
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Embed Support Form</h1>
          <p className="text-muted-foreground mt-1">
            Create an embeddable support form for your website or share a direct link
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Customization</CardTitle>
              </CardHeader>
              <CardContent>
                <FormCustomizationInterface 
                  settings={formSettings}
                  onSettingsChange={handleFormSettingsChange}
                />
              </CardContent>
            </Card>
            
            <Tabs defaultValue="embed">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="embed">Embed Code</TabsTrigger>
                <TabsTrigger value="iframe">iFrame</TabsTrigger>
              </TabsList>
              
              <TabsContent value="embed">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>JavaScript Embed Code</span>
                      <Button variant="outline" size="sm" onClick={() => handleCopyCode(embedCode)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-md">
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-all">
                        {embedCode}
                      </pre>
                    </div>
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Add this code to any HTML page where you want the support form to appear.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="iframe">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>iFrame Embed Code</span>
                      <Button variant="outline" size="sm" onClick={() => handleCopyCode(iframeCode)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-md">
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-all">
                        {iframeCode}
                      </pre>
                    </div>
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Use this iframe code to embed the form on platforms where JavaScript isn't allowed.</p>
                    </div>
                    
                    <Button variant="outline" className="mt-4" asChild>
                      <a href={`/support/ticket-form?title=${encodeURIComponent(formSettings.customTitle)}&description=${encodeURIComponent(formSettings.customDescription)}&compact=${formSettings.compact}&theme=${formSettings.theme}`} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in new tab
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Form Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <EmbeddableTicketForm 
                  {...formSettings}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EmbedTicketPage;
