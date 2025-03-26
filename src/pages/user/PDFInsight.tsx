
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Search, Upload } from "lucide-react";

const PDFInsight = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">PDF Insight</h1>
          <p className="text-muted-foreground mt-1">
            Extract insights and analyze PDF documents
          </p>
        </div>
        
        <Card className="p-8 border border-border/40 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Upload size={30} className="text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Upload PDF Document</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Upload a PDF file to extract insights, summarize content, and analyze data
          </p>
          <div className="flex justify-center gap-3">
            <Button>Upload PDF</Button>
            <Button variant="outline">Browse Library</Button>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <FileSpreadsheet size={24} className="text-primary" />
              <div>
                <h3 className="font-medium">Financial Report.pdf</h3>
                <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Analyzed</span>
              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Summarized</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 flex items-center gap-1">
                <Search size={14} />
                <span>View</span>
              </Button>
              <Button size="sm" variant="outline" className="flex-1">Insights</Button>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <FileSpreadsheet size={24} className="text-primary" />
              <div>
                <h3 className="font-medium">Research Paper.pdf</h3>
                <p className="text-xs text-muted-foreground">Uploaded 1 week ago</p>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Analyzed</span>
              <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">Q&A Enabled</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 flex items-center gap-1">
                <Search size={14} />
                <span>View</span>
              </Button>
              <Button size="sm" variant="outline" className="flex-1">Insights</Button>
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <FileSpreadsheet size={24} className="text-primary" />
              <div>
                <h3 className="font-medium">Contract.pdf</h3>
                <p className="text-xs text-muted-foreground">Uploaded 3 weeks ago</p>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">Processing</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 flex items-center gap-1">
                <Search size={14} />
                <span>View</span>
              </Button>
              <Button size="sm" variant="outline" className="flex-1" disabled>Insights</Button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default PDFInsight;
