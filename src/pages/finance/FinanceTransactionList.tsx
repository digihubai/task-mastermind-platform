
import React from "react";
import { Building, CreditCard, DollarSign, ShoppingBag, Coffee, Plane, Gift, Zap, Music, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinanceTransactionList = () => {
  // Sample transaction data
  const transactions = [
    {
      id: 1,
      type: "income",
      name: "Client Payment - ABC Corp",
      category: "Services",
      amount: 4850.00,
      date: "Oct 12, 2023",
      icon: <Building size={18} className="text-green-600" />,
      iconBg: "bg-green-100"
    },
    {
      id: 2,
      type: "expense",
      name: "Office Supplies",
      category: "Office",
      amount: 145.88,
      date: "Oct 10, 2023",
      icon: <ShoppingBag size={18} className="text-amber-600" />,
      iconBg: "bg-amber-100"
    },
    {
      id: 3,
      type: "expense",
      name: "Software Subscription",
      category: "Software",
      amount: 79.99,
      date: "Oct 08, 2023",
      icon: <Zap size={18} className="text-indigo-600" />,
      iconBg: "bg-indigo-100"
    },
    {
      id: 4,
      type: "income",
      name: "Product Sales - Online Store",
      category: "Sales",
      amount: 1245.50,
      date: "Oct 05, 2023",
      icon: <DollarSign size={18} className="text-green-600" />,
      iconBg: "bg-green-100"
    },
    {
      id: 5,
      type: "expense",
      name: "Business Lunch",
      category: "Meals",
      amount: 68.25,
      date: "Oct 04, 2023",
      icon: <Coffee size={18} className="text-amber-600" />,
      iconBg: "bg-amber-100"
    },
    {
      id: 6,
      type: "expense",
      name: "Internet Bill",
      category: "Utilities",
      amount: 89.99,
      date: "Oct 03, 2023",
      icon: <Zap size={18} className="text-blue-600" />,
      iconBg: "bg-blue-100"
    },
    {
      id: 7,
      type: "expense",
      name: "Business Trip - Flight",
      category: "Travel",
      amount: 450.00,
      date: "Oct 01, 2023",
      icon: <Plane size={18} className="text-purple-600" />,
      iconBg: "bg-purple-100"
    }
  ];

  return (
    <div className="divide-y">
      {transactions.map((transaction) => (
        <div 
          key={transaction.id} 
          className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-4"
        >
          <div className={`h-10 w-10 rounded-full ${transaction.iconBg} flex items-center justify-center`}>
            {transaction.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-sm">{transaction.name}</p>
                <p className="text-xs text-muted-foreground">{transaction.category}</p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : ''}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight size={18} />
          </Button>
        </div>
      ))}
      
      <div className="p-4 flex justify-center">
        <Button variant="outline">View All Transactions</Button>
      </div>
    </div>
  );
};

export default FinanceTransactionList;
