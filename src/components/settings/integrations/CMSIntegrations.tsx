
import React from 'react';
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { IntegrationProps } from './types';
import SEOIntegrationSettings from '@/components/seo/SEOIntegrationSettings';
import CMSFilter from './cms/CMSFilter';
import CMSGrid from './cms/CMSGrid';
import { useCmsConnections } from './cms/use-cms-connections';

const CMSIntegrations: React.FC<IntegrationProps> = ({ onConnect }) => {
  const {
    connecting,
    searchQuery,
    filterType,
    connected,
    websites,
    handleInputChange,
    handleConnect,
    handleDisconnect,
    setSearchQuery,
    setFilterType
  } = useCmsConnections();
  
  // Call the parent onConnect if provided
  const handleConnectWithCallback = (platform: string) => {
    handleConnect(platform);
    if (onConnect) {
      onConnect(platform);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Website & CMS Integrations</h2>
        <p className="text-sm text-muted-foreground">
          Connect your website or content management system
        </p>
      </div>
      
      <CMSFilter 
        filter={filterType}
        searchQuery={searchQuery}
        onFilterChange={setFilterType}
        onSearchChange={setSearchQuery}
      />
      
      <CMSGrid 
        urls={websites}
        connected={connected}
        connecting={connecting}
        onInputChange={handleInputChange}
        onConnect={handleConnectWithCallback}
        onDisconnect={handleDisconnect}
        filter={filterType}
        searchQuery={searchQuery}
      />
      
      <Card className="p-5 border mt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 p-2 rounded-full">
            <FileText className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-medium">Integration Features</h4>
            <p className="text-sm text-muted-foreground">
              Capabilities available for connected websites
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-md p-3">
            <h5 className="font-medium mb-1">Content Sync</h5>
            <p className="text-xs text-muted-foreground">
              Two-way content synchronization between DigiHub and your CMS
            </p>
          </div>
          
          <div className="border rounded-md p-3">
            <h5 className="font-medium mb-1">Media Library Access</h5>
            <p className="text-xs text-muted-foreground">
              Access and use media directly from your CMS
            </p>
          </div>
          
          <div className="border rounded-md p-3">
            <h5 className="font-medium mb-1">Publish Controls</h5>
            <p className="text-xs text-muted-foreground">
              Schedule and publish content directly to your site
            </p>
          </div>
        </div>
      </Card>
      
      <SEOIntegrationSettings />
    </div>
  );
};

export default CMSIntegrations;
