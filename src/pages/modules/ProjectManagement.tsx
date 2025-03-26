
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  FolderOpen, PlusCircle, ChevronRight, Users, Clock, Calendar,
  BarChart2, CheckCircle, AlertTriangle
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/Badge";

const ProjectManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("projects");
  
  const mockProjects = [
    {
      id: 1,
      name: "Website Redesign",
      client: "Acme Corp",
      status: "in-progress",
      dueDate: "2023-12-15",
      progress: 65,
      team: ["John D.", "Sarah K.", "Michael R."],
      tasks: 24,
      completedTasks: 16
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "TechStart Inc",
      status: "planning",
      dueDate: "2024-02-28",
      progress: 20,
      team: ["Emily L.", "David S."],
      tasks: 42,
      completedTasks: 8
    },
    {
      id: 3,
      name: "Marketing Campaign",
      client: "Global Retail",
      status: "completed",
      dueDate: "2023-11-30",
      progress: 100,
      team: ["Jessica T.", "Robert M.", "Sophia P.", "Daniel K."],
      tasks: 36,
      completedTasks: 36
    },
    {
      id: 4,
      name: "Product Launch",
      client: "Innovate Solutions",
      status: "at-risk",
      dueDate: "2023-12-10",
      progress: 45,
      team: ["Alex B.", "Michelle W."],
      tasks: 28,
      completedTasks: 12
    }
  ];
  
  const mockTasks = [
    {
      id: 1,
      title: "Design homepage wireframes",
      project: "Website Redesign",
      assignee: "Sarah K.",
      status: "completed",
      dueDate: "2023-11-25",
      priority: "high"
    },
    {
      id: 2,
      title: "Develop authentication system",
      project: "Mobile App Development",
      assignee: "David S.",
      status: "in-progress",
      dueDate: "2023-12-05",
      priority: "high"
    },
    {
      id: 3,
      title: "Create content calendar",
      project: "Marketing Campaign",
      assignee: "Jessica T.",
      status: "completed",
      dueDate: "2023-11-20",
      priority: "medium"
    },
    {
      id: 4,
      title: "Set up analytics dashboard",
      project: "Website Redesign",
      assignee: "John D.",
      status: "pending",
      dueDate: "2023-12-08",
      priority: "medium"
    },
    {
      id: 5,
      title: "Review competitor products",
      project: "Product Launch",
      assignee: "Alex B.",
      status: "in-progress",
      dueDate: "2023-12-01",
      priority: "high"
    }
  ];
  
  const getStatusBadge = (status) => {
    const statusMap = {
      "in-progress": { variant: "outline", className: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800", label: "In Progress" },
      "planning": { variant: "outline", className: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800", label: "Planning" },
      "completed": { variant: "outline", className: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800", label: "Completed" },
      "at-risk": { variant: "outline", className: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800", label: "At Risk" },
      "pending": { variant: "outline", className: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800", label: "Pending" }
    };
    
    const config = statusMap[status] || statusMap["in-progress"];
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };
  
  const getPriorityBadge = (priority) => {
    const priorityMap = {
      "high": { variant: "outline", className: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800", label: "High" },
      "medium": { variant: "outline", className: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800", label: "Medium" },
      "low": { variant: "outline", className: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800", label: "Low" }
    };
    
    const config = priorityMap[priority] || priorityMap["medium"];
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };
  
  const handleNewProject = () => {
    toast({
      title: "Create new project",
      description: "Project creation wizard will be available soon",
    });
  };
  
  const handleNewTask = () => {
    toast({
      title: "Create new task",
      description: "Task creation wizard will be available soon",
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Project Management</h1>
            <p className="text-muted-foreground mt-1">
              Oversee team tasks, track progress, and manage your projects
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Project insights",
                  description: "Insights dashboard will be available soon",
                });
              }}
              className="flex items-center gap-2"
            >
              <BarChart2 size={18} />
              <span>Insights</span>
            </Button>
            
            <Button
              onClick={handleNewProject}
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} />
              <span>New Project</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="projects" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <FolderOpen size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total Projects</p>
                      <h3 className="text-3xl font-semibold mt-1">{mockProjects.length}</h3>
                      <p className="text-xs text-green-500 mt-2">
                        +1 from last month
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Completed</p>
                      <h3 className="text-3xl font-semibold mt-1">
                        {mockProjects.filter(p => p.status === "completed").length}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        Out of {mockProjects.length} total
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">At Risk</p>
                      <h3 className="text-3xl font-semibold mt-1">
                        {mockProjects.filter(p => p.status === "at-risk").length}
                      </h3>
                      <p className="text-xs text-red-500 mt-2">
                        Requires attention
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="space-y-4">
                {mockProjects.map(project => (
                  <Card key={project.id} className="hover-lift border border-border/40">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">{project.name}</h3>
                            {getStatusBadge(project.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Client: {project.client}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar size={16} className="text-muted-foreground" />
                            <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-sm">
                            <CheckCircle size={16} className="text-muted-foreground" />
                            <span>{project.completedTasks}/{project.tasks} tasks</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              project.status === "at-risk" 
                                ? "bg-red-500" 
                                : project.status === "completed" 
                                ? "bg-green-500" 
                                : "bg-primary"
                            }`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member, i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background text-xs font-medium">
                              {member.split(' ')[0][0]}{member.split(' ')[1][0]}
                            </div>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background text-xs font-medium">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "View project details",
                              description: "Project details view will be available soon",
                            });
                          }}
                        >
                          Details
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Edit project",
                              description: "Project editor will be available soon",
                            });
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Card 
                  className="hover-lift border border-dashed border-border h-full flex items-center justify-center cursor-pointer"
                  onClick={handleNewProject}
                >
                  <div className="p-6 text-center">
                    <div className="bg-secondary rounded-full p-3 text-primary mx-auto">
                      <PlusCircle size={24} />
                    </div>
                    <h3 className="font-medium mt-4">Create New Project</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Start tracking a new client project
                    </p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">All Tasks</h3>
                  <p className="text-sm text-muted-foreground">Manage and track your team's tasks</p>
                </div>
                
                <Button onClick={handleNewTask} className="flex items-center gap-2">
                  <PlusCircle size={16} />
                  <span>New Task</span>
                </Button>
              </div>
              
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        {mockProjects.map(project => (
                          <SelectItem key={project.id} value={project.name}>{project.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="p-0">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-left">
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Task</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Project</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Assignee</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Due Date</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Priority</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTasks.map(task => (
                        <tr key={task.id} className="border-t border-border">
                          <td className="py-3 px-4">{task.title}</td>
                          <td className="py-3 px-4">{task.project}</td>
                          <td className="py-3 px-4">{task.assignee}</td>
                          <td className="py-3 px-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                          <td className="py-3 px-4">{getStatusBadge(task.status)}</td>
                          <td className="py-3 px-4">{getPriorityBadge(task.priority)}</td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <p className="text-sm text-muted-foreground">Manage your project team</p>
                </div>
                
                <Button className="flex items-center gap-2">
                  <PlusCircle size={16} />
                  <span>Add Member</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["John D.", "Sarah K.", "Michael R.", "Emily L.", "David S.", "Jessica T."].map((member, i) => (
                  <Card key={i} className="border border-border/40">
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium">
                          {member.split(' ')[0][0]}{member.split(' ')[1][0]}
                        </div>
                        <div>
                          <h4 className="font-medium">{member}</h4>
                          <p className="text-sm text-muted-foreground">
                            {["Project Manager", "Designer", "Developer", "Marketing", "Developer", "Content Writer"][i]}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Assigned Tasks</span>
                          <span className="text-sm font-medium">{Math.floor(Math.random() * 10) + 1}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Completed</span>
                          <span className="text-sm font-medium">{Math.floor(Math.random() * 8) + 1}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "View member details",
                              description: "Member details view will be available soon",
                            });
                          }}
                        >
                          View Profile
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Manage tasks",
                              description: "Task management view will be available soon",
                            });
                          }}
                        >
                          Tasks
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ProjectManagement;
