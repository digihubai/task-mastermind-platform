
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  ArrowRight,
  Globe,
  BookOpen,
  FileEdit,
  Image as ImageIcon,
  Link
} from "lucide-react";

interface StepIndicatorProps {
  activeStep: number;
  maxAllowedStep: number;
  setActiveStep: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  activeStep, 
  maxAllowedStep, 
  setActiveStep 
}) => {
  const steps = [
    { step: 1, label: "Topic", icon: Search },
    { step: 2, label: "Keywords", icon: FileEdit },
    { step: 3, label: "Title", icon: BookOpen },
    { step: 4, label: "Outline", icon: ArrowRight },
    { step: 5, label: "Images", icon: ImageIcon },
    { step: 6, label: "Links", icon: Link },
    { step: 7, label: "Content", icon: Globe }
  ];

  return (
    <Card className="border-border/40">
      <div className="w-full overflow-auto">
        <div className="flex border-b">
          {steps.map(({ step, label, icon: Icon }) => (
            <button
              key={step}
              onClick={() => step <= maxAllowedStep && setActiveStep(step)}
              className={`
                flex items-center whitespace-nowrap px-4 py-3 border-b-2 text-sm font-medium
                ${activeStep === step 
                  ? "border-primary text-primary" 
                  : step <= maxAllowedStep
                    ? "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    : "border-transparent text-muted-foreground/50 cursor-not-allowed"}
              `}
              disabled={step > maxAllowedStep}
            >
              <div className={`rounded-full h-6 w-6 flex items-center justify-center mr-2 ${
                activeStep === step 
                  ? "bg-primary text-primary-foreground" 
                  : step < activeStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}>
                {step < activeStep ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  <span className="text-xs">{step}</span>
                )}
              </div>
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default StepIndicator;
