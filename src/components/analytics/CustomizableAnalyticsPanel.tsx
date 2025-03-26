
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, X, Save, Undo, LayoutGrid, LayoutList, BarChart3, LineChart, PieChart, GanttChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomizableAnalyticsPanelProps {
  onSave: () => void;
}

interface WidgetItem {
  id: string;
  title: string;
  type: string;
  enabled: boolean;
}

const CustomizableAnalyticsPanel: React.FC<CustomizableAnalyticsPanelProps> = ({ onSave }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("layout");
  const [widgets, setWidgets] = useState<WidgetItem[]>([
    { id: "widget-1", title: "Revenue vs Spend", type: "bar", enabled: true },
    { id: "widget-2", title: "ROAS by Channel", type: "bar", enabled: true },
    { id: "widget-3", title: "Top Campaigns", type: "horizontal-bar", enabled: true },
    { id: "widget-4", title: "Conversion Funnel", type: "funnel", enabled: true },
    { id: "widget-5", title: "Revenue by Device", type: "pie", enabled: true },
  ]);
  
  const handleToggleWidget = (id: string) => {
    setWidgets(
      widgets.map(widget => 
        widget.id === id 
          ? { ...widget, enabled: !widget.enabled } 
          : widget
      )
    );
  };
  
  const handleAddWidget = () => {
    const newId = `widget-${widgets.length + 1}`;
    setWidgets([
      ...widgets,
      { id: newId, title: "New Widget", type: "bar", enabled: true }
    ]);
    
    toast({
      title: "Widget Added",
      description: "New widget has been added to your dashboard."
    });
  };
  
  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
    
    toast({
      title: "Widget Removed",
      description: "Widget has been removed from your dashboard."
    });
  };
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setWidgets(items);
  };
  
  const handleSaveLayout = () => {
    toast({
      title: "Layout Saved",
      description: "Your customized dashboard layout has been saved."
    });
    onSave();
  };
  
  const handleUpdateWidgetTitle = (id: string, newTitle: string) => {
    setWidgets(
      widgets.map(widget => 
        widget.id === id 
          ? { ...widget, title: newTitle } 
          : widget
      )
    );
  };
  
  const handleUpdateWidgetType = (id: string, newType: string) => {
    setWidgets(
      widgets.map(widget => 
        widget.id === id 
          ? { ...widget, type: newType } 
          : widget
      )
    );
  };
  
  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return <BarChart3 size={16} />;
      case 'line':
        return <LineChart size={16} />;
      case 'pie':
        return <PieChart size={16} />;
      default:
        return <GanttChart size={16} />;
    }
  };
  
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Customize Dashboard</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onSave()}>Cancel</Button>
            <Button onClick={handleSaveLayout} className="gap-2">
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="layout" className="gap-2">
              <LayoutGrid size={16} />
              Layout
            </TabsTrigger>
            <TabsTrigger value="widgets" className="gap-2">
              <LayoutList size={16} />
              Widgets
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="layout">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Arrange Dashboard Widgets</h3>
                <Button variant="outline" size="sm" onClick={handleAddWidget} className="gap-1">
                  <Plus size={14} />
                  Add Widget
                </Button>
              </div>
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="widgets">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {widgets.map((widget, index) => (
                        <Draggable key={widget.id} draggableId={widget.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 border rounded-md flex items-center justify-between ${widget.enabled ? 'bg-card' : 'bg-muted/50'}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-md">
                                  {getWidgetIcon(widget.type)}
                                </div>
                                <div>
                                  <p className="font-medium">{widget.title}</p>
                                  <p className="text-xs text-muted-foreground capitalize">{widget.type} chart</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Switch 
                                  checked={widget.enabled}
                                  onCheckedChange={() => handleToggleWidget(widget.id)}
                                />
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleRemoveWidget(widget.id)}
                                >
                                  <X size={16} />
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </TabsContent>
          
          <TabsContent value="widgets">
            <div className="space-y-6">
              {widgets.map((widget) => (
                <div key={widget.id} className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{widget.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveWidget(widget.id)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${widget.id}`}>Widget Title</Label>
                      <Input 
                        id={`title-${widget.id}`}
                        value={widget.title}
                        onChange={(e) => handleUpdateWidgetTitle(widget.id, e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`type-${widget.id}`}>Chart Type</Label>
                      <Select 
                        value={widget.type}
                        onValueChange={(value) => handleUpdateWidgetType(widget.id, value)}
                      >
                        <SelectTrigger id={`type-${widget.id}`}>
                          <SelectValue placeholder="Select chart type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="area">Area Chart</SelectItem>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                          <SelectItem value="horizontal-bar">Horizontal Bar Chart</SelectItem>
                          <SelectItem value="funnel">Funnel Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`enabled-${widget.id}`}
                      checked={widget.enabled}
                      onCheckedChange={() => handleToggleWidget(widget.id)}
                    />
                    <Label htmlFor={`enabled-${widget.id}`}>Enabled</Label>
                  </div>
                </div>
              ))}
              
              <Button onClick={handleAddWidget} className="w-full gap-2">
                <Plus size={16} />
                Add New Widget
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomizableAnalyticsPanel;
