
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const CallsTabContent: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          View all call center activity here.
        </p>
        <div className="mt-4">
          <Button variant="outline" onClick={() => navigate('/support/call-center')}>
            <Phone className="mr-2 h-4 w-4" />
            Go to Call Center
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallsTabContent;
