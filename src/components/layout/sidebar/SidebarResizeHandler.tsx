
import React, { useRef, useEffect } from "react";

interface SidebarResizeHandlerProps {
  onResize: (newWidth: number) => void;
  minWidth: number;
  maxWidth: number;
  isCollapsed: boolean;
}

const SidebarResizeHandler: React.FC<SidebarResizeHandlerProps> = ({
  onResize,
  minWidth,
  maxWidth,
  isCollapsed
}) => {
  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizer = resizerRef.current;
    if (!resizer || isCollapsed) return;

    let startX: number;
    let startWidth: number;

    const onMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      const sidebar = resizer.parentElement;
      startWidth = sidebar ? sidebar.getBoundingClientRect().width : 0;
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + delta));
      onResize(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    resizer.addEventListener('mousedown', onMouseDown);

    return () => {
      resizer.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onResize, minWidth, maxWidth, isCollapsed]);

  if (isCollapsed) return null;

  return (
    <div 
      ref={resizerRef}
      className="absolute top-0 right-0 h-full w-1 cursor-ew-resize z-50 hover:bg-primary/20 active:bg-primary/30"
      title="Drag to resize"
    />
  );
};

export default SidebarResizeHandler;
