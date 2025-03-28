
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Download, RefreshCw } from 'lucide-react';

interface HeaderControlsProps {
  period: 'day' | 'week' | 'month';
  onPeriodChange: (value: string) => void;
  onRefresh: () => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({ 
  period, 
  onPeriodChange, 
  onRefresh 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
      <Select defaultValue={period} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Last 24 Hours</SelectItem>
          <SelectItem value="week">Last 7 Days</SelectItem>
          <SelectItem value="month">Last 30 Days</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={onRefresh}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Refresh
      </Button>
      <Button variant="outline">
        <Calendar className="mr-2 h-4 w-4" />
        Date Range
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
};

export default HeaderControls;
