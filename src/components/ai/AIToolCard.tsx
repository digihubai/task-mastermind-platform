
import React from "react";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AIToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  category: string;
  badge?: string;
  color: string;
  onClick: (path: string) => void;
}

const AIToolCard = ({ 
  id, 
  name, 
  description, 
  icon, 
  path, 
  category, 
  badge, 
  color, 
  onClick 
}: AIToolCardProps) => {
  return (
    <Card
      className={`hover-lift border border-border/40 p-6 cursor-pointer ${
        badge === "Coming Soon" ? "opacity-80" : ""
      }`}
      onClick={() => onClick(path)}
    >
      <div className="flex gap-4">
        <div className={`${color} p-3 rounded-full`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">{name}</h3>
            {badge && (
              <Badge variant="outline" className={
                badge === "New" 
                  ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
                  : badge === "Popular"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  : "bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400"
              }>
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-muted-foreground">{category}</span>
            {badge !== "Coming Soon" && (
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <span>Use Tool</span>
                <Zap size={14} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIToolCard;
