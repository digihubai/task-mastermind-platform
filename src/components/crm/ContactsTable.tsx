
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PenLine, Mail, Phone, Calendar, Trash2 } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: string;
  lastContact: string;
  avatar: string | null;
}

interface ContactsTableProps {
  contacts: Contact[];
  getStatusBadge: (status: string) => React.ReactNode;
  formatDate: (dateString: string) => string;
}

const ContactsTable: React.FC<ContactsTableProps> = ({
  contacts,
  getStatusBadge,
  formatDate,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Company</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Phone</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Contact</th>
            <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="border-b hover:bg-muted/40">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={contact.avatar || undefined} />
                    <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{contact.name}</span>
                </div>
              </td>
              <td className="py-3 px-4">{contact.company}</td>
              <td className="py-3 px-4">{contact.email}</td>
              <td className="py-3 px-4">{contact.phone}</td>
              <td className="py-3 px-4">{getStatusBadge(contact.status)}</td>
              <td className="py-3 px-4">{formatDate(contact.lastContact)}</td>
              <td className="py-3 px-4 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center">
                      <PenLine size={16} className="mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <Mail size={16} className="mr-2" /> Email
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <Phone size={16} className="mr-2" /> Call
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <Calendar size={16} className="mr-2" /> Schedule
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center text-red-500">
                      <Trash2 size={16} className="mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
