
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock, DollarSign, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface TaskTimerProps {
  taskId: number;
  taskName: string;
  projectName: string;
}

const TaskTimer = ({ taskId, taskName, projectName }: TaskTimerProps) => {
  // Hooks
  const { toast } = useToast();
  
  // State
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [billable, setBillable] = useState(true);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Effects
  useEffect(() => {
    let interval: number | null = null;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);
  
  // Helper Functions
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateBillableAmount = () => {
    if (!billable) return 0;
    const hours = timeElapsed / 3600;
    return hours * hourlyRate;
  };
  
  // Event Handlers
  const handleStartTimer = () => {
    setIsRunning(true);
    setStartTime(new Date());
    
    toast({
      title: "Timer started",
      description: `Tracking time for "${taskName}" - ${projectName}`,
    });
  };
  
  const handleStopTimer = () => {
    setIsRunning(false);
    setIsDialogOpen(true);
  };

  const handleTimeSubmit = () => {
    const endTime = new Date();
    const billableAmount = calculateBillableAmount();
    
    // Here you would typically save the time entry to your database
    console.log({
      taskId,
      taskName,
      projectName,
      startTime,
      endTime,
      duration: timeElapsed,
      billable,
      hourlyRate,
      billableAmount: billable ? billableAmount : 0
    });
    
    toast({
      title: "Time entry saved",
      description: `Recorded ${formatTime(timeElapsed)}${billable ? ` ($${billableAmount.toFixed(2)})` : ''}`,
    });
    
    setTimeElapsed(0);
    setIsDialogOpen(false);
  };
  
  // Render Helpers
  const renderTimerControls = () => {
    if (isRunning) {
      return (
        <>
          <span className="text-sm font-medium">{formatTime(timeElapsed)}</span>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
            onClick={handleStopTimer}
          >
            <Pause size={14} className="mr-1" />
            Stop
          </Button>
        </>
      );
    }
    
    return (
      <Button 
        variant="outline" 
        size="sm"
        className="h-8"
        onClick={handleStartTimer}
      >
        <Play size={14} className="mr-1" />
        Track Time
      </Button>
    );
  };

  const renderTimeEntryDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Time Entry Details</DialogTitle>
          <DialogDescription>
            Add details to your time entry for "{taskName}"
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span className="font-medium">Duration:</span>
            </div>
            <span className="text-lg">{formatTime(timeElapsed)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="billable" className="flex items-center gap-2">
                <DollarSign size={18} />
                <span>Billable</span>
              </Label>
            </div>
            <Switch
              id="billable"
              checked={billable}
              onCheckedChange={setBillable}
            />
          </div>
          
          {billable && (
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="hourlyRate" className="text-right">
                Hourly Rate ($):
              </Label>
              <Input
                id="hourlyRate"
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="col-span-1"
              />
            </div>
          )}
          
          {billable && (
            <div className="flex items-center justify-between">
              <span className="font-medium">Billable Amount:</span>
              <span className="text-lg font-medium text-green-600">
                ${calculateBillableAmount().toFixed(2)}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="font-medium">Project:</span>
            <Badge variant="outline" className="font-normal">
              {projectName}
            </Badge>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            <X size={14} className="mr-1" />
            Cancel
          </Button>
          <Button onClick={handleTimeSubmit}>
            <Save size={14} className="mr-1" />
            Save Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
  // Main Render
  return (
    <>
      <div className="flex items-center gap-2">
        {renderTimerControls()}
      </div>
      {renderTimeEntryDialog()}
    </>
  );
};

export default TaskTimer;
