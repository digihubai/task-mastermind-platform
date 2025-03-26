
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, Search, Filter, MoreHorizontal, ArrowUpDown, 
  Mail, Phone, MessageSquare, Calendar, Download, Trash2
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "lead";
  lastContact: string;
  spent: number;
  tags: string[];
}

const CustomersPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    status: "lead"
  });
  
  const mockCustomers: Customer[] = [
    {
      id: "c1",
      name: "John Smith",
      email: "john@example.com",
      phone: "(555) 123-4567",
      status: "active",
      lastContact: "2023-11-10",
      spent: 1250,
      tags: ["retail", "premium"]
    },
    {
      id: "c2",
      name: "Emily Johnson",
      email: "emily@example.com",
      phone: "(555) 234-5678",
      status: "active",
      lastContact: "2023-11-08",
      spent: 3400,
      tags: ["e-commerce", "enterprise"]
    },
    {
      id: "c3",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "(555) 345-6789",
      status: "inactive",
      lastContact: "2023-10-15",
      spent: 750,
      tags: ["retail"]
    },
    {
      id: "c4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "(555) 456-7890",
      status: "lead",
      lastContact: "2023-11-12",
      spent: 0,
      tags: ["healthcare"]
    },
    {
      id: "c5",
      name: "David Miller",
      email: "david@example.com",
      phone: "(555) 567-8901",
      status: "active",
      lastContact: "2023-11-05",
      spent: 2100,
      tags: ["saas", "enterprise"]
    },
    {
      id: "c6",
      name: "Jessica Davis",
      email: "jessica@example.com",
      phone: "(555) 678-9012",
      status: "inactive",
      lastContact: "2023-09-28",
      spent: 500,
      tags: ["retail"]
    },
    {
      id: "c7",
      name: "Robert Wilson",
      email: "robert@example.com",
      phone: "(555) 789-0123",
      status: "lead",
      lastContact: "2023-11-11",
      spent: 0,
      tags: ["real-estate"]
    }
  ];
  
  const filteredCustomers = mockCustomers.filter(customer => {
    // Apply status filter
    if (statusFilter !== "all" && customer.status !== statusFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(query) || 
        customer.email.toLowerCase().includes(query) ||
        customer.phone.includes(query)
      );
    }
    
    return true;
  });
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800";
      case "inactive":
        return "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      case "lead":
        return "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      default:
        return "bg-secondary text-foreground";
    }
  };
  
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast({
        title: "Missing information",
        description: "Please fill in the required fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Customer added",
      description: `${newCustomer.name} has been added to your customer list`,
    });
    
    // Reset form
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: "lead"
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Customers</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your customers
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle size={18} />
                <span>Add Customer</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Enter the customer details to add them to your database.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name*</Label>
                  <Input 
                    id="name" 
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    placeholder="John Smith"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newCustomer.status}
                    onValueChange={(value) => setNewCustomer({...newCustomer, status: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setNewCustomer({
                    name: "",
                    email: "",
                    phone: "",
                    status: "lead"
                  });
                }}>
                  Cancel
                </Button>
                <Button onClick={handleAddCustomer}>Add Customer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="border border-border/40">
          <div className="p-4 border-b border-border flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Search customers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:bg-secondary focus:border-primary/20 transition-colors"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Download size={16} />
                    <span>Export to CSV</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>Email selected</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                    <Trash2 size={16} />
                    <span>Delete selected</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded border-border" />
                  </TableHead>
                  <TableHead className="min-w-[150px]">
                    <div className="flex items-center gap-1">
                      <span>Name</span>
                      <ArrowUpDown size={14} className="text-muted-foreground" />
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[150px]">Email</TableHead>
                  <TableHead className="min-w-[120px]">Phone</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">
                    <div className="flex items-center gap-1">
                      <span>Last Contact</span>
                      <ArrowUpDown size={14} className="text-muted-foreground" />
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[80px] text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span>Spent</span>
                      <ArrowUpDown size={14} className="text-muted-foreground" />
                    </div>
                  </TableHead>
                  <TableHead className="w-32">Tags</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map(customer => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-border" />
                    </TableCell>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={`${getStatusBadgeColor(customer.status)} capitalize`}
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(customer.lastContact).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">${customer.spent.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {customer.tags.map(tag => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs py-0 px-1"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            toast({
                              title: "Send email",
                              description: `Email to ${customer.name} will be sent`,
                            });
                          }}
                        >
                          <Mail size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            toast({
                              title: "Send message",
                              description: `Message to ${customer.name} will be sent`,
                            });
                          }}
                        >
                          <MessageSquare size={16} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Calendar size={16} />
                              <span>Schedule meeting</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Phone size={16} />
                              <span>Call customer</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2">
                              <span>View details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredCustomers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search size={48} className="mb-2 opacity-20" />
                        <p>No customers found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t border-border flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {filteredCustomers.length} of {mockCustomers.length} customers
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CustomersPage;
