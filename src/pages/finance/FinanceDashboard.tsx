
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  CreditCard,
  BarChart2,
  Calculator,
  ArrowUpRight,
  Download,
  Filter,
  Plus,
  Calendar,
  Wallet,
  Building,
  FileText,
  PieChart,
  LineChart,
  TrendingUp,
  ArrowUpDown,
  Banknote,
  Receipt
} from "lucide-react";
import FinanceTransactionList from "./FinanceTransactionList";
import FinanceStatCards from "./FinanceStatCards";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FinanceDashboard = () => {
  const [period, setPeriod] = useState("month");
  
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="rounded-2xl p-6 mb-2 bg-violet-gradient text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Financial Dashboard</h1>
              <p className="mt-2 opacity-90">
                AI-powered financial management and analytics
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Calculator size={18} className="mr-2" />
                <span>Tax Calculator</span>
              </Button>
              
              <Button
                className="bg-white text-indigo-700 hover:bg-white/90"
              >
                <Plus size={18} className="mr-2" />
                <span>New Transaction</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs defaultValue={period} onValueChange={setPeriod} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-[400px] grid-cols-4">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input type="text" placeholder="Oct 1 - Oct 31, 2023" className="pl-10 pr-4 py-2 w-full" />
            </div>
            
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
            
            <Button variant="outline" size="icon">
              <Download size={16} />
            </Button>
          </div>
        </div>
        
        <FinanceStatCards />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2 p-0 overflow-hidden border shadow-sm">
            <div className="p-6 border-b bg-card">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Transactions</h3>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="All Accounts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Accounts</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm">
                    <ArrowUpDown size={14} className="mr-1" />
                    Sort
                  </Button>
                </div>
              </div>
            </div>
            
            <FinanceTransactionList />
          </Card>
          
          <div className="space-y-6">
            <Card className="border shadow-sm overflow-hidden p-6 bg-card-gradient">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Upcoming Payments</h3>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Building size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Office Rent</p>
                      <p className="text-xs text-muted-foreground">Due Oct 15</p>
                    </div>
                  </div>
                  <span className="font-semibold">$2,500</span>
                </div>
                
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-rose-100 p-2 rounded-full">
                      <CreditCard size={18} className="text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Credit Card</p>
                      <p className="text-xs text-muted-foreground">Due Oct 22</p>
                    </div>
                  </div>
                  <span className="font-semibold">$1,840</span>
                </div>
                
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FileText size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Software License</p>
                      <p className="text-xs text-muted-foreground">Due Oct 28</p>
                    </div>
                  </div>
                  <span className="font-semibold">$750</span>
                </div>
              </div>
            </Card>
            
            <Card className="border shadow-sm overflow-hidden p-6 bg-card-gradient">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Income Distribution</h3>
                <Select defaultValue="month">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                    <span className="text-sm">Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <span className="text-sm">Investments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Other</span>
                  </div>
                </div>
                
                <div className="w-32 h-32 relative flex items-center justify-center">
                  {/* This would be a real chart component in production */}
                  <div className="absolute inset-0 border-8 border-violet-500 rounded-full"></div>
                  <div className="absolute inset-2 border-8 border-blue-500 rounded-full"></div>
                  <div className="absolute inset-4 border-8 border-teal-500 rounded-full"></div>
                  <div className="absolute inset-6 border-8 border-amber-500 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">100%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2 p-6 border shadow-sm bg-card-gradient">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Revenue Forecast</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                  <span className="text-sm">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span className="text-sm">Projected</span>
                </div>
              </div>
            </div>
            
            <div className="h-[250px] flex items-end gap-2">
              {/* Chart simulation - would use Recharts in real implementation */}
              {[45, 60, 75, 90, 80, 95, 65, 75, 85, 90, 70, 80].map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className={`w-full rounded-t-sm ${i > 7 ? 'bg-blue-400' : 'bg-violet-500'}`} 
                    style={{ height: `${value * 2}px` }}
                  ></div>
                  <span className="text-xs text-muted-foreground">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 border shadow-sm bg-card-gradient">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                <Receipt size={20} />
                <span className="text-xs">New Invoice</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                <Calculator size={20} />
                <span className="text-xs">Tax Calculator</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                <Banknote size={20} />
                <span className="text-xs">Pay Bill</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                <LineChart size={20} />
                <span className="text-xs">Financial Report</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default FinanceDashboard;
