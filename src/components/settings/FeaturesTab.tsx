
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { FeatureCategory } from "@/types/settings";
import { useToast } from "@/hooks/use-toast";

interface FeaturesTabProps {
  featureCategories: FeatureCategory[];
  onToggleFeature: (categoryIndex: number, featureIndex: number) => void;
  onDeleteFeature: (categoryIndex: number, featureIndex: number) => void;
  onAddFeature: (name: string, description: string, category: string) => void;
}

const FeaturesTab: React.FC<FeaturesTabProps> = ({
  featureCategories,
  onToggleFeature,
  onDeleteFeature,
  onAddFeature
}) => {
  const { toast } = useToast();
  const [newFeatureName, setNewFeatureName] = useState("");
  const [newFeatureDescription, setNewFeatureDescription] = useState("");
  const [newFeatureCategory, setNewFeatureCategory] = useState(featureCategories[0]?.name || "");

  const handleAddFeature = () => {
    if (!newFeatureName.trim()) {
      toast({
        title: "Feature name required",
        description: "Please enter a name for the feature",
        variant: "destructive",
      });
      return;
    }
    
    onAddFeature(newFeatureName, newFeatureDescription, newFeatureCategory);
    setNewFeatureName("");
    setNewFeatureDescription("");
  };

  return (
    <Card className="border border-border/40">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Feature Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="new-feature-name">Feature Name</Label>
            <Input
              id="new-feature-name"
              value={newFeatureName}
              onChange={(e) => setNewFeatureName(e.target.value)}
              placeholder="Enter feature name"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="new-feature-category">Category</Label>
            <select
              id="new-feature-category"
              value={newFeatureCategory}
              onChange={(e) => setNewFeatureCategory(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary/20 transition-colors"
            >
              {featureCategories.map((category, index) => (
                <option key={index} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="new-feature-description">Description</Label>
            <Input
              id="new-feature-description"
              value={newFeatureDescription}
              onChange={(e) => setNewFeatureDescription(e.target.value)}
              placeholder="Enter feature description"
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            onClick={handleAddFeature}
            className="flex items-center gap-2"
          >
            <PlusCircle size={16} />
            <span>Add Feature</span>
          </Button>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-6">
          {featureCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border border-border/40 rounded-lg overflow-hidden">
              <div className="bg-secondary/50 px-4 py-3 border-b border-border/40">
                <h3 className="font-medium">{category.name}</h3>
              </div>
              
              <div className="p-4 space-y-2">
                {category.features.map((feature, featureIndex) => (
                  <div key={feature.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50">
                    <div className="flex-1">
                      <p className="font-medium">{feature.name}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`feature-${feature.id}`}
                        checked={feature.included}
                        onCheckedChange={() => onToggleFeature(categoryIndex, featureIndex)}
                      />
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => onDeleteFeature(categoryIndex, featureIndex)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {category.features.length === 0 && (
                  <p className="text-sm text-muted-foreground py-2">No features in this category</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default FeaturesTab;
