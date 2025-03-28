
import React, { useState } from 'react';
import { Link } from "lucide-react";
import { IntegrationProps } from './types';
import { useCMSConnections } from './cms/use-cms-connections';
import CMSGrid from './cms/CMSGrid';
import CMSFilter from './cms/CMSFilter';

const CMSIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const [filter, setFilter] = useState<'all' | 'cms' | 'ecommerce'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const {
    urls,
    connected,
    connecting,
    handleInputChange,
    handleConnect,
    handleDisconnect
  } = useCMSConnections(onConnect);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Website & CMS Integrations</h2>
      <p className="text-sm text-muted-foreground">
        Connect your websites and e-commerce platforms to centralize content management and optimize for search engines
      </p>
      
      <CMSFilter 
        filter={filter} 
        searchQuery={searchQuery}
        onFilterChange={setFilter} 
        onSearchChange={setSearchQuery}
      />
      
      <CMSGrid
        urls={urls}
        connected={connected}
        connecting={connecting}
        onInputChange={handleInputChange}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        filter={filter}
        searchQuery={searchQuery}
      />
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <Link className="h-4 w-4" />
        <span>Need help with CMS connections? <a href="#" className="text-primary hover:underline">View our integration docs</a></span>
      </div>
    </div>
  );
};

export default CMSIntegrations;
