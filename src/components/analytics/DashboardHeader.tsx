
import React from 'react';
import HeaderControls from './HeaderControls';

interface DashboardHeaderProps {
  period: 'day' | 'week' | 'month';
  onPeriodChange: (value: string) => void;
  onRefresh: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  period, 
  onPeriodChange, 
  onRefresh 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track and analyze your business performance metrics</p>
      </div>
      <HeaderControls 
        period={period} 
        onPeriodChange={onPeriodChange} 
        onRefresh={onRefresh} 
      />
    </div>
  );
};

export default DashboardHeader;
