
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, DollarSign, Plus, PlusCircle, Trash2 } from "lucide-react";
import { PricingPlan, FeatureCategory } from "@/types/settings";
import { useToast } from "@/hooks/use-toast";

interface PricingTabProps {
  pricingPlans: PricingPlan[];
  featureCategories: FeatureCategory[];
  onPlanChange: (planId: string, field: keyof PricingPlan, value: any) => void;
  onPlanFeatureToggle: (planId: string, featureId: string) => void;
  onAddPlan: () => void;
  onDeletePlan: (planId: string) => void;
}

const PricingTab: React.FC<PricingTabProps> = ({
  pricingPlans,
  featureCategories,
  onPlanChange,
  onPlanFeatureToggle,
  onAddPlan,
  onDeletePlan
}) => {
  const { toast } = useToast();

  return (
    <Card className="border border-border/40">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Pricing Plans</h2>
          <Button
            onClick={onAddPlan}
            className="flex items-center gap-2"
            variant="outline"
          >
            <PlusCircle size={16} />
            <span>Add Plan</span>
          </Button>
        </div>
        
        <div className="space-y-6">
          {pricingPlans.map(plan => (
            <Card key={plan.id} className="border border-border/40">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Input
                        value={plan.name}
                        onChange={(e) => onPlanChange(plan.id, 'name', e.target.value)}
                        className="text-xl font-semibold h-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-destructive"
                        onClick={() => onDeletePlan(plan.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                    
                    <Input
                      value={plan.description}
                      onChange={(e) => onPlanChange(plan.id, 'description', e.target.value)}
                      className="text-muted-foreground mb-4"
                    />
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`plan-popular-${plan.id}`}>Popular</Label>
                        <Switch
                          id={`plan-popular-${plan.id}`}
                          checked={plan.isPopular}
                          onCheckedChange={(checked) => onPlanChange(plan.id, 'isPopular', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`plan-period-${plan.id}`}>Annual Billing</Label>
                        <Switch
                          id={`plan-period-${plan.id}`}
                          checked={plan.billingPeriod === 'yearly'}
                          onCheckedChange={(checked) => onPlanChange(plan.id, 'billingPeriod', checked ? 'yearly' : 'monthly')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <div className="flex items-center gap-2">
                      <DollarSign size={20} className="text-muted-foreground" />
                      <Input
                        type="number"
                        value={plan.price}
                        onChange={(e) => onPlanChange(plan.id, 'price', parseFloat(e.target.value) || 0)}
                        className="w-24 text-2xl font-bold h-10"
                      />
                      <span className="text-muted-foreground">/ {plan.billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h3 className="font-medium mb-4">Plan Features</h3>
                
                <div className="space-y-6">
                  {featureCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">{category.name}</h4>
                      <div className="space-y-2">
                        {category.features.map((feature) => {
                          const planFeature = plan.features.find(f => f.id === feature.id);
                          const isIncluded = planFeature ? planFeature.included : false;
                          
                          return (
                            <div key={feature.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50">
                              <div className="flex-1">
                                <p className="font-medium">{feature.name}</p>
                                <p className="text-xs text-muted-foreground">{feature.description}</p>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                {planFeature && planFeature.limits && planFeature.limits.type !== 'unlimited' && (
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      value={planFeature.limits.value}
                                      onChange={(e) => {
                                        const value = parseInt(e.target.value) || 0;
                                        onPlanChange(plan.id, 'features', plan.features.map(f => {
                                          if (f.id === feature.id) {
                                            return {
                                              ...f,
                                              limits: {
                                                ...f.limits,
                                                value
                                              }
                                            };
                                          }
                                          return f;
                                        }));
                                      }}
                                      className="w-20 h-8 text-sm"
                                    />
                                    <span className="text-xs text-muted-foreground">{planFeature.limits.unit}</span>
                                  </div>
                                )}
                                
                                {planFeature && planFeature.limits && planFeature.limits.type === 'unlimited' ? (
                                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                    Unlimited
                                  </Badge>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={`rounded-full h-6 w-6 p-0 ${isIncluded ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                                      onClick={() => onPlanFeatureToggle(plan.id, feature.id)}
                                    >
                                      {isIncluded ? <Check size={14} /> : <Plus size={14} />}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PricingTab;
