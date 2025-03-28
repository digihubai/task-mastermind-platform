
import React, { createContext, useContext, useState } from 'react';

interface HumanAgent {
  id: string;
  name: string;
  status: string;
}

interface HumanAgentsContextType {
  availableHumanAgents: HumanAgent[];
  findAvailableAgent: () => HumanAgent | undefined;
}

const HumanAgentsContext = createContext<HumanAgentsContextType | null>(null);

export const useHumanAgents = (): HumanAgentsContextType => {
  const context = useContext(HumanAgentsContext);
  if (!context) {
    throw new Error('useHumanAgents must be used within a HumanAgentsProvider');
  }
  return context;
};

interface HumanAgentsProviderProps {
  children: React.ReactNode;
}

export const HumanAgentsProvider: React.FC<HumanAgentsProviderProps> = ({ children }) => {
  const [availableHumanAgents] = useState([
    { id: "agent1", name: "John Smith", status: "online" },
    { id: "agent2", name: "Sarah Wilson", status: "online" },
    { id: "agent3", name: "Mike Johnson", status: "away" },
  ]);

  const findAvailableAgent = (): HumanAgent | undefined => {
    return availableHumanAgents.find(agent => agent.status === "online");
  };

  return (
    <HumanAgentsContext.Provider value={{ availableHumanAgents, findAvailableAgent }}>
      {children}
    </HumanAgentsContext.Provider>
  );
};

export default HumanAgentsProvider;
