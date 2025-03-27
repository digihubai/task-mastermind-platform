
import React from "react";
import { Bell, Moon, Search, Sun, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarToggleButton } from "@/components/ui/sidebar-toggle-button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  toggleSidebar: () => void;
  moduleName?: string;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar, moduleName }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { toast } = useToast();
  
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
    
    toast({
      title: isDarkMode ? "Light mode activated" : "Dark mode activated",
      description: "Your preference has been saved",
    });
  };

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <SidebarToggleButton />
        </div>
        
        {moduleName && (
          <div className="hidden md:block text-lg font-semibold text-foreground">
            {moduleName}
          </div>
        )}
      </div>
      
      <div className="hidden md:flex items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:bg-secondary focus:border-primary/20 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1">
              <PlusCircle size={16} />
              <span className="hidden md:inline">Create</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Task</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Project</DropdownMenuItem>
            <DropdownMenuItem>New Campaign</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <button 
          className="p-2 rounded-md hover:bg-secondary transition-colors relative text-foreground"
          onClick={() => {
            toast({
              title: "You have no new notifications",
              description: "Your notification center is empty",
            });
          }}
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <button 
          className="p-2 rounded-md hover:bg-secondary transition-colors text-foreground"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
          A
        </div>
      </div>
    </header>
  );
};

export default TopBar;
