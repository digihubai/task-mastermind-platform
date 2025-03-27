
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarMobileOverlayProps {
  show: boolean;
  onClick: () => void;
}

const SidebarMobileOverlay: React.FC<SidebarMobileOverlayProps> = ({ show, onClick }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-20 backdrop-blur-sm"
          onClick={onClick}
        />
      )}
    </AnimatePresence>
  );
};

export default SidebarMobileOverlay;
