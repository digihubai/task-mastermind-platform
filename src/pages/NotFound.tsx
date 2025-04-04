
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import logger from '@/utils/logger';

const NotFound = () => {
  const location = useLocation();
  
  useEffect(() => {
    logger.warn(`NotFound page rendered for path: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved: <code className="text-sm bg-muted p-1 rounded">{location.pathname}</code>
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
