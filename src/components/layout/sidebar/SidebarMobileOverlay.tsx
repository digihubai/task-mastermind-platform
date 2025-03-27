
import React from "react";

interface SidebarMobileOverlayProps {
  show: boolean;
  onClick: () => void;
}

const SidebarMobileOverlay: React.FC<SidebarMobileOverlayProps> = ({ show, onClick }) => {
  if (!show) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-20"
      onClick={onClick}
    />
  );
};

export default SidebarMobileOverlay;
