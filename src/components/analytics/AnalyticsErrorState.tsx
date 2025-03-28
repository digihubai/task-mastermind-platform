
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface AnalyticsErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const AnalyticsErrorState: React.FC<AnalyticsErrorStateProps> = ({ 
  message = "We couldn't load your analytics data", 
  onRetry 
}) => {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertTriangle className="h-5 w-5 mr-2" />
      <div className="flex-1">
        <AlertTitle>Error Loading Data</AlertTitle>
        <AlertDescription className="mt-2">
          <p>{message}</p>
          {onRetry && (
            <Button 
              variant="outline" 
              onClick={onRetry} 
              className="mt-4 bg-background hover:bg-background"
            >
              Try Again
            </Button>
          )}
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default AnalyticsErrorState;
