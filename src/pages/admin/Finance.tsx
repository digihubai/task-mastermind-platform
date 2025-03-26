
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  CreditCard,
  DollarSign,
  BarChart2,
  FileText,
  Calendar,
  ChevronDown,
  Trash2,
  PlusCircle,
  Download,
  Upload,
  Users,
  TrendingUp,
  TrendingDown,
  Settings
} from "lucide-react";

// Mock financial data
const mockInvoices = [
  { id: "INV-001", client: "Acme Corporation", amount: 4750.00, status: "paid", date: "2024-05-15", dueDate: "2024-06-15" },
  { id: "INV-002", client: "Tech Solutions Inc.", amount: 1890.00, status: "pending", date: "2024-05-18", dueDate: "2024-06-18" },
  { id: "INV-003", client: "Global Retail", amount: 3200.00, status: "overdue", date: "2024-04-20", dueDate: "2024-05-20" },
  { id: "INV-004", client: "Innovate Solutions", amount: 5600.00, status: "paid", date: "2024-05-10", dueDate: "2024-06-10" },
  { id: "INV-005", client: "Startup XYZ", amount: 1200.00, status: "pending", date: "2024-05-22", dueDate: "2024-06-22" }
];

const mockExpenses = [
  { id: "EXP-001", category: "Software Subscriptions", amount: 450.00, date: "2024-05-04", status: "approved" },
  { id: "EXP-002", category: "Office Supplies", amount: 120.00, date: "2024-05-10", status: "pending" },
  { id: "EXP-003", category: "Travel", amount: 850.00, date: "2024-04-28", status: "approved" },
  { id: "EXP-004", category: "Professional Services", amount: 1200.00, date: "2024-05-15", status: "approved" },
  { id: "EXP-005", category: "Hardware", amount: 2000.00, date: "2024-05-20", status: "pending" }
];

const mockTaxRates = [
  { country: "United States", standard: "0-37%", sales: "0-13%", corporateIncome: "21%" },
  { country: "United Kingdom", standard: "20%", reduced: "5%", corporateIncome: "19%" },
  { country: "Germany", standard: "19%", reduced: "7%", corporateIncome: "15%" },
  { country: "Canada", standard: "5%", provincial: "0-10%", corporateIncome: "15-38%" },
  { country: "Australia", standard: "10%", corporateIncome: "30%" }
];

const recentTransactions = [
  { id: "TRX-001", description: "Invoice payment - INV-001", amount: 4750.00, type: "income", date: "2024-05-15" },
  { id: "TRX-002", description: "Software subscription", amount: -450.00, type: "expense", date: "2024-05-04" },
  { id: "TRX-003", description: "Invoice payment - INV-004", amount: 5600.00, type: "income", date: "2024-05-10" },
  { id: "TRX-004", description: "Office supplies", amount: -120.00, type: "expense", date: "2024-05-10" },
  { id: "TRX-005", description: "Professional services", amount: -1200.00, type: "expense", date: "2024-05-15" }
];

// Financial reports
const monthlyRevenue = [
  { month: "Jan", amount: 12500 },
  { month: "Feb", amount: 14200 },
  { month: "Mar", amount: 15800 },
  { month: "Apr", amount: 18900 },
  { month: "May", amount: 17500 },
  { month: "Jun", amount: 0 }, // Future
  { month: "Jul", amount: 0 }, // Future
  { month: "Aug", amount: 0 }, // Future
  { month: "Sep", amount: 0 }, // Future
  { month: "Oct", amount: 0 }, // Future
  { month: "Nov", amount: 0 }, // Future
  { month: "Dec", amount: 0 }  // Future
];

const Finance = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCountry, setSelectedCountry] = useState("United States");

  const totalRevenue = mockInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const profit = totalRevenue - totalExpenses;
  const profitMargin = (profit / totalRevenue) * 100;

  const pendingInvoices = mockInvoices.filter(invoice => invoice.status === "pending" || invoice.status === "overdue");
  const pendingAmount = pendingInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);

  const handleAddInvoice = () => {
    toast({
      title: "Create Invoice",
      description: "Invoice creation form will be available soon",
    });
  };

  const handleAddExpense = () => {
    toast({
      title: "Add Expense",
      description: "Expense creation form will be available soon",
    });
  };

  const handleConnectAccounting = () => {
    toast({
      title: "Connect Accounting Software",
      description: "Integration with accounting software will be available soon",
    });
  };

  const handleAITaxAnalysis = () => {
    toast({
      title: "AI Tax Analysis",
      description: "AI is analyzing your financial data for tax optimization strategies",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      "paid": { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", label: "Paid" },
      "pending": { bg: "bg-amber-100 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", label: "Pending" },
      "overdue": { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", label: "Overdue" },
      "approved": { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", label: "Approved" }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`text-xs px-2.5 py-0.5 rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Finance</h1>
            <p className="text-muted-foreground mt-1">
              Manage your company's financial activities and reports
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleConnectAccounting}
            >
              <Settings size={18} />
              <span>Connect Accounting</span>
            </Button>
            
            <Button
              className="flex items-center gap-2"
            >
              <DollarSign size={18} />
              <span>Financial Report</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="taxes">Tax Compliance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6 space-y-6">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-5 border border-border/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalRevenue)}</h3>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs">
                  <span className="text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
                  </span>
                  <span className="text-muted-foreground ml-2">vs last month</span>
                </div>
              </Card>
              
              <Card className="p-5 border border-border/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                    <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalExpenses)}</h3>
                  </div>
                  <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs">
                  <span className="text-red-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +8.2%
                  </span>
                  <span className="text-muted-foreground ml-2">vs last month</span>
                </div>
              </Card>
              
              <Card className="p-5 border border-border/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                    <h3 className="text-2xl font-bold mt-1">{formatCurrency(profit)}</h3>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs">
                  <span className="text-muted-foreground">Profit Margin:</span>
                  <span className="text-green-500 ml-2">{profitMargin.toFixed(1)}%</span>
                </div>
              </Card>
              
              <Card className="p-5 border border-border/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Invoices</p>
                    <h3 className="text-2xl font-bold mt-1">{formatCurrency(pendingAmount)}</h3>
                  </div>
                  <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs">
                  <span className="text-muted-foreground">{pendingInvoices.length} invoices pending</span>
                </div>
              </Card>
            </div>
            
            {/* Recent Transactions */}
            <Card className="border border-border/40">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-medium">Recent Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/40">
                        <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                        <td className="py-3 px-4">{transaction.description}</td>
                        <td className={`py-3 px-4 text-right ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            {/* AI Integration Card */}
            <Card className="p-6 border border-border/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                  <Settings size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">AI-Powered Financial Analysis</h3>
                  <p className="text-sm text-muted-foreground">Get AI-powered insights and tax optimization suggestions</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleAITaxAnalysis}
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Run AI Tax Analysis
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generate Cash Flow Forecast
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Users className="mr-2 h-4 w-4" />
                  CRM Financial Analysis
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="invoices" className="mt-6">
            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-lg">
                <Input placeholder="Search invoices..." className="pl-10" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download size={18} />
                  <span>Export</span>
                </Button>
                
                <Button
                  onClick={handleAddInvoice}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={18} />
                  <span>Create Invoice</span>
                </Button>
              </div>
            </div>
            
            <Card className="border border-border/40">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Invoice ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Client</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Issue Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Due Date</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-muted/40">
                        <td className="py-3 px-4 font-mono">{invoice.id}</td>
                        <td className="py-3 px-4">{invoice.client}</td>
                        <td className="py-3 px-4 text-right font-medium">{formatCurrency(invoice.amount)}</td>
                        <td className="py-3 px-4">{getStatusBadge(invoice.status)}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="icon">
                            <FileText size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-6">
            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-lg">
                <Input placeholder="Search expenses..." className="pl-10" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Upload size={18} />
                  <span>Import</span>
                </Button>
                
                <Button
                  onClick={handleAddExpense}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={18} />
                  <span>Add Expense</span>
                </Button>
              </div>
            </div>
            
            <Card className="border border-border/40">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockExpenses.map((expense) => (
                      <tr key={expense.id} className="border-b hover:bg-muted/40">
                        <td className="py-3 px-4 font-mono">{expense.id}</td>
                        <td className="py-3 px-4">{expense.category}</td>
                        <td className="py-3 px-4 text-right font-medium text-red-600">
                          -{formatCurrency(expense.amount)}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(expense.status)}</td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="icon">
                            <Trash2 size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="taxes" className="mt-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <Card className="border border-border/40 h-full">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-medium">Tax Rates by Country</h3>
                    <p className="text-sm text-muted-foreground mt-1">AI-powered tax compliance for global operations</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Country</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Standard VAT/GST</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Other Rates</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Corporate Income Tax</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTaxRates.map((tax, index) => (
                          <tr key={index} className={`border-b hover:bg-muted/40 ${selectedCountry === tax.country ? 'bg-secondary/50' : ''}`}>
                            <td className="py-3 px-4 font-medium">{tax.country}</td>
                            <td className="py-3 px-4">{tax.standard}</td>
                            <td className="py-3 px-4">{tax.reduced || tax.sales || tax.provincial || '-'}</td>
                            <td className="py-3 px-4">{tax.corporateIncome}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
              
              <div className="md:w-1/3">
                <Card className="border border-border/40 h-full">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-medium">Tax Compliance Assistant</h3>
                    <p className="text-sm text-muted-foreground mt-1">AI-powered tax guidance</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Company Location</label>
                      <Select defaultValue={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockTaxRates.map((tax, index) => (
                            <SelectItem key={index} value={tax.country}>
                              {tax.country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tax Filing Status</label>
                      <div className="flex items-center p-3 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 rounded-md">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span className="text-sm">Next filing due: June 30, 2024</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4"
                      onClick={handleAITaxAnalysis}
                    >
                      Run AI Tax Analysis
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full"
                    >
                      Generate Tax Report
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
            
            <Card className="p-6 border border-border/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                  <Settings size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Accounting Integrations</h3>
                  <p className="text-sm text-muted-foreground">Connect with popular accounting software</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Button variant="outline" className="h-auto py-6 flex flex-col">
                  <span className="text-lg mb-2">QuickBooks</span>
                  <span className="text-xs text-muted-foreground">Connect your QuickBooks account</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col">
                  <span className="text-lg mb-2">Xero</span>
                  <span className="text-xs text-muted-foreground">Connect your Xero account</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col">
                  <span className="text-lg mb-2">FreshBooks</span>
                  <span className="text-xs text-muted-foreground">Connect your FreshBooks account</span>
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-border/40">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-medium">Income vs Expenses</h3>
                  <p className="text-sm text-muted-foreground mt-1">Monthly comparison for 2024</p>
                </div>
                <div className="p-6">
                  {/* This would normally be a chart component */}
                  <div className="h-60 flex flex-col justify-center items-center">
                    <p className="text-muted-foreground">Income vs Expenses Chart</p>
                    <p className="text-xs text-muted-foreground mt-1">Bar chart showing monthly income vs expenses</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-border/40">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-medium">Project Revenue</h3>
                  <p className="text-sm text-muted-foreground mt-1">Revenue by project</p>
                </div>
                <div className="p-6">
                  {/* This would normally be a chart component */}
                  <div className="h-60 flex flex-col justify-center items-center">
                    <p className="text-muted-foreground">Project Revenue Chart</p>
                    <p className="text-xs text-muted-foreground mt-1">Pie chart showing revenue distribution by project</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="border border-border/40">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-medium">Available Reports</h3>
                <p className="text-sm text-muted-foreground mt-1">Generate detailed financial reports</p>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-start">
                  <span className="text-md font-medium mb-1">Income Statement</span>
                  <span className="text-xs text-muted-foreground text-left">View profit and loss for any period</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-start">
                  <span className="text-md font-medium mb-1">Balance Sheet</span>
                  <span className="text-xs text-muted-foreground text-left">View assets, liabilities and equity</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-start">
                  <span className="text-md font-medium mb-1">Cash Flow</span>
                  <span className="text-xs text-muted-foreground text-left">Track money movement in and out</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-start">
                  <span className="text-md font-medium mb-1">Tax Report</span>
                  <span className="text-xs text-muted-foreground text-left">Summarize tax liabilities</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-start">
                  <span className="text-md font-medium mb-1">Expense Report</span>
                  <span className="text-xs text-muted-foreground text-left">Detailed breakdown of all expenses</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-start">
                  <span className="text-md font-medium mb-1">Sales Report</span>
                  <span className="text-xs text-muted-foreground text-left">Analysis of all sales activities</span>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Finance;
