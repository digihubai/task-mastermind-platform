
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CSATSettingsProps {
  enableCSAT: boolean;
  setEnableCSAT: (enabled: boolean) => void;
  csatThreshold: number;
  setCsatThreshold: (threshold: number) => void;
}

interface SurveyQuestion {
  id: string;
  text: string;
  enabled: boolean;
}

const CSATSettings: React.FC<CSATSettingsProps> = ({ 
  enableCSAT, 
  setEnableCSAT, 
  csatThreshold,
  setCsatThreshold
}) => {
  const [questions, setQuestions] = useState<SurveyQuestion[]>([
    { id: "q1", text: "How would you rate your experience?", enabled: true },
    { id: "q2", text: "Was your issue resolved?", enabled: true },
    { id: "q3", text: "Would you recommend our service?", enabled: true },
    { id: "q4", text: "Any additional comments?", enabled: false }
  ]);
  const [newQuestion, setNewQuestion] = useState("");

  const toggleQuestion = (id: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, enabled: !q.enabled } : q
    ));
  };

  const addQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const newId = `q${questions.length + 1}`;
    setQuestions([...questions, { id: newId, text: newQuestion, enabled: true }]);
    setNewQuestion("");
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Customer Satisfaction Survey (CSAT)</h3>
          <p className="text-sm text-muted-foreground">Configure post-chat customer satisfaction surveys</p>
        </div>
        <Switch 
          checked={enableCSAT}
          onCheckedChange={setEnableCSAT}
        />
      </div>
      
      {enableCSAT && (
        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="csat-threshold">Minimum CSAT Threshold (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="csat-threshold"
                defaultValue={[csatThreshold]}
                max={100}
                min={0}
                step={1}
                onValueChange={(value) => setCsatThreshold(value[0])}
                className="flex-1"
              />
              <Input 
                type="number" 
                value={csatThreshold} 
                onChange={(e) => setCsatThreshold(Number(e.target.value))} 
                className="w-16"
                min={0}
                max={100}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Alerts will be triggered when CSAT falls below this threshold
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <Label>Survey Questions</Label>
              <Badge variant="outline" className="text-xs">
                {questions.filter(q => q.enabled).length} Active
              </Badge>
            </div>
            
            <div className="space-y-2 border rounded-md p-3">
              {questions.map((question) => (
                <div key={question.id} className="flex items-center justify-between group">
                  <div className="flex-1 mr-2">
                    <Input 
                      value={question.text} 
                      onChange={(e) => {
                        setQuestions(questions.map(q => 
                          q.id === question.id ? { ...q, text: e.target.value } : q
                        ));
                      }}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex items-center">
                    <Switch 
                      checked={question.enabled} 
                      onCheckedChange={() => toggleQuestion(question.id)}
                      className="mr-2"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeQuestion(question.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder="Add a new survey question..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="text-sm"
                />
                <Button onClick={addQuestion} disabled={!newQuestion.trim()} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center">
              <span>Survey Trigger</span>
            </Label>
            <div className="space-y-1">
              <div className="flex items-center">
                <input type="radio" id="auto-trigger" name="survey-trigger" defaultChecked className="mr-2" />
                <Label htmlFor="auto-trigger" className="text-sm font-normal">Automatically after conversation ends</Label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="manual-trigger" name="survey-trigger" className="mr-2" />
                <Label htmlFor="manual-trigger" className="text-sm font-normal">Manually triggered by agent</Label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSATSettings;
