
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from '@/components/ui/switch';
import { PlusCircle, XCircle } from "lucide-react";
import { EmbeddableTicketFormProps } from '../EmbeddableTicketForm';

interface FormCustomizationInterfaceProps {
  settings: Partial<EmbeddableTicketFormProps>;
  onSettingsChange: (settings: Partial<EmbeddableTicketFormProps>) => void;
}

export const FormCustomizationInterface: React.FC<FormCustomizationInterfaceProps> = ({ settings, onSettingsChange }) => {
  const [customFields, setCustomFields] = useState<string[]>([]);
  const [newCustomField, setNewCustomField] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [departmentInput, setDepartmentInput] = useState('');
  
  // Initialize custom fields from settings
  useEffect(() => {
    if (settings.optionalFields?.custom) {
      const fieldNames = Object.keys(settings.optionalFields.custom).map(key => {
        // Convert field_name back to "Field Name" format
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      });
      setCustomFields(fieldNames);
    }
  }, []);
  
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

  const addCategory = () => {
    if (!categoryInput.trim()) return;
    
    const currentCategories = settings.availableCategories || [];
    if (!currentCategories.includes(categoryInput)) {
      handleChange('availableCategories', [...currentCategories, categoryInput]);
      setCategoryInput('');
    }
  };

  const removeCategory = (index: number) => {
    const currentCategories = settings.availableCategories || [];
    const updatedCategories = [...currentCategories];
    updatedCategories.splice(index, 1);
    handleChange('availableCategories', updatedCategories);
  };

  const addDepartment = () => {
    if (!departmentInput.trim()) return;
    
    const currentDepartments = settings.availableDepartments || [];
    if (!currentDepartments.includes(departmentInput)) {
      handleChange('availableDepartments', [...currentDepartments, departmentInput]);
      setDepartmentInput('');
    }
  };

  const removeDepartment = (index: number) => {
    const currentDepartments = settings.availableDepartments || [];
    const updatedDepartments = [...currentDepartments];
    updatedDepartments.splice(index, 1);
    handleChange('availableDepartments', updatedDepartments);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Customize Your Form</h3>
      
      <div className="space-y-4">
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
        
        {/* Success Message Customization - Expanded */}
        <div className="border p-4 rounded-md">
          <h4 className="font-medium text-sm mb-2">Success Message Customization</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="success-title">Success Title</Label>
              <Input 
                id="success-title"
                value={settings.successTitle || 'Request Submitted'} 
                onChange={(e) => handleChange('successTitle', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="success-message">Success Subtitle</Label>
              <Input 
                id="success-message"
                value={settings.successMessage || 'Thank you for contacting support'} 
                onChange={(e) => handleChange('successMessage', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="success-body-text">Success Body Text</Label>
              <textarea 
                id="success-body-text"
                className="w-full p-2 border rounded mt-1" 
                rows={2}
                value={settings.successBodyText || 'Your support request has been submitted successfully. Our team will review it and get back to you as soon as possible.'} 
                onChange={(e) => handleChange('successBodyText', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email-notification-text">Email Notification Text</Label>
              <Input 
                id="email-notification-text"
                value={settings.emailNotificationText || 'You will receive updates on your request via email at'} 
                onChange={(e) => handleChange('emailNotificationText', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories Customization */}
        <div className="border p-4 rounded-md">
          <h4 className="font-medium text-sm mb-2">Available Categories</h4>
          <div className="space-y-2">
            {(settings.availableCategories || []).map((category, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>{category}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeCategory(index)}
                >
                  <XCircle className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <div className="pt-2">
              <Label htmlFor="new-category">Add Category</Label>
              <div className="flex mt-1 gap-2">
                <Input
                  id="new-category"
                  placeholder="Category Name"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  onClick={addCategory}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Departments Customization */}
        <div className="border p-4 rounded-md">
          <h4 className="font-medium text-sm mb-2">Available Departments</h4>
          <div className="space-y-2">
            {(settings.availableDepartments || []).map((department, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>{department}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeDepartment(index)}
                >
                  <XCircle className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <div className="pt-2">
              <Label htmlFor="new-department">Add Department</Label>
              <div className="flex mt-1 gap-2">
                <Input
                  id="new-department"
                  placeholder="Department Name"
                  value={departmentInput}
                  onChange={(e) => setDepartmentInput(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  onClick={addDepartment}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
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
                checked={settings.optionalFields?.urgencyLevel !== false}
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
