
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Documents = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Manage your files and documents
          </p>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search documents..." className="pl-10" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 border border-border/40 flex flex-col items-center text-center">
            <FileText size={40} className="text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg">Upload Document</h3>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-blue-500" />
              <h3 className="font-medium">Project Plan.docx</h3>
            </div>
            <p className="text-xs text-muted-foreground">Updated 2 days ago</p>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-green-500" />
              <h3 className="font-medium">Marketing Strategy.xlsx</h3>
            </div>
            <p className="text-xs text-muted-foreground">Updated 5 days ago</p>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-red-500" />
              <h3 className="font-medium">Presentation.pptx</h3>
            </div>
            <p className="text-xs text-muted-foreground">Updated 1 week ago</p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Documents;
