
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface AnalyticsChartCardProps {
  title: string;
  description?: string;
  loading: boolean;
  chartType: 'line' | 'bar' | 'pie';
  data: any[];
  xDataKey?: string;
  yDataKey?: string;
  height?: number;
  hideLegend?: boolean;
}

export const AnalyticsChartCard = ({
  title,
  description,
  loading,
  chartType,
  data,
  xDataKey = 'name',
  yDataKey = 'value',
  height = 200,
  hideLegend = true
}: AnalyticsChartCardProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <p className="text-muted-foreground">Loading chart data...</p>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xDataKey} />
              <YAxis />
              <Tooltip />
              {!hideLegend && <Legend />}
              <Line type="monotone" dataKey={yDataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          ) : chartType === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xDataKey} />
              <YAxis />
              <Tooltip />
              {!hideLegend && <Legend />}
              <Bar dataKey={yDataKey} fill="#8884d8" />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey={yDataKey}
                nameKey={xDataKey}
                label={(entry) => entry.name}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {!hideLegend && <Legend />}
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
