
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TaskTimerProps {
  taskId: number;
  taskName: string;
  projectName: string;
}

const TaskTimer = ({ taskId, taskName, projectName }: TaskTimerProps) => {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState(null);
  
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
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
    
    toast({
      title: "Timer stopped",
      description: `Time tracked: ${formatTime(timeElapsed)}`,
    });
    
    // Here you would typically save the time entry to your database
    console.log({
      taskId,
      taskName,
      projectName,
      startTime,
      endTime: new Date(),
      duration: timeElapsed
    });
  };
  
  return (
    <div className="flex items-center gap-2">
      {isRunning ? (
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
      ) : (
        <Button 
          variant="outline" 
          size="sm"
          className="h-8"
          onClick={handleStartTimer}
        >
          <Play size={14} className="mr-1" />
          Track Time
        </Button>
      )}
    </div>
  );
};

export default TaskTimer;
