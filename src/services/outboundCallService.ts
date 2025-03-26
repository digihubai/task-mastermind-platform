
import { useToast } from "@/hooks/use-toast";

interface CallCampaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Scheduled';
  calls: number;
  completed: number;
  answered: number;
  progress: number;
  scheduled: string;
}

interface CallActivity {
  id: string;
  phone: string;
  status: 'Answered' | 'No Answer' | 'Voicemail' | 'Busy';
  duration: string;
  time: string;
  campaign: string;
}

interface ContactList {
  id: string;
  name: string;
  count: number;
  lastUpdated: string;
  status: 'Active' | 'Inactive';
}

interface CallScript {
  id: string;
  name: string;
  description: string;
  lastEdited: string;
  type: 'Interactive' | 'Text-to-Speech';
}

export const useTwilioConnection = () => {
  const { toast } = useToast();
  
  const connectTwilio = (apiKey: string, accountSid: string) => {
    // This would actually connect to Twilio in a real app
    console.log('Connecting to Twilio with:', apiKey, accountSid);
    
    // Simulate connection success
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        toast({
          title: "Twilio Connected",
          description: "Your Twilio account has been successfully connected.",
        });
        resolve(true);
      }, 1500);
    });
  };
  
  return { connectTwilio };
};

export const useCampaigns = () => {
  const campaigns: CallCampaign[] = [
    {
      id: "1",
      name: "Lead Follow-up",
      status: "Active",
      calls: 248,
      completed: 183,
      answered: 76,
      progress: 74,
      scheduled: "Daily at 10:00 AM"
    },
    {
      id: "2",
      name: "Customer Feedback",
      status: "Paused",
      calls: 120,
      completed: 85,
      answered: 42,
      progress: 71,
      scheduled: "Mon, Wed, Fri at 2:00 PM"
    },
    {
      id: "3",
      name: "Appointment Reminders",
      status: "Scheduled",
      calls: 0,
      completed: 0,
      answered: 0,
      progress: 0,
      scheduled: "Starting tomorrow at 9:00 AM"
    }
  ];
  
  const toggleCampaignStatus = (id: string) => {
    console.log(`Toggling campaign status for ID: ${id}`);
    return true;
  };
  
  const createCampaign = (data: Partial<CallCampaign>) => {
    console.log('Creating new campaign:', data);
    return { ...data, id: Math.random().toString() };
  };
  
  return { campaigns, toggleCampaignStatus, createCampaign };
};

export const useCallActivity = () => {
  const activities: CallActivity[] = [
    { id: "1", phone: "+1 (555) 123-4567", status: "Answered", duration: "2m 14s", time: "10 minutes ago", campaign: "Lead Follow-up" },
    { id: "2", phone: "+1 (555) 234-5678", status: "No Answer", duration: "0s", time: "12 minutes ago", campaign: "Lead Follow-up" },
    { id: "3", phone: "+1 (555) 345-6789", status: "Voicemail", duration: "32s", time: "15 minutes ago", campaign: "Lead Follow-up" },
    { id: "4", phone: "+1 (555) 456-7890", status: "Answered", duration: "4m 02s", time: "20 minutes ago", campaign: "Customer Feedback" },
    { id: "5", phone: "+1 (555) 567-8901", status: "Busy", duration: "0s", time: "25 minutes ago", campaign: "Customer Feedback" }
  ];
  
  return { activities };
};

export const useContactLists = () => {
  const contactLists: ContactList[] = [
    { id: "1", name: "Recent Leads", count: 124, lastUpdated: "Today", status: "Active" },
    { id: "2", name: "Current Customers", count: 532, lastUpdated: "Yesterday", status: "Active" },
    { id: "3", name: "Event Attendees", count: 89, lastUpdated: "Oct 15, 2023", status: "Inactive" }
  ];
  
  const createContactList = (data: Partial<ContactList>) => {
    console.log('Creating new contact list:', data);
    return { ...data, id: Math.random().toString() };
  };
  
  const importContacts = (fileOrSource: string) => {
    console.log('Importing contacts from:', fileOrSource);
    return true;
  };
  
  return { contactLists, createContactList, importContacts };
};

export const useCallScripts = () => {
  const scripts: CallScript[] = [
    { 
      id: "1",
      name: "Lead Qualification", 
      description: "Script to qualify new leads and schedule a follow-up call", 
      lastEdited: "2 days ago",
      type: "Interactive"
    },
    { 
      id: "2",
      name: "Product Introduction", 
      description: "Introduction to our product features and benefits", 
      lastEdited: "1 week ago",
      type: "Text-to-Speech"
    },
    { 
      id: "3",
      name: "Appointment Reminder", 
      description: "Reminder for upcoming appointments with confirmation", 
      lastEdited: "2 weeks ago",
      type: "Interactive"
    }
  ];
  
  const createScript = (data: Partial<CallScript>) => {
    console.log('Creating new script:', data);
    return { ...data, id: Math.random().toString() };
  };
  
  return { scripts, createScript };
};
