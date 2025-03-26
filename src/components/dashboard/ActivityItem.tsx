
import React from "react";
import { LucideIcon } from "lucide-react";

interface ActivityItemProps {
  type: string;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  title,
  description,
  time,
  icon,
}) => {
  return (
    <div className="p-4 flex gap-4 items-start hover:bg-gray-50 transition-colors">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-muted-foreground text-xs mt-1">{description}</p>
        <p className="text-muted-foreground text-xs mt-2">{time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
