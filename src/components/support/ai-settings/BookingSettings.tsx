
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";

interface BookingSettingsProps {
  enableBookingButton: boolean;
  setEnableBookingButton: (value: boolean) => void;
  hasCalendarIntegration: boolean;
  setHasCalendarIntegration: (value: boolean) => void;
}

const BookingSettings: React.FC<BookingSettingsProps> = ({
  enableBookingButton,
  setEnableBookingButton,
  hasCalendarIntegration,
  setHasCalendarIntegration
}) => {
  const handleConnectCalendar = () => {
    // Simulating connecting to calendar
    setHasCalendarIntegration(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Meeting Booking Settings</h3>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="enable-booking" className="text-sm font-medium">Enable Meeting Booking</Label>
            <p className="text-xs text-muted-foreground">Allow customers to book meetings with agents</p>
          </div>
          <Switch 
            id="enable-booking" 
            checked={enableBookingButton}
            onCheckedChange={setEnableBookingButton}
          />
        </div>
      </div>

      {enableBookingButton && (
        <div className="mt-4 space-y-4">
          <div className="rounded-md bg-muted p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <CalendarClock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {hasCalendarIntegration 
                    ? "Calendar Connected" 
                    : "Calendar Connection Required"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {hasCalendarIntegration 
                    ? "Your calendar is connected and ready for bookings" 
                    : "Connect your calendar to enable meeting bookings"}
                </p>
              </div>
            </div>
            {!hasCalendarIntegration && (
              <Button 
                className="mt-3 w-full" 
                size="sm"
                onClick={handleConnectCalendar}
              >
                Connect Calendar
              </Button>
            )}
          </div>
          
          {hasCalendarIntegration && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">Connected Calendar Integrations</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Google Calendar sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Outlook Calendar sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Zoom integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>MS Teams integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Google Meet integration</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingSettings;
