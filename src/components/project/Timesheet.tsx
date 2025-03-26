
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Filter, PlusCircle, Download, Search, Play, Pause, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const Timesheet = () => {
  const { toast } = useToast();
  const [isTracking, setIsTracking] = useState(false);
  const [activeTimer, setActiveTimer] = useState(null);
  
  const mockTimeEntries = [
    {
      id: 1,
      task: "Website Redesign - Homepage",
      project: "Acme Corp Website",
      date: "2023-11-15",
      startTime: "09:30 AM",
      endTime: "11:30 AM",
      duration: "2h",
      notes: "Completed first draft of homepage design",
      billable: true
    },
    {
      id: 2,
      task: "Client Meeting",
      project: "TechStart Mobile App",
      date: "2023-11-15",
      startTime: "01:00 PM",
      endTime: "02:15 PM",
      duration: "1h 15m",
      notes: "Discussed app requirements and timeline",
      billable: true
    },
    {
      id: 3,
      task: "Backend API Development",
      project: "TechStart Mobile App",
      date: "2023-11-14",
      startTime: "10:00 AM",
      endTime: "04:30 PM",
      duration: "6h 30m",
      notes: "Implemented user authentication endpoints",
      billable: true
    },
    {
      id: 4,
      task: "Code Review",
      project: "Acme Corp Website",
      date: "2023-11-14",
      startTime: "04:30 PM",
      endTime: "05:30 PM",
      duration: "1h",
      notes: "Reviewed PR for product catalog feature",
      billable: false
    },
    {
      id: 5,
      task: "Team Planning",
      project: "Internal",
      date: "2023-11-13",
      startTime: "09:00 AM",
      endTime: "10:00 AM",
      duration: "1h",
      notes: "Weekly team planning session",
      billable: false
    }
  ];

  const startTracking = (taskId) => {
    setIsTracking(true);
    setActiveTimer(taskId);
    
    toast({
      title: "Time tracking started",
      description: "Timer has started for this task",
    });
  };

  const stopTracking = () => {
    setIsTracking(false);
    setActiveTimer(null);
    
    toast({
      title: "Time tracking stopped",
      description: "Time entry has been saved",
    });
  };

  const logTime = () => {
    toast({
      title: "Add time entry",
      description: "Time entry form will open",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Timesheet</h2>
          <p className="text-muted-foreground mt-1">
            Track and manage time spent on project tasks
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Today</span>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
          
          <Button className="flex items-center gap-2" onClick={logTime}>
            <PlusCircle size={16} />
            <span>Log Time</span>
          </Button>
        </div>
      </div>
      
      <Card className="border border-border/40">
        <div className="p-4 border-b border-border flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search timesheet..."
                className="pl-9"
              />
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All projects</SelectItem>
                <SelectItem value="acme">Acme Corp Website</SelectItem>
                <SelectItem value="techstart">TechStart Mobile App</SelectItem>
                <SelectItem value="internal">Internal Projects</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue="week">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <ScrollArea className="h-[460px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTimeEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.task}</TableCell>
                  <TableCell>{entry.project}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.startTime}</TableCell>
                  <TableCell>{entry.endTime}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
                  <TableCell>
                    {entry.billable ? (
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Billable
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                        Non-billable
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {activeTimer === entry.id ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 gap-1 bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                          onClick={stopTracking}
                        >
                          <Pause size={14} />
                          <span>Stop</span>
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 gap-1"
                          onClick={() => startTracking(entry.id)}
                        >
                          <Play size={14} />
                          <span>Start</span>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-8">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        
        <div className="p-4 border-t border-border flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing 5 of 24 time entries
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Total hours this week:</span>
              <span className="font-medium ml-2">23h 45m</span>
            </div>
            
            <div className="text-sm">
              <span className="text-muted-foreground">Billable:</span>
              <span className="font-medium ml-2">19h 15m</span>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border border-border/40">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3 text-primary">
              <Timer size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Active Timers</p>
              <h3 className="text-3xl font-semibold mt-1">{isTracking ? 1 : 0}</h3>
              <p className="text-xs text-green-500 mt-2">
                {isTracking ? "Currently tracking time" : "No active timers"}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border border-border/40">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3 text-primary">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Today's Hours</p>
              <h3 className="text-3xl font-semibold mt-1">3h 15m</h3>
              <p className="text-xs text-muted-foreground mt-2">
                Across 2 different tasks
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border border-border/40">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3 text-primary">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Weekly Summary</p>
              <h3 className="text-3xl font-semibold mt-1">23h 45m</h3>
              <p className="text-xs text-muted-foreground mt-2">
                80% of weekly target (30h)
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Timesheet;
