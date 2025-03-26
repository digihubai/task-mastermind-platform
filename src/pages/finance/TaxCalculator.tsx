
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Download, Info, InfoIcon, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TaxCalculator = () => {
  const [country, setCountry] = useState("us");
  const [businessType, setBusinessType] = useState("individual");
  const [incomeType, setIncomeType] = useState("employment");
  
  // Sample tax rates, would be replaced with actual data from API
  const taxRates = {
    us: {
      brackets: [
        { min: 0, max: 10275, rate: 10 },
        { min: 10276, max: 41775, rate: 12 },
        { min: 41776, max: 89075, rate: 22 },
        { min: 89076, max: 170050, rate: 24 },
        { min: 170051, max: 215950, rate: 32 },
        { min: 215951, max: 539900, rate: 35 },
        { min: 539901, max: Infinity, rate: 37 }
      ],
      deductions: {
        standard: 12950,
        businessExpenses: true,
        retirement: true,
        healthcare: true
      }
    },
    uk: {
      brackets: [
        { min: 0, max: 12570, rate: 0 },
        { min: 12571, max: 50270, rate: 20 },
        { min: 50271, max: 150000, rate: 40 },
        { min: 150001, max: Infinity, rate: 45 }
      ],
      deductions: {
        personal: 12570,
        businessExpenses: true,
        pension: true,
      }
    }
  };
  
  const [income, setIncome] = useState(75000);
  const [expenses, setExpenses] = useState(15000);
  const [deductions, setDeductions] = useState(12570);
  
  // Calculate tax based on inputs
  const calculateTax = () => {
    // This is a simplified calculation
    const taxableIncome = Math.max(0, income - expenses - deductions);
    let tax = 0;
    
    // Apply tax brackets
    const brackets = taxRates[country].brackets;
    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      if (taxableIncome > bracket.min) {
        const amountInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        tax += (amountInBracket * bracket.rate) / 100;
      }
    }
    
    return {
      taxableIncome,
      tax,
      effectiveRate: (tax / income * 100).toFixed(2),
      netIncome: income - tax
    };
  };
  
  const taxResults = calculateTax();
  
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="rounded-2xl p-6 mb-2 bg-violet-gradient text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Tax Calculator</h1>
              <p className="mt-2 opacity-90">
                AI-powered tax calculation based on your business and location
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Info size={18} className="mr-2" />
                <span>Tax Guide</span>
              </Button>
              
              <Button
                className="bg-white text-indigo-700 hover:bg-white/90"
              >
                <Download size={18} className="mr-2" />
                <span>Export Results</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Tax Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tax regulations are specific to each country
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger id="business-type">
                        <SelectValue placeholder="Select Business Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual/Sole Proprietor</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corp">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="nonprofit">Non-Profit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="income-type">Primary Income Type</Label>
                    <Select value={incomeType} onValueChange={setIncomeType}>
                      <SelectTrigger id="income-type">
                        <SelectValue placeholder="Select Income Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employment">Employment Income</SelectItem>
                        <SelectItem value="self-employment">Self-Employment</SelectItem>
                        <SelectItem value="business">Business Income</SelectItem>
                        <SelectItem value="investment">Investment Income</SelectItem>
                        <SelectItem value="rental">Rental Income</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="income">Total Income</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon size={14} className="text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80 text-sm">
                              Enter your total income before any deductions or expenses. 
                              This should include all sources of income including employment, 
                              self-employment, investments, etc.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                      <Input 
                        id="income"
                        type="number"
                        className="pl-8"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="expenses">Business Expenses</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon size={14} className="text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80 text-sm">
                              Enter deductible business expenses. These are costs that are 
                              ordinary and necessary for your business operations.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                      <Input 
                        id="expenses"
                        type="number"
                        className="pl-8"
                        value={expenses}
                        onChange={(e) => setExpenses(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="deductions">Additional Deductions</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon size={14} className="text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80 text-sm">
                              Enter other tax deductions such as standard deduction, 
                              retirement contributions, health insurance, etc.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                      <Input 
                        id="deductions"
                        type="number"
                        className="pl-8"
                        value={deductions}
                        onChange={(e) => setDeductions(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button className="w-full sm:w-auto">
                  <Calculator size={18} className="mr-2" />
                  Calculate Tax
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 border shadow-sm">
              <Tabs defaultValue="summary">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="details">Detailed Breakdown</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Gross Income</p>
                      <p className="text-xl font-bold">${income.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Taxable Income</p>
                      <p className="text-xl font-bold">${taxResults.taxableIncome.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Tax</p>
                      <p className="text-xl font-bold">${taxResults.tax.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Net Income</p>
                      <p className="text-xl font-bold">${taxResults.netIncome.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-card rounded-lg border">
                    <h3 className="font-medium text-lg mb-2">Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your inputs, your effective tax rate is <span className="font-semibold">{taxResults.effectiveRate}%</span>. 
                      This rate is calculated based on your total tax liability divided by your gross income.
                    </p>
                    <Separator className="my-4" />
                    <p className="text-sm text-muted-foreground">
                      Your tax calculation is based on {country === 'us' ? 'United States' : 'United Kingdom'} tax regulations 
                      for {businessType === 'individual' ? 'individuals' : 'businesses'}.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    Detailed tax bracket and calculation information would appear here, showing how each 
                    portion of income is taxed at different rates.
                  </p>
                </TabsContent>
                
                <TabsContent value="recommendations" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border bg-green-50 dark:bg-green-900/10 flex items-start gap-3">
                      <div className="rounded-full p-1 bg-green-200 dark:bg-green-800">
                        <Check size={16} className="text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Consider retirement contributions</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Increasing your retirement contributions could reduce your taxable income.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-green-50 dark:bg-green-900/10 flex items-start gap-3">
                      <div className="rounded-full p-1 bg-green-200 dark:bg-green-800">
                        <Check size={16} className="text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Track business expenses</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Ensure you're tracking all eligible business expenses to maximize deductions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-green-50 dark:bg-green-900/10 flex items-start gap-3">
                      <div className="rounded-full p-1 bg-green-200 dark:bg-green-800">
                        <Check size={16} className="text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Consider health savings account</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          HSA contributions are tax-deductible and can reduce your taxable income.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 border shadow-sm bg-card-gradient">
              <h3 className="font-semibold text-lg mb-4">Tax Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h4 className="font-medium text-sm mb-2">Effective Tax Rate</h4>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold">{taxResults.effectiveRate}%</span>
                    <span className="text-sm text-muted-foreground">vs 24.7% avg</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-violet-500 rounded-full" 
                      style={{ width: `${Math.min(100, Number(taxResults.effectiveRate) * 2)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h4 className="font-medium text-sm mb-2">Deduction Utilization</h4>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold">82%</span>
                    <span className="text-sm text-green-500">+12% from last year</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h4 className="font-medium text-sm mb-3">Tax Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs">Federal</span>
                      </div>
                      <span className="text-xs font-medium">68%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-xs">State</span>
                      </div>
                      <span className="text-xs font-medium">22%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs">Local</span>
                      </div>
                      <span className="text-xs font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Tax Calendar</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      15
                    </div>
                    <div>
                      <p className="font-medium text-sm">Quarterly Estimated Tax</p>
                      <p className="text-xs text-muted-foreground">Due January 15, 2024</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-600 rounded-full">
                    Upcoming
                  </span>
                </div>
                
                <div className="p-3 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      17
                    </div>
                    <div>
                      <p className="font-medium text-sm">Tax Filing Deadline</p>
                      <p className="text-xs text-muted-foreground">Due April 17, 2024</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    Future
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TaxCalculator;
