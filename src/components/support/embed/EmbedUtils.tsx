
import React from 'react';

/**
 * Creates a script element that can be used to embed the ticket form in any website
 */
export const createEmbeddableTicketForm = () => {
  const script = document.createElement('script');
  script.innerHTML = `
    (function(w,d,s,o,f,js,fjs){
      w['DigiHub-Widget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
      js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
      js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
    }(window,document,'script','dh','https://your-app-domain.com/embed.js'));
    dh('init', { 
      selector: '#digihub-support-form',
      theme: 'auto',
      requiredFields: { phone: false, company: false },
      optionalFields: { 
        orderNumber: false,
        urgencyLevel: true, 
        preferredContact: false, 
        bestTimeToReach: false
      },
      customTitle: 'Support Request',
      customDescription: 'Submit a new support request and we\'ll get back to you as soon as possible.',
      successTitle: 'Request Submitted',
      successMessage: 'Thank you for contacting support',
      successBodyText: 'Your support request has been submitted successfully. Our team will review it and get back to you as soon as possible.',
      emailNotificationText: 'You will receive updates on your request via email at',
      availableCategories: ['General', 'Technical', 'Billing', 'Feature Request'],
      availableDepartments: ['Support', 'Sales', 'Billing', 'Product', 'Technical']
    });
  `;
  return script;
};
