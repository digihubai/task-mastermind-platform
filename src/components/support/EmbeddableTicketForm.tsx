
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CustomerTicketForm } from './CustomerTicketForm';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface EmbeddableTicketFormProps {
  compact?: boolean;
  customTitle?: string;
  customDescription?: string;
  departmentId?: string;
  theme?: 'light' | 'dark' | 'auto';
  availableCategories?: string[];
  availableDepartments?: string[];
  showAiSupportOption?: boolean;
  requiredFields?: {
    phone?: boolean;
    company?: boolean;
  };
}

export const EmbeddableTicketForm: React.FC<EmbeddableTicketFormProps> = ({ 
  compact = false,
  customTitle = "Support Request",
  customDescription = "Submit a new support request and we'll get back to you as soon as possible.",
  departmentId,
  theme = 'auto',
  availableCategories,
  availableDepartments,
  showAiSupportOption = true,
  requiredFields = { phone: false, company: false }
}) => {
  const [submitted, setSubmitted] = useState(false);
  
  return (
    <div className={`embeddable-form ${compact ? 'max-w-md' : 'max-w-2xl'} mx-auto`} 
         data-theme={theme}>
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>{customTitle}</CardTitle>
          <CardDescription>{customDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerTicketForm 
            onSubmitSuccess={() => setSubmitted(true)}
            departmentId={departmentId}
            availableCategories={availableCategories}
            availableDepartments={availableDepartments}
            showAiSupportOption={showAiSupportOption}
            requiredFields={requiredFields}
            compact={compact}
          />
        </CardContent>
      </Card>
    </div>
  );
};

// Form Customization Interface with more options
export const FormCustomizationInterface: React.FC<{
  settings: Partial<EmbeddableTicketFormProps>;
  onSettingsChange: (settings: Partial<EmbeddableTicketFormProps>) => void;
}> = ({ settings, onSettingsChange }) => {
  const handleChange = (key: keyof EmbeddableTicketFormProps, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Customize Your Form</h3>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="form-title">Form Title</Label>
          <input 
            id="form-title"
            type="text" 
            className="w-full p-2 border rounded mt-1"
            value={settings.customTitle || 'Support Request'} 
            onChange={(e) => handleChange('customTitle', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="form-description">Form Description</Label>
          <textarea 
            id="form-description"
            className="w-full p-2 border rounded mt-1" 
            rows={2}
            value={settings.customDescription || 'Submit a new support request and we\'ll get back to you as soon as possible.'} 
            onChange={(e) => handleChange('customDescription', e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="compact-mode"
            checked={settings.compact || false}
            onCheckedChange={(checked) => handleChange('compact', checked)}
          />
          <Label htmlFor="compact-mode">Compact Mode</Label>
        </div>
        
        <div>
          <Label htmlFor="form-theme">Theme</Label>
          <select
            id="form-theme"
            className="w-full p-2 border rounded mt-1"
            value={settings.theme || 'auto'}
            onChange={(e) => handleChange('theme', e.target.value as 'light' | 'dark' | 'auto')}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (Use site's theme)</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="ai-support-option"
            checked={settings.showAiSupportOption !== false}
            onCheckedChange={(checked) => handleChange('showAiSupportOption', checked)}
          />
          <Label htmlFor="ai-support-option">Show "Try AI support first" option</Label>
        </div>
        
        <div>
          <h4 className="font-medium text-sm mb-2">Required Fields</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="phone-required"
                checked={settings.requiredFields?.phone || false}
                onCheckedChange={(checked) => 
                  handleChange('requiredFields', { ...settings.requiredFields, phone: checked })
                }
              />
              <Label htmlFor="phone-required">Phone Number Required</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="company-required"
                checked={settings.requiredFields?.company || false}
                onCheckedChange={(checked) => 
                  handleChange('requiredFields', { ...settings.requiredFields, company: checked })
                }
              />
              <Label htmlFor="company-required">Company Name Required</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export a function that can be used to embed this form in any website
export const createEmbeddableTicketForm = () => {
  const script = document.createElement('script');
  script.innerHTML = `
    (function(w,d,s,o,f,js,fjs){
      w['DigiHub-Widget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
      js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
      js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
    }(window,document,'script','dh','https://your-app-domain.com/embed.js'));
    dh('init', { selector: '#digihub-support-form' });
  `;
  return script;
};
