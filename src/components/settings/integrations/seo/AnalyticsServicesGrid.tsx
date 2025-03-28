
import React from 'react';
import { BarChart3, Search, Globe, LineChart, Activity } from "lucide-react";
import AnalyticsServiceCard from './AnalyticsServiceCard';
import { SEOAnalyticsServiceState } from './types';

interface AnalyticsServicesGridProps {
  serviceState: SEOAnalyticsServiceState;
  connecting: string | null;
  handleInputChange: (service: string, value: string) => void;
  handleConnect: (service: string) => void;
  handleDisconnect: (service: string) => void;
}

const AnalyticsServicesGrid: React.FC<AnalyticsServicesGridProps> = ({
  serviceState,
  connecting,
  handleInputChange,
  handleConnect,
  handleDisconnect
}) => {
  const services = [
    {
      id: "googleAnalytics",
      name: "Google Analytics 4",
      description: "Track website traffic and user behavior",
      icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
      backgroundColor: "bg-blue-100"
    },
    {
      id: "searchConsole",
      name: "Google Search Console",
      description: "Monitor search performance and website health",
      icon: <Search className="h-5 w-5 text-green-600" />,
      backgroundColor: "bg-green-100"
    },
    {
      id: "bingWebmaster",
      name: "Bing Webmaster Tools",
      description: "Track performance on Microsoft's search engine",
      icon: <Globe className="h-5 w-5 text-blue-600" />,
      backgroundColor: "bg-blue-100"
    },
    {
      id: "adobeAnalytics",
      name: "Adobe Analytics",
      description: "Enterprise-grade website analytics",
      icon: <Activity className="h-5 w-5 text-red-600" />,
      backgroundColor: "bg-red-100"
    },
    {
      id: "matomo",
      name: "Matomo",
      description: "Privacy-focused web analytics platform",
      icon: <LineChart className="h-5 w-5 text-purple-600" />,
      backgroundColor: "bg-purple-100"
    },
    {
      id: "hotjar",
      name: "Hotjar",
      description: "Visualize user behavior with heatmaps",
      icon: <Activity className="h-5 w-5 text-orange-600" />,
      backgroundColor: "bg-orange-100"
    },
    {
      id: "crazyEgg",
      name: "Crazy Egg",
      description: "Heatmaps and user behavior analysis",
      icon: <Activity className="h-5 w-5 text-yellow-600" />,
      backgroundColor: "bg-yellow-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <AnalyticsServiceCard 
          key={service.id}
          service={service.id}
          name={service.name}
          description={service.description}
          icon={service.icon}
          backgroundColor={service.backgroundColor}
          apiKey={serviceState.apiKeys[service.id]}
          connected={serviceState.connected[service.id]}
          connecting={connecting === service.id}
          onInputChange={(value) => handleInputChange(service.id, value)}
          onConnect={() => handleConnect(service.id)}
          onDisconnect={() => handleDisconnect(service.id)}
        />
      ))}
    </div>
  );
};

export default AnalyticsServicesGrid;
