
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PenLine, Calendar, Trash2 } from "lucide-react";

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  expectedClose: string;
  owner: string;
}

interface DealsTableProps {
  deals: Deal[];
  getStageBadge: (stage: string) => React.ReactNode;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
}

const DealsTable: React.FC<DealsTableProps> = ({
  deals,
  getStageBadge,
  formatDate,
  formatCurrency,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Deal Name</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Company</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Value</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stage</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Probability</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Expected Close</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Owner</th>
            <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id} className="border-b hover:bg-muted/40">
              <td className="py-3 px-4">{deal.name}</td>
              <td className="py-3 px-4">{deal.company}</td>
              <td className="py-3 px-4 font-medium">{formatCurrency(deal.value)}</td>
              <td className="py-3 px-4">{getStageBadge(deal.stage)}</td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <div className="w-16 h-2 bg-secondary rounded-full mr-2">
                    <div 
                      className={`h-full rounded-full ${deal.probability >= 70 ? "bg-green-500" : deal.probability >= 40 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${deal.probability}%` }}
                    ></div>
                  </div>
                  <span>{deal.probability}%</span>
                </div>
              </td>
              <td className="py-3 px-4">{formatDate(deal.expectedClose)}</td>
              <td className="py-3 px-4">{deal.owner}</td>
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
                      <Calendar size={16} className="mr-2" /> Update Stage
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

export default DealsTable;
