
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CustomerTicketForm } from './CustomerTicketForm';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";

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
  optionalFields?: {
    orderNumber?: boolean;
    urgencyLevel?: boolean;
    preferredContact?: boolean;
    bestTimeToReach?: boolean;
    custom?: {[key: string]: boolean};
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
  requiredFields = { phone: false, company: false },
  optionalFields = { orderNumber: false, urgencyLevel: true, preferredContact: false, bestTimeToReach: false, custom: {} }
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
            optionalFields={optionalFields}
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
  const [customFields, setCustomFields] = useState<string[]>([]);
  const [newCustomField, setNewCustomField] = useState('');
  
  const handleChange = (key: keyof EmbeddableTicketFormProps, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };
  
  const toggleOptionalField = (field: string, enabled: boolean) => {
    const currentOptionalFields = settings.optionalFields || {};
    handleChange('optionalFields', { 
      ...currentOptionalFields, 
      [field]: enabled 
    });
  };
  
  const toggleCustomField = (fieldName: string, enabled: boolean) => {
    const currentOptionalFields = settings.optionalFields || {};
    const currentCustom = currentOptionalFields.custom || {};
    
    handleChange('optionalFields', { 
      ...currentOptionalFields, 
      custom: { 
        ...currentCustom, 
        [fieldName]: enabled 
      } 
    });
  };
  
  const addCustomField = () => {
    if (!newCustomField.trim()) return;
    
    const fieldKey = newCustomField.trim().toLowerCase().replace(/\s+/g, '_');
    const currentOptionalFields = settings.optionalFields || {};
    const currentCustom = currentOptionalFields.custom || {};
    
    // Add to custom fields list in state
    setCustomFields([...customFields, newCustomField]);
    
    // Add to form settings
    handleChange('optionalFields', { 
      ...currentOptionalFields, 
      custom: { 
        ...currentCustom, 
        [fieldKey]: true 
      } 
    });
    
    setNewCustomField('');
  };
  
  const removeCustomField = (index: number) => {
    const fieldToRemove = customFields[index];
    const fieldKey = fieldToRemove.toLowerCase().replace(/\s+/g, '_');
    
    // Remove from custom fields list in state
    const updatedCustomFields = customFields.filter((_, i) => i !== index);
    setCustomFields(updatedCustomFields);
    
    // Remove from form settings
    const currentOptionalFields = settings.optionalFields || {};
    const currentCustom = currentOptionalFields.custom || {};
    const { [fieldKey]: _, ...restCustom } = currentCustom;
    
    handleChange('optionalFields', { 
      ...currentOptionalFields, 
      custom: restCustom
    });
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Customize Your Form</h3>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="form-title">Form Title</Label>
          <Input 
            id="form-title"
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
        
        <div>
          <h4 className="font-medium text-sm mb-2">Optional Fields</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="order-number-field"
                checked={settings.optionalFields?.orderNumber || false}
                onCheckedChange={(checked) => toggleOptionalField('orderNumber', checked)}
              />
              <Label htmlFor="order-number-field">Order/Invoice Number</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="urgency-level-field"
                checked={settings.optionalFields?.urgencyLevel || false}
                onCheckedChange={(checked) => toggleOptionalField('urgencyLevel', checked)}
              />
              <Label htmlFor="urgency-level-field">Urgency Level</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="preferred-contact-field"
                checked={settings.optionalFields?.preferredContact || false}
                onCheckedChange={(checked) => toggleOptionalField('preferredContact', checked)}
              />
              <Label htmlFor="preferred-contact-field">Preferred Contact Method</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="best-time-field"
                checked={settings.optionalFields?.bestTimeToReach || false}
                onCheckedChange={(checked) => toggleOptionalField('bestTimeToReach', checked)}
              />
              <Label htmlFor="best-time-field">Best Time to Reach</Label>
            </div>
            
            {/* Custom Fields */}
            {customFields.map((field, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`custom-field-${index}`}
                    checked={true}
                    onCheckedChange={(checked) => {
                      const fieldKey = field.toLowerCase().replace(/\s+/g, '_');
                      toggleCustomField(fieldKey, checked);
                    }}
                  />
                  <Label htmlFor={`custom-field-${index}`}>{field}</Label>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeCustomField(index)}
                >
                  <XCircle className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            
            <div className="pt-2">
              <Label htmlFor="new-custom-field">Add Custom Field</Label>
              <div className="flex mt-1 gap-2">
                <Input
                  id="new-custom-field"
                  placeholder="Field Name"
                  value={newCustomField}
                  onChange={(e) => setNewCustomField(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  onClick={addCustomField}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
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
