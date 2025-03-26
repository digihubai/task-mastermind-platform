
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, InfoIcon, Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface AnalyticsChartCardProps {
  title: string;
  description?: string;
  chartType: "bar" | "line";
  timeRange?: string;
  data: any[];
  dataKeys: {
    xAxisKey: string;
    yAxisKeys: {key: string; color: string; name: string}[];
  };
  showLegend?: boolean;
  showControls?: boolean;
  showDateRange?: boolean;
  showDownload?: boolean;
  showShare?: boolean;
  showInfo?: boolean;
  className?: string;
  status?: {
    text: string;
    variant: "default" | "success" | "warning" | "danger";
  };
}

const AnalyticsChartCard: React.FC<AnalyticsChartCardProps> = ({
  title,
  description,
  chartType = "line",
  timeRange,
  data,
  dataKeys,
  showLegend = true,
  showControls = true,
  showDateRange = false,
  showDownload = false,
  showShare = false,
  showInfo = false,
  className = "",
  status
}) => {
  const [selectedRange, setSelectedRange] = useState(timeRange || "7d");
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const getBadgeColor = (variant: string) => {
    switch (variant) {
      case "success": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "warning": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "danger": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>{title}</CardTitle>
            {status && (
              <Badge variant="outline" className={getBadgeColor(status.variant)}>
                {status.text}
              </Badge>
            )}
            {showInfo && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <InfoIcon size={16} className="text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <p className="text-sm text-muted-foreground">{description}</p>
                </PopoverContent>
              </Popover>
            )}
          </div>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        
        <div className="flex items-center gap-2">
          {showControls && (
            <Select value={selectedRange} onValueChange={setSelectedRange}>
              <SelectTrigger className="w-[100px] h-8">
                <SelectValue placeholder="Last 7 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          {showDateRange && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <CalendarIcon size={16} />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
          
          {showDownload && (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download size={16} />
            </Button>
          )}
          
          {showShare && (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share size={16} />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey={dataKeys.xAxisKey} tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                {showLegend && <Legend />}
                {dataKeys.yAxisKeys.map((item, index) => (
                  <Line 
                    key={index}
                    type="monotone" 
                    dataKey={item.key} 
                    name={item.name}
                    stroke={item.color} 
                    strokeWidth={2} 
                    dot={{ r: 0 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            ) : (
              <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey={dataKeys.xAxisKey} tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                {showLegend && <Legend />}
                {dataKeys.yAxisKeys.map((item, index) => (
                  <Bar 
                    key={index} 
                    dataKey={item.key} 
                    name={item.name}
                    fill={item.color} 
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChartCard;
