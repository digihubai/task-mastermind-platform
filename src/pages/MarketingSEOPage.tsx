
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import SEODashboard from "@/components/seo/SEODashboard";
import { useToast } from "@/components/ui/use-toast";

const MarketingSEOPage = () => {
  const { toast } = useToast();

  return (
    <AppLayout>
      <div className="container mx-auto p-4">
        <SEODashboard />
      </div>
    </AppLayout>
  );
};

export default MarketingSEOPage;
