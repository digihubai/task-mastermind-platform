
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  count: string;
  icon: LucideIcon;
  link: string;
  color: string;
  percentChange: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  count,
  icon: Icon,
  link,
  color,
  percentChange,
}) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="hover-lift overflow-hidden border border-border/40"
      onClick={() => navigate(link)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          </div>
          <div className={`rounded-full p-3 ${color}`}>
            <Icon size={20} />
          </div>
        </div>
        
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-3xl font-semibold">{count}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-green-500 mr-1">{percentChange}</span> 
              from last month
            </p>
          </div>
          
          <div className="rounded-full bg-secondary p-2 hover:bg-primary hover:text-primary-foreground transition-colors">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
