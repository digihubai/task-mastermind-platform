
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

interface ColorSelectionProps {
  selectedColor: string;
  updateInfo: (key: string, value: any) => void;
}

export const ColorSelection: React.FC<ColorSelectionProps> = ({ selectedColor, updateInfo }) => {
  const [hexInputValue, setHexInputValue] = useState(selectedColor);
  
  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInputValue(value);
  };
  
  const handleHexInputSave = () => {
    // Validate hex code format
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(hexInputValue)) {
      updateInfo("color", hexInputValue);
    } else if (hexInputValue.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      // If it's missing the # but is otherwise valid
      updateInfo("color", `#${hexInputValue}`);
      setHexInputValue(`#${hexInputValue}`);
    }
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

  return (
    <div>
      <Label>Color</Label>
      <p className="text-sm text-muted-foreground mb-4">Choose an accent color that represents your brand.</p>
      <div className="flex flex-wrap gap-4 mt-2">
        {colorOptions.map((colorOption, index) => (
          <div 
            key={index}
            className="relative"
            onClick={() => updateInfo("color", colorOption.value !== "custom" ? colorOption.value : selectedColor)}
          >
            {colorOption.value === "custom" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded-full cursor-pointer border border-muted flex items-center justify-center"
                    style={{ background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }}
                  >
                    {selectedColor !== colorOptions[0].value &&
                     selectedColor !== colorOptions[1].value &&
                     selectedColor !== colorOptions[2].value &&
                     selectedColor !== colorOptions[3].value &&
                     selectedColor !== colorOptions[4].value && (
                      <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center">
                        <Check size={12} />
                      </div>
                     )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <div className="space-y-3">
                    <HexColorPicker
                      color={selectedColor}
                      onChange={(color) => {
                        updateInfo("color", color);
                        setHexInputValue(color);
                      }}
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
                      style={{ backgroundColor: selectedColor }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div 
                className="w-10 h-10 rounded-full cursor-pointer border border-muted"
                style={{ backgroundColor: colorOption.value }}
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
    </div>
  );
};
