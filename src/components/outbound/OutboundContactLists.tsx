
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MoreHorizontal, Upload } from "lucide-react";
import { ContactList } from "@/services/outboundCallService";

interface OutboundContactListsProps {
  contactLists: ContactList[];
}

const OutboundContactLists: React.FC<OutboundContactListsProps> = ({ contactLists }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Contact Lists</CardTitle>
        <Button size="sm" className="flex gap-1">
          <Users size={14} className="mr-1" />
          New List
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contactLists.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No contact lists available
            </div>
          ) : (
            contactLists.map((list) => (
              <div key={list.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{list.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{list.count} contacts</span>
                      <span>•</span>
                      <span>Updated {list.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={list.status === "Active" ? "default" : "outline"}>
                    {list.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal size={18} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-6 p-4 border rounded-md border-dashed flex flex-col items-center justify-center text-center">
          <Upload className="h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="font-medium mb-1">Import Contacts</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Upload a CSV file or import from CRM
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Upload CSV
            </Button>
            <Button variant="outline" size="sm">
              Connect CRM
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutboundContactLists;
