
import React from 'react';
import { Link } from "lucide-react";

const SEOHelpFooter: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
      <Link className="h-4 w-4" />
      <span>Need help with SEO integrations? <a href="#" className="text-primary hover:underline">View our SEO integration docs</a></span>
    </div>
  );
};

export default SEOHelpFooter;
