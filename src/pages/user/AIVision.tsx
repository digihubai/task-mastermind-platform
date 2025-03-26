
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Upload, Search } from "lucide-react";

const AIVision = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI Vision</h1>
          <p className="text-muted-foreground mt-1">
            Analyze images and extract insights with AI
          </p>
        </div>
        
        <Card className="p-8 border border-border/40 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Upload size={30} className="text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Upload Image</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Upload an image to analyze content, extract text, detect objects, and generate descriptions
          </p>
          <div className="flex justify-center gap-3">
            <Button>Upload Image</Button>
            <Button variant="outline">Camera Capture</Button>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border/40">
            <div className="h-36 bg-muted rounded-md mb-4 flex items-center justify-center">
              <Image size={30} className="text-muted-foreground" />
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Product Image</h3>
              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Analyzed</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Processed 2 days ago</p>
            <Button size="sm" variant="outline" className="w-full">View Analysis</Button>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="h-36 bg-muted rounded-md mb-4 flex items-center justify-center">
              <Image size={30} className="text-muted-foreground" />
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Document Scan</h3>
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">OCR</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Processed 5 days ago</p>
            <Button size="sm" variant="outline" className="w-full">View Text</Button>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="h-36 bg-muted rounded-md mb-4 flex items-center justify-center">
              <Image size={30} className="text-muted-foreground" />
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Scene Recognition</h3>
              <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">Objects</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Processed 1 week ago</p>
            <Button size="sm" variant="outline" className="w-full">View Detections</Button>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIVision;
