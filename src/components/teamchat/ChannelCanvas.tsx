
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  X, 
  Save,
  Download,
  Square,
  Circle,
  Type,
  Pencil,
  Eraser,
  Undo,
  Redo,
  Image as ImageIcon
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ChannelCanvasProps {
  isOpen: boolean;
  onClose: () => void;
}

type DrawingTool = 'pencil' | 'eraser' | 'text' | 'rectangle' | 'circle' | 'image';

const ChannelCanvas: React.FC<ChannelCanvasProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<DrawingTool>('pencil');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentSize, setCurrentSize] = useState(2);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentSize;
      setContext(ctx);
      
      // Save initial state
      saveCanvasState();
    }
  }, []);
  
  // Update stroke style when color or size changes
  useEffect(() => {
    if (!context) return;
    context.strokeStyle = currentColor;
    context.lineWidth = currentSize;
  }, [context, currentColor, currentSize]);
  
  const saveCanvasState = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const newState = canvas.toDataURL();
    
    // Only save if something changed
    if (historyIndex >= 0 && canvasHistory[historyIndex] === newState) return;
    
    // If we're not at the end of the history, remove future states
    const newHistory = historyIndex < 0 
      ? [newState] 
      : [...canvasHistory.slice(0, historyIndex + 1), newState];
    
    setCanvasHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  const undo = () => {
    if (historyIndex <= 0) return;
    
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    loadCanvasState(newIndex);
  };
  
  const redo = () => {
    if (historyIndex >= canvasHistory.length - 1) return;
    
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    loadCanvasState(newIndex);
  };
  
  const loadCanvasState = (index: number) => {
    if (!canvasRef.current || !context || index < 0 || index >= canvasHistory.length) return;
    
    const img = new Image();
    img.onload = () => {
      context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      context.drawImage(img, 0, 0);
    };
    img.src = canvasHistory[index];
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.beginPath();
    context.moveTo(x, y);
    setDrawing(true);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context || !drawing) return;
    
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (currentTool === 'pencil') {
      context.lineTo(x, y);
      context.stroke();
    } else if (currentTool === 'eraser') {
      // Save current stroke style
      const currentStrokeStyle = context.strokeStyle;
      const currentLineWidth = context.lineWidth;
      
      // Set eraser properties
      context.strokeStyle = '#FFFFFF';
      context.lineWidth = currentSize * 3;
      
      context.lineTo(x, y);
      context.stroke();
      
      // Restore original stroke style
      context.strokeStyle = currentStrokeStyle;
      context.lineWidth = currentLineWidth;
    }
  };
  
  const stopDrawing = () => {
    if (!context || !drawing) return;
    
    context.closePath();
    setDrawing(false);
    saveCanvasState();
  };
  
  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveCanvasState();
  };
  
  const saveCanvas = () => {
    if (!canvasRef.current) return;
    
    const dataUrl = canvasRef.current.toDataURL('image/png');
    
    // In a real app, you would save this to the server
    console.log('Canvas data:', dataUrl);
    toast.success('Canvas saved');
  };
  
  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `canvas-${new Date().toISOString()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-background bg-opacity-90 z-50 flex flex-col animate-fade-in">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium">Channel Canvas</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={saveCanvas}>
            <Save size={16} className="mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCanvas}>
            <Download size={16} className="mr-1" />
            Download
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex">
        <div className="w-16 border-r p-2">
          <div className="space-y-2">
            <Button 
              variant={currentTool === 'pencil' ? 'default' : 'ghost'} 
              size="icon"
              onClick={() => setCurrentTool('pencil')}
              title="Pencil"
            >
              <Pencil size={16} />
            </Button>
            <Button 
              variant={currentTool === 'eraser' ? 'default' : 'ghost'} 
              size="icon"
              onClick={() => setCurrentTool('eraser')}
              title="Eraser"
            >
              <Eraser size={16} />
            </Button>
            <Button 
              variant={currentTool === 'text' ? 'default' : 'ghost'} 
              size="icon"
              onClick={() => setCurrentTool('text')}
              title="Text"
            >
              <Type size={16} />
            </Button>
            <Button 
              variant={currentTool === 'rectangle' ? 'default' : 'ghost'} 
              size="icon"
              onClick={() => setCurrentTool('rectangle')}
              title="Rectangle"
            >
              <Square size={16} />
            </Button>
            <Button 
              variant={currentTool === 'circle' ? 'default' : 'ghost'} 
              size="icon"
              onClick={() => setCurrentTool('circle')}
              title="Circle"
            >
              <Circle size={16} />
            </Button>
            <Button 
              variant={currentTool === 'image' ? 'default' : 'ghost'} 
              size="icon"
              onClick={() => setCurrentTool('image')}
              title="Image"
            >
              <ImageIcon size={16} />
            </Button>
            
            <div className="border-t pt-2 mt-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={undo}
                disabled={historyIndex <= 0}
                title="Undo"
              >
                <Undo size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={redo}
                disabled={historyIndex >= canvasHistory.length - 1}
                title="Redo"
              >
                <Redo size={16} />
              </Button>
            </div>
            
            <div className="border-t pt-2 mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-10 h-10" style={{backgroundColor: currentColor}}>
                    <span className="sr-only">Color picker</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="grid grid-cols-4 gap-1 p-1">
                    {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'].map(color => (
                      <button
                        key={color}
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{backgroundColor: color}}
                        onClick={() => setCurrentColor(color)}
                      />
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="border-t pt-2 mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    Size: {currentSize}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {[1, 2, 4, 6, 8, 10].map(size => (
                    <DropdownMenuItem key={size} onClick={() => setCurrentSize(size)}>
                      {size}px
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="border-t pt-2 mt-2">
              <Button 
                variant="destructive" 
                size="sm"
                onClick={clearCanvas}
                className="w-full"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="bg-white shadow-lg border">
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={600}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="cursor-crosshair"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelCanvas;
