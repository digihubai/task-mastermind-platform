
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AIKeyConfig from '@/components/settings/integrations/AIKeyConfig';

const SEOIntegrations: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Content Generation</CardTitle>
          <CardDescription>
            Configure AI services for content generation across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AIKeyConfig />
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOIntegrations;
