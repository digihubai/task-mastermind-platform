
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag, Plus, Calendar, Percent, DollarSign, Clipboard, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/Badge";

const Coupons = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);
  
  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    
    toast({
      title: "Copied!",
      description: `Coupon code ${code} copied to clipboard`,
    });
    
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Coupons</h1>
            <p className="text-muted-foreground mt-1">
              Manage discount coupons and promotional offers
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Generate report",
                  description: "Coupon usage report will be available soon",
                });
              }}
            >
              Generate Report
            </Button>
            
            <Button 
              className="flex items-center gap-2"
              onClick={() => {
                toast({
                  title: "Create coupon",
                  description: "Coupon creation form will be available soon",
                });
              }}
            >
              <Plus size={18} />
              <span>New Coupon</span>
            </Button>
          </div>
        </div>
        
        <Card className="border border-border/40">
          <div className="p-4 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="font-medium">Active Coupons</h2>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Search coupons..." 
                  className="w-full md:w-auto"
                />
                
                <Button variant="outline">Filter</Button>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              {[
                { code: "WELCOME25", discount: "25%", type: "Percentage", usage: "32/100", expires: "2023-12-31", status: "Active" },
                { code: "SUMMER10OFF", discount: "$10", type: "Fixed Amount", usage: "45/50", expires: "2023-09-30", status: "Active" },
                { code: "FREESHIP", discount: "Free Shipping", type: "Special", usage: "120/200", expires: "2023-10-15", status: "Active" },
                { code: "FALL15", discount: "15%", type: "Percentage", usage: "0/100", expires: "2023-11-30", status: "Scheduled" },
                { code: "BLACKFRIDAY", discount: "30%", type: "Percentage", usage: "75/100", expires: "2022-11-28", status: "Expired" }
              ].map((coupon, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-md">
                  <div className="flex items-start gap-4 mb-4 md:mb-0">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Tag size={20} className="text-primary" />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{coupon.code}</h3>
                        <button 
                          className="p-1 hover:bg-secondary rounded-md transition-colors"
                          onClick={() => copyCouponCode(coupon.code)}
                        >
                          {copied === coupon.code ? 
                            <Check size={14} className="text-green-500" /> : 
                            <Clipboard size={14} className="text-muted-foreground" />
                          }
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Percent size={12} className="mr-1" />
                          <span>{coupon.discount} ({coupon.type})</span>
                        </div>
                        
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar size={12} className="mr-1" />
                          <span>Expires: {coupon.expires}</span>
                        </div>
                        
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Tag size={12} className="mr-1" />
                          <span>Usage: {coupon.usage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        coupon.status === "Active" ? "success" : 
                        coupon.status === "Scheduled" ? "warning" : 
                        "danger"
                      }
                    >
                      {coupon.status}
                    </Badge>
                    
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Percent size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Percentage Discounts</h3>
                <p className="text-xs text-muted-foreground">Discount based on percentage</p>
              </div>
            </div>
            <Button className="w-full" variant="outline">Create</Button>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Fixed Amount</h3>
                <p className="text-xs text-muted-foreground">Discount with fixed amount</p>
              </div>
            </div>
            <Button className="w-full" variant="outline">Create</Button>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Tag size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Special Offers</h3>
                <p className="text-xs text-muted-foreground">Free shipping, BOGO, etc.</p>
              </div>
            </div>
            <Button className="w-full" variant="outline">Create</Button>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Coupons;
