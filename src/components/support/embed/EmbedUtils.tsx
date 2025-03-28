
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
      }
    });
  `;
  return script;
};
