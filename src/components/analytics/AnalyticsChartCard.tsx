
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, AreaChart, PieChart, ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Maximize2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ChartType = "line" | "bar" | "area" | "pie" | "horizontal-bar" | "funnel";

interface AnalyticsChartCardProps {
  title: string;
  subtitle?: string;
  chartType: ChartType;
  height?: number;
}

const AnalyticsChartCard: React.FC<AnalyticsChartCardProps> = ({
  title,
  subtitle,
  chartType,
  height = 300
}) => {
  const { toast } = useToast();
  
  // Sample data
  const lineData = [
    { name: 'Jan', revenue: 4000, spend: 2400 },
    { name: 'Feb', revenue: 3000, spend: 1398 },
    { name: 'Mar', revenue: 9800, spend: 2000 },
    { name: 'Apr', revenue: 3908, spend: 2780 },
    { name: 'May', revenue: 4800, spend: 1890 },
    { name: 'Jun', revenue: 3800, spend: 2390 },
    { name: 'Jul', revenue: 4300, spend: 3490 },
  ];
  
  const barData = [
    { name: 'Facebook', value: 3.2 },
    { name: 'Instagram', value: 2.8 },
    { name: 'Google', value: 4.1 },
    { name: 'TikTok', value: 1.9 },
  ];
  
  const horizontalBarData = [
    { name: 'Summer Sale', value: 12500 },
    { name: 'New Collection', value: 9800 },
    { name: 'Holiday Promo', value: 8700 },
    { name: 'Clearance', value: 7200 },
    { name: 'Flash Sale', value: 5600 },
  ];
  
  const pieData = [
    { name: 'Desktop', value: 58 },
    { name: 'Mobile', value: 38 },
    { name: 'Tablet', value: 4 },
  ];
  
  const funnelData = [
    { name: 'Visits', value: 10000 },
    { name: 'Add to Cart', value: 3000 },
    { name: 'Checkout', value: 1200 },
    { name: 'Purchase', value: 800 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const handleExpandChart = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Chart expansion will be available in the next update."
    });
  };
  
  const handleDownloadChart = () => {
    toast({
      title: "Downloading Chart",
      description: "Your chart is being prepared for download."
    });
  };
  
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="spend" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
              <Bar dataKey="spend" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              <Area type="monotone" dataKey="spend" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'horizontal-bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              layout="vertical"
              data={horizontalBarData}
              margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'funnel':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={funnelData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8">
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Chart type not supported</p>
          </div>
        );
    }
  };
  
  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleExpandChart}>
              <Maximize2 size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownloadChart}>
              <Download size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default AnalyticsChartCard;
