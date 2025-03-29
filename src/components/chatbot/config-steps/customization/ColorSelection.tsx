
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { toast } from "sonner";

interface ColorSelectionProps {
  selectedColor: string;
  updateInfo: (key: string, value: any) => void;
}

export const ColorSelection: React.FC<ColorSelectionProps> = ({ selectedColor, updateInfo }) => {
  const [hexInputValue, setHexInputValue] = useState(selectedColor);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  
  // Sync the input value when the prop changes
  useEffect(() => {
    setHexInputValue(selectedColor);
  }, [selectedColor]);
  
  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInputValue(value);
  };
  
  const handleHexInputSave = () => {
    // Validate hex code format
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(hexInputValue)) {
      updateInfo("color", hexInputValue);
      setColorPickerOpen(false); // Close after saving
      toast.success("Color updated successfully");
    } else if (hexInputValue.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      // If it's missing the # but is otherwise valid
      const colorWithHash = `#${hexInputValue}`;
      updateInfo("color", colorWithHash);
      setHexInputValue(colorWithHash);
      setColorPickerOpen(false); // Close after saving
      toast.success("Color updated successfully");
    } else {
      toast.error("Invalid color format. Please use a valid hex code.");
    }
  };
  
  // Handle direct color picker changes
  const handleColorChange = (color: string) => {
    setHexInputValue(color);
    // Apply color directly when picked
    updateInfo("color", color);
  };
  
  // Define color options
  const colorOptions = [
    { value: "#000000", label: "Black" },
    { value: "#4CAF50", label: "Green" },
    { value: "#FF9800", label: "Orange" },
    { value: "#9C27B0", label: "Purple" },
    { value: "#2196F3", label: "Blue" },
    { value: "custom", label: "Custom" },
  ];

  const isSelectedColorInPresets = colorOptions.some(color => color.value === selectedColor && color.value !== "custom");

  return (
    <div>
      <Label>Color</Label>
      <p className="text-sm text-muted-foreground mb-4">Choose an accent color that represents your brand.</p>
      <div className="flex flex-wrap gap-4 mt-2">
        {colorOptions.map((colorOption, index) => (
          <div 
            key={index}
            className="relative"
          >
            {colorOption.value === "custom" ? (
              <Popover open={colorPickerOpen} onOpenChange={setColorPickerOpen}>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded-full cursor-pointer border border-muted flex items-center justify-center"
                    style={{ background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }}
                  >
                    {!isSelectedColorInPresets && (
                      <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center">
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <div className="space-y-3">
                    <HexColorPicker
                      color={hexInputValue}
                      onChange={handleColorChange}
                    />
                    
                    <div className="flex mt-2 gap-2">
                      <Input 
                        value={hexInputValue}
                        onChange={handleHexInputChange}
                        placeholder="#RRGGBB"
                        className="text-sm"
                      />
                      <Button 
                        size="sm" 
                        onClick={handleHexInputSave}
                      >
                        Save
                      </Button>
                    </div>
                    
                    <div 
                      className="w-full h-8 rounded"
                      style={{ backgroundColor: hexInputValue }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div 
                className={`w-10 h-10 rounded-full cursor-pointer border ${selectedColor === colorOption.value ? 'border-primary border-2' : 'border-muted'}`}
                style={{ backgroundColor: colorOption.value }}
                onClick={() => {
                  updateInfo("color", colorOption.value);
                  toast.success(`Color updated to ${colorOption.label}`);
                }}
              >
                {selectedColor === colorOption.value && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <Check size={16} />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!isSelectedColorInPresets && (
        <div className="mt-4 flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full border border-muted"
            style={{ backgroundColor: selectedColor }}
          ></div>
          <span className="text-sm font-mono">{selectedColor}</span>
        </div>
      )}
    </div>
  );
};
