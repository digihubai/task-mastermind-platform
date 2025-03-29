
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ThumbnailSystem = () => {
  return (
    <AdminLayout 
      title="Thumbnail System" 
      description="Configure image thumbnails and processing settings"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thumbnail Generation</CardTitle>
            <CardDescription>
              Configure how thumbnails are generated for uploaded images
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-generate">Automatic Thumbnail Generation</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically generate thumbnails for uploaded images
                </p>
              </div>
              <Switch id="auto-generate" defaultChecked />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="thumbnail-width">Default Thumbnail Width</Label>
                <Input 
                  id="thumbnail-width"
                  type="number"
                  defaultValue="300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thumbnail-height">Default Thumbnail Height</Label>
                <Input 
                  id="thumbnail-height"
                  type="number"
                  defaultValue="300"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="thumbnail-quality">Image Quality (1-100)</Label>
              <Input 
                id="thumbnail-quality"
                type="number"
                min="1"
                max="100"
                defaultValue="85"
              />
              <p className="text-xs text-muted-foreground">
                Lower values result in smaller file sizes but lower quality
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="thumbnail-format">Default Image Format</Label>
              <select 
                id="thumbnail-format" 
                className="w-full p-2 border rounded-md"
              >
                <option value="webp">WebP (recommended)</option>
                <option value="jpg">JPEG</option>
                <option value="png">PNG</option>
              </select>
            </div>
            
            <div className="pt-4">
              <Button>Save Thumbnail Settings</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Image Storage</CardTitle>
            <CardDescription>
              Configure where and how images are stored
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storage-provider">Storage Provider</Label>
              <select 
                id="storage-provider" 
                className="w-full p-2 border rounded-md"
              >
                <option value="local">Local Storage</option>
                <option value="s3">Amazon S3</option>
                <option value="cloudinary">Cloudinary</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="image-optimization">Enable Image Optimization</Label>
                <p className="text-sm text-muted-foreground">
                  Optimize images for faster loading and better performance
                </p>
              </div>
              <Switch id="image-optimization" defaultChecked />
            </div>
            
            <div className="pt-4">
              <Button>Save Storage Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ThumbnailSystem;
