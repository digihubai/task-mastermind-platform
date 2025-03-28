
import React from "react";
import { Input } from "@/components/ui/input";

interface TicketCustomFieldsProps {
  customFields: { [key: string]: string };
  optionalFields: { custom?: { [key: string]: boolean } };
  onChange: (key: string, value: string) => void;
}

export const TicketCustomFields: React.FC<TicketCustomFieldsProps> = ({ 
  customFields,
  optionalFields,
  onChange
}) => {
  if (!optionalFields.custom || Object.keys(optionalFields.custom).length === 0) {
    return null;
  }

  return (
    <>
      {Object.keys(optionalFields.custom).map(key => {
        if (optionalFields.custom && optionalFields.custom[key]) {
          const fieldName = key.replace(/_/g, ' ');
          const displayName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
          
          return (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium mb-1">
                {displayName}
              </label>
              <Input
                id={key}
                placeholder={`Enter ${displayName.toLowerCase()}`}
                value={customFields[key] || ''}
                onChange={(e) => onChange(key, e.target.value)}
              />
            </div>
          );
        }
        return null;
      })}
    </>
  );
};
