
import React from 'react';
import SupportStats from '@/components/support/SupportStats';
import IntegrationStatus from '@/components/communication/IntegrationStatus';

const OmnichannelDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-3">
        <SupportStats />
      </div>
    </div>
  );
};

export default OmnichannelDashboard;
