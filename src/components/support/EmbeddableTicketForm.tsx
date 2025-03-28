
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CustomerTicketForm } from './CustomerTicketForm';

interface EmbeddableTicketFormProps {
  compact?: boolean;
  customTitle?: string;
  customDescription?: string;
  departmentId?: string;
  theme?: 'light' | 'dark' | 'auto';
}

export const EmbeddableTicketForm: React.FC<EmbeddableTicketFormProps> = ({ 
  compact = false,
  customTitle = "Support Request",
  customDescription = "Submit a new support request and we'll get back to you as soon as possible.",
  departmentId,
  theme = 'auto'
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
          />
        </CardContent>
      </Card>
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
