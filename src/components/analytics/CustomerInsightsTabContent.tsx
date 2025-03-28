
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnalyticsChartCard } from '@/components/analytics/AnalyticsChartCard';

interface CustomerInsightsTabContentProps {
  loading: boolean;
  generateSampleData: () => Promise<void>;
}

const CustomerInsightsTabContent: React.FC<CustomerInsightsTabContentProps> = ({ 
  loading,
  generateSampleData 
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Customer Segmentation</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChartCard
              title=""
              loading={loading}
              chartType="pie"
              data={[
                { name: 'New Customers', value: 30 },
                { name: 'Returning', value: 45 },
                { name: 'Loyal', value: 25 },
              ]}
              height={300}
              hideLegend={false}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChartCard
              title=""
              loading={loading}
              chartType="bar"
              data={[
                { name: 'Very Satisfied', value: 42 },
                { name: 'Satisfied', value: 28 },
                { name: 'Neutral', value: 15 },
                { name: 'Dissatisfied', value: 10 },
                { name: 'Very Dissatisfied', value: 5 },
              ]}
              xDataKey="name"
              yDataKey="value"
              height={300}
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Journey Map</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          {loading ? (
            <p>Loading journey map data...</p>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Customer journey visualization will appear here</p>
              <Button variant="outline" onClick={generateSampleData}>Generate Sample Data</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerInsightsTabContent;
