
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Edit, CalendarClock, Users } from "lucide-react";

interface TaskItemProps {
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  assignee: string;
  status: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  priority,
  dueDate,
  assignee,
  status,
}) => {
  return (
    <div className="py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-gray-50 transition-colors rounded-lg">
      <div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            priority === "High" ? "bg-red-500" : 
            priority === "Medium" ? "bg-yellow-500" : "bg-blue-500"
          }`}></div>
          <p className="font-medium">{title}</p>
        </div>
        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <CalendarClock size={12} />
            Due: {dueDate}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {assignee}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <span className={`text-xs px-2 py-1 rounded-full ${
          status === "In Progress" ? "bg-blue-100 text-blue-700" :
          status === "Pending" ? "bg-yellow-100 text-yellow-700" :
          "bg-gray-100 text-gray-700"
        }`}>
          {status}
        </span>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Clock size={16} />
        </Button>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Edit size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
