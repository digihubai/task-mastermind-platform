
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Filter, MoreHorizontal, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ProjectsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  
  const projectStatuses = [
    { id: "all", label: "All Projects" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "archived", label: "Archived" }
  ];
  
  const mockProjects = [
    {
      id: 1,
      name: "Website Redesign",
      client: "Acme Inc.",
      status: "active",
      priority: "high",
      dueDate: "2023-11-30",
      progress: 75,
      team: [
        { id: 1, name: "John Doe", avatar: "JD" },
        { id: 2, name: "Jane Smith", avatar: "JS" }
      ],
      tasks: { total: 24, completed: 18 }
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "TechStart",
      status: "active",
      priority: "medium",
      dueDate: "2023-12-15",
      progress: 42,
      team: [
        { id: 3, name: "Mike Johnson", avatar: "MJ" },
        { id: 4, name: "Sarah Williams", avatar: "SW" }
      ],
      tasks: { total: 36, completed: 15 }
    },
    {
      id: 3,
      name: "Marketing Campaign",
      client: "Global Retail",
      status: "completed",
      priority: "low",
      dueDate: "2023-10-10",
      progress: 100,
      team: [
        { id: 2, name: "Jane Smith", avatar: "JS" },
        { id: 5, name: "Robert Brown", avatar: "RB" }
      ],
      tasks: { total: 18, completed: 18 }
    },
    {
      id: 4,
      name: "E-commerce Integration",
      client: "Fashion Brand",
      status: "active",
      priority: "high",
      dueDate: "2023-12-01",
      progress: 30,
      team: [
        { id: 1, name: "John Doe", avatar: "JD" },
        { id: 3, name: "Mike Johnson", avatar: "MJ" },
        { id: 4, name: "Sarah Williams", avatar: "SW" }
      ],
      tasks: { total: 42, completed: 12 }
    },
    {
      id: 5,
      name: "CRM Implementation",
      client: "Service Co.",
      status: "active",
      priority: "medium",
      dueDate: "2024-01-15",
      progress: 15,
      team: [
        { id: 5, name: "Robert Brown", avatar: "RB" },
        { id: 6, name: "Emily Davis", avatar: "ED" }
      ],
      tasks: { total: 30, completed: 5 }
    }
  ];
  
  const filteredProjects = activeTab === "all" 
    ? mockProjects 
    : mockProjects.filter(project => project.status === activeTab);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400";
      case "low":
        return "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock size={16} className="text-blue-500" />;
      case "completed":
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <AlertCircle size={16} className="text-amber-500" />;
    }
  };
  
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor all your company projects
            </p>
          </div>
          
          <Button
            onClick={() => {
              toast({
                title: "Feature in development",
                description: "Creating new projects will be available soon",
              });
            }}
            className="flex items-center gap-2"
          >
            <PlusCircle size={18} />
            <span>New Project</span>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full md:w-auto">
              {projectStatuses.map(status => (
                <TabsTrigger key={status.id} value={status.id}>{status.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:bg-secondary focus:border-primary/20 transition-colors"
              />
            </div>
            
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter size={18} />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProjects.map(project => (
            <Card key={project.id} className="hover-lift border border-border/40 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(project.status)}
                      <span className="text-xs capitalize">{project.status}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getPriorityColor(project.priority)}`}>
                        {project.priority} priority
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium">{project.name}</h3>
                    <p className="text-muted-foreground text-sm">Client: {project.client}</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit project</DropdownMenuItem>
                      <DropdownMenuItem>Manage team</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Archive project</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {project.team.map(member => (
                      <div 
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium border-2 border-background"
                        title={member.name}
                      >
                        {member.avatar}
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="w-8 h-8 rounded-full border-dashed border-2"
                      onClick={() => {
                        toast({
                          title: "Feature in development",
                          description: "Adding team members will be available soon",
                        });
                      }}
                    >
                      <PlusCircle size={14} />
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                    <span className="mx-2">•</span>
                    <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectsPage;
