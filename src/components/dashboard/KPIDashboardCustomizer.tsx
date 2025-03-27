
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Check, Sliders, XCircle, AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface KpiItem {
  id: string;
  title: string;
  visible: boolean;
  metricType: "value" | "percentage" | "currency";
  icon: "users" | "dollar" | "briefcase" | "check" | "target" | "clock" | "custom";
}

interface KPIDashboardCustomizerProps {
  kpis: KpiItem[];
  onSave: (kpis: KpiItem[]) => void;
}

const KPIDashboardCustomizer: React.FC<KPIDashboardCustomizerProps> = ({ kpis: initialKpis, onSave }) => {
  const [kpis, setKpis] = useState<KpiItem[]>(initialKpis);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(kpis);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setKpis(items);
  };

  const handleToggleVisibility = (id: string) => {
    setKpis(
      kpis.map(kpi => 
        kpi.id === id ? { ...kpi, visible: !kpi.visible } : kpi
      )
    );
  };

  const handleChangeMetricType = (id: string, metricType: "value" | "percentage" | "currency") => {
    setKpis(
      kpis.map(kpi => 
        kpi.id === id ? { ...kpi, metricType } : kpi
      )
    );
  };

  const handleChangeIcon = (id: string, icon: "users" | "dollar" | "briefcase" | "check" | "target" | "clock" | "custom") => {
    setKpis(
      kpis.map(kpi => 
        kpi.id === id ? { ...kpi, icon } : kpi
      )
    );
  };

  const handleSave = () => {
    onSave(kpis);
    setOpen(false);
    toast({
      title: "Dashboard customized",
      description: "Your KPI dashboard has been updated"
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Sliders size={16} />
          <span>Customize KPIs</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize KPI Dashboard</DialogTitle>
          <DialogDescription>
            Drag and drop KPIs to reorder them. Toggle visibility and customize display options.
          </DialogDescription>
        </DialogHeader>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="kpis">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2 my-4"
              >
                {kpis.map((kpi, index) => (
                  <Draggable key={kpi.id} draggableId={kpi.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 ${kpi.visible ? 'border-primary/30' : 'border-muted opacity-70'}`}
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{kpi.title}</div>
                            <Switch 
                              checked={kpi.visible} 
                              onCheckedChange={() => handleToggleVisibility(kpi.id)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Metric Type</Label>
                              <Select 
                                value={kpi.metricType} 
                                onValueChange={(value) => handleChangeMetricType(kpi.id, value as any)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select metric type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="value">Value</SelectItem>
                                  <SelectItem value="percentage">Percentage</SelectItem>
                                  <SelectItem value="currency">Currency</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Icon</Label>
                              <Select 
                                value={kpi.icon} 
                                onValueChange={(value) => handleChangeIcon(kpi.id, value as any)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select icon" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="users">Users</SelectItem>
                                  <SelectItem value="dollar">Dollar</SelectItem>
                                  <SelectItem value="briefcase">Briefcase</SelectItem>
                                  <SelectItem value="check">Check</SelectItem>
                                  <SelectItem value="target">Target</SelectItem>
                                  <SelectItem value="clock">Clock</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {kpi.visible ? (
                              <Check size={14} className="text-green-500" />
                            ) : (
                              <XCircle size={14} className="text-muted-foreground" />
                            )}
                            <span>
                              {kpi.visible ? "Visible on dashboard" : "Hidden from dashboard"}
                            </span>
                          </div>
                        </div>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KPIDashboardCustomizer;
