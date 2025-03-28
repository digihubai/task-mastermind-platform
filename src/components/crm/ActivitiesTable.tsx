
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PenLine, FileText, Trash2, Phone, Mail, Calendar, MessageSquare, Clock } from "lucide-react";

interface Activity {
  id: string;
  type: string;
  contact: string;
  company: string;
  description: string;
  date: string;
  user: string;
  status?: string;
}

interface ActivitiesTableProps {
  activities: Activity[];
  getActivityIcon: (type: string) => React.ReactNode;
  formatDate: (dateString: string) => string;
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({
  activities,
  getActivityIcon,
  formatDate,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Company</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
            <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="border-b hover:bg-muted/40">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    {getActivityIcon(activity.type)}
                  </div>
                  <span className="capitalize">{activity.type}</span>
                </div>
              </td>
              <td className="py-3 px-4">{activity.contact}</td>
              <td className="py-3 px-4">{activity.company}</td>
              <td className="py-3 px-4">{activity.description}</td>
              <td className="py-3 px-4">{formatDate(activity.date)}</td>
              <td className="py-3 px-4">{activity.user}</td>
              <td className="py-3 px-4 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center">
                      <PenLine size={16} className="mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <FileText size={16} className="mr-2" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center text-red-500">
                      <Trash2 size={16} className="mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "call": return <Phone size={18} />;
    case "email": return <Mail size={18} />;
    case "meeting": return <Calendar size={18} />;
    case "note": return <FileText size={18} />;
    case "task": return <Clock size={18} />;
    default: return <MessageSquare size={18} />;
  }
};

export { getActivityIcon };
export default ActivitiesTable;
