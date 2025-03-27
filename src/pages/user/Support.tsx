import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Plus, Search, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/Badge";
import {
  SupportTicket,
  SupportMessage,
} from "@/types/support";

const userTicketsData: SupportTicket[] = [
  {
    id: "ticket-1",
    subject: "Login Issue",
    description: "I am unable to login to my account.",
    status: "open",
    priority: "high",
    category: "technical",
    createdAt: "2023-06-21T10:30:00Z",
    updatedAt: "2023-06-21T10:30:00Z",
    userId: "user-1",
    department: "technical-support",
    tags: ["login", "account", "urgent"],
    messages: [
      {
        id: "msg-1",
        ticketId: "ticket-1",
        content: "I've been trying to login for the last hour but keep getting an error message.",
        createdAt: "2023-06-21T10:30:00Z",
        userId: "user-1",
        senderId: "user-1",
        senderType: "customer",
        isInternal: false,
        isRead: true
      },
      {
        id: "msg-2",
        ticketId: "ticket-1",
        content: "Can you please try clearing your browser cookies and cache, then try logging in again?",
        createdAt: "2023-06-21T11:15:00Z",
        userId: "support-1",
        senderId: "support-1",
        senderType: "support",
        isInternal: false,
        isRead: true
      }
    ]
  },
  {
    id: "ticket-2",
    subject: "Billing Question",
    description: "I have a question about my latest invoice.",
    status: "in-progress",
    priority: "medium",
    category: "billing",
    createdAt: "2023-06-20T14:20:00Z",
    updatedAt: "2023-06-20T15:45:00Z",
    userId: "user-1",
    department: "billing",
    tags: ["invoice", "payment"],
    messages: [
      {
        id: "msg-3",
        ticketId: "ticket-2",
        content: "I was charged twice for my subscription this month. Can you help?",
        createdAt: "2023-06-20T14:20:00Z",
        userId: "user-1",
        senderId: "user-1",
        senderType: "customer",
        isInternal: false,
        isRead: true
      },
      {
        id: "msg-4",
        ticketId: "ticket-2",
        content: "I'll look into this right away. Can you tell me which payment method was charged?",
        createdAt: "2023-06-20T15:45:00Z",
        userId: "support-2",
        senderId: "support-2",
        senderType: "support",
        isInternal: false,
        isRead: true
      }
    ]
  }
];

const Support = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(userTicketsData);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleTicketSelect = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  // Function to handle sending a new message
  const handleSendMessage = (message: string) => {
    if (!selectedTicket || !message.trim()) return;

    const newMessage: SupportMessage = {
      id: `msg-${Date.now()}`,
      ticketId: selectedTicket.id,
      content: message,
      createdAt: new Date().toISOString(),
      userId: "user-1",
      senderId: "user-1",
      senderType: "customer",
      isInternal: false,
      isRead: false
    };

    // Update the ticket with the new message
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return { ...ticket, messages: [...ticket.messages, newMessage] };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setSelectedTicket({ ...selectedTicket, messages: [...selectedTicket.messages, newMessage] });
    setNewMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "in-progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "resolved": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "closed": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Support Tickets</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tickets List */}
          <div className="md:col-span-1">
            <Card className="h-[75vh]">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-medium">Your Tickets</h2>
                <Button variant="ghost" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Ticket
                </Button>
              </div>

              <div className="p-4">
                <Input
                  type="search"
                  placeholder="Search tickets..."
                  className="w-full mb-4"
                />
              </div>

              <ScrollArea className="h-[calc(100%-150px)]">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-4 border-b last:border-b-0 cursor-pointer ${selectedTicket?.id === ticket.id ? "bg-secondary" : "hover:bg-secondary/50"
                      }`}
                    onClick={() => handleTicketSelect(ticket)}
                  >
                    <div className="flex justify-between">
                      <h3 className="text-md font-semibold">{ticket.subject}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Add Assignee</DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Resolve Ticket
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Close Ticket
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </Card>
          </div>

          {/* Ticket Details and Messages */}
          <div className="md:col-span-2">
            {selectedTicket ? (
              <Card className="h-[75vh] flex flex-col">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-medium">{selectedTicket.subject}</h2>
                  <p className="text-sm text-muted-foreground">{selectedTicket.description}</p>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedTicket.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderType === "customer" ? "justify-end" : "justify-start"
                          }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.senderType !== "customer" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://github.com/shadcn.png" alt="Support" />
                              <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-lg p-3 w-fit max-w-[80%] ${message.senderType === "customer"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                              }`}
                          >
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {message.content}
                            </p>
                            <span className="text-xs opacity-70 mt-1 block">
                              {new Date(message.createdAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage(newMessage);
                        }
                      }}
                    />
                    <Button onClick={() => handleSendMessage(newMessage)}>Send</Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-[75vh] flex items-center justify-center">
                <p className="text-lg text-muted-foreground">Select a ticket to view details.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Support;
