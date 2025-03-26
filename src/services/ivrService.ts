
import { useToast } from "@/hooks/use-toast";

interface IVRMenu {
  id: string;
  name: string;
  description: string;
  options: IVROption[];
}

interface IVROption {
  key: string;
  action: 'transfer' | 'submenu' | 'voicemail' | 'message';
  destination?: string;
  message?: string;
}

interface PhoneNumber {
  id: string;
  number: string;
  label: string;
  country: string;
  type: 'local' | 'tollfree' | 'mobile';
  active: boolean;
}

export const useIVRMenus = () => {
  const { toast } = useToast();
  
  const defaultMenus: IVRMenu[] = [
    {
      id: "main",
      name: "Main Menu",
      description: "Primary menu for incoming calls",
      options: [
        { key: "1", action: "transfer", destination: "Sales" },
        { key: "2", action: "transfer", destination: "Support" },
        { key: "3", action: "submenu", destination: "submenu1" },
        { key: "4", action: "voicemail" }
      ]
    },
    {
      id: "submenu1",
      name: "Hours & Location",
      description: "Submenu for hours and location info",
      options: [
        { key: "1", action: "message", message: "We are open Monday to Friday, 9 AM to 5 PM." },
        { key: "2", action: "message", message: "Our office is located at 123 Business Street, Suite 100." },
        { key: "0", action: "submenu", destination: "main" }
      ]
    }
  ];
  
  const saveMenu = (menu: IVRMenu) => {
    console.log('Saving IVR menu:', menu);
    toast({
      title: "IVR Menu Saved",
      description: `"${menu.name}" has been successfully saved.`
    });
    return true;
  };
  
  const testMenu = (menuId: string) => {
    console.log('Testing IVR menu:', menuId);
    toast({
      title: "Test Call Initiated",
      description: "A test call has been initiated to verify your IVR flow."
    });
    return true;
  };
  
  return {
    menus: defaultMenus,
    saveMenu,
    testMenu
  };
};

export const usePhoneNumbers = () => {
  const { toast } = useToast();
  
  const numbers: PhoneNumber[] = [
    {
      id: "1",
      number: "+1 (555) 123-4567",
      label: "Main Office",
      country: "United States",
      type: "local",
      active: true
    },
    {
      id: "2",
      number: "+1 (800) 555-1234",
      label: "Sales Hotline",
      country: "United States",
      type: "tollfree",
      active: true
    },
    {
      id: "3",
      number: "+1 (555) 987-6543",
      label: "Support",
      country: "United States",
      type: "local",
      active: false
    }
  ];
  
  const purchaseNumber = async (
    country: string, 
    areaCode: string, 
    type: 'local' | 'tollfree' | 'mobile' = 'local'
  ) => {
    // This would actually call the Twilio API in a real app
    console.log('Purchasing number:', { country, areaCode, type });
    
    // Simulate API call
    return new Promise<PhoneNumber>((resolve) => {
      setTimeout(() => {
        const newNumber = {
          id: Math.random().toString(),
          number: `+1 (${areaCode}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
          label: "New Number",
          country,
          type,
          active: true
        };
        
        toast({
          title: "Number Purchased",
          description: `Successfully purchased ${newNumber.number}`
        });
        
        resolve(newNumber);
      }, 2000);
    });
  };
  
  const toggleNumberStatus = (id: string) => {
    const number = numbers.find(n => n.id === id);
    if (number) {
      number.active = !number.active;
      toast({
        title: number.active ? "Number Activated" : "Number Deactivated",
        description: `${number.number} has been ${number.active ? 'activated' : 'deactivated'}.`
      });
    }
    return true;
  };
  
  return {
    numbers,
    purchaseNumber,
    toggleNumberStatus
  };
};
