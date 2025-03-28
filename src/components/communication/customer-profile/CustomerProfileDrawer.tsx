
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CustomerProfile } from '@/types/omnichannel';
import CustomerProfileDetails from './CustomerProfileDetails';
import { X } from 'lucide-react';

interface CustomerProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  customerProfile: CustomerProfile | null;
}

const CustomerProfileDrawer: React.FC<CustomerProfileDrawerProps> = ({ 
  open, 
  onClose,
  customerProfile 
}) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full md:max-w-md overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Customer Profile</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <SheetDescription>
            View detailed information about this customer.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          {customerProfile ? (
            <CustomerProfileDetails profile={customerProfile} />
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground">
              <p>No customer profile available.</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomerProfileDrawer;
