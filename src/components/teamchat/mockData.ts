
import { TeamChannel, TeamGroup, TeamMessage } from "@/types/support";

export type TeamMember = {
  id: string;
  name: string;
  status: string;
  avatar?: string;
};

export const mockTeamMembers: TeamMember[] = [
  {
    id: "user-1",
    name: "John Doe",
    status: "online",
    avatar: "/assets/avatars/avatar-1.png"
  },
  {
    id: "user-2",
    name: "Jane Smith",
    status: "away",
    avatar: "/assets/avatars/avatar-2.png"
  },
  {
    id: "user-3",
    name: "Mike Johnson",
    status: "offline",
    avatar: "/assets/avatars/avatar-3.png"
  }
];

export const mockChannels: TeamChannel[] = [
  {
    id: "channel-1",
    name: "general",
    icon: "📢",
    topic: "Company-wide announcements and work-related matters",
    description: "This channel is for company-wide communication",
    purpose: "Company announcements",
    isActive: true,
    unreadCount: 0,
    createdAt: new Date().toISOString(),
    createdBy: "system",
    members: ["user-1", "user-2", "user-3"]
  },
  {
    id: "channel-2",
    name: "random",
    icon: "🎭",
    topic: "Non-work banter and water cooler conversation",
    description: "A place for non-work-related flimflam, faffing, and general nonsense",
    purpose: "Fun stuff",
    isActive: false,
    unreadCount: 3,
    createdAt: new Date().toISOString(),
    createdBy: "user-1",
    members: ["user-1", "user-2"],
    isPrivate: false
  },
  {
    id: "channel-3",
    name: "marketing",
    icon: "📣",
    topic: "Marketing team discussions",
    description: "Marketing campaigns, strategies, and results",
    purpose: "Marketing team coordination",
    isActive: false,
    unreadCount: 12,
    createdAt: new Date().toISOString(),
    createdBy: "user-2",
    members: ["user-1", "user-2"],
    isPrivate: true
  }
];

export const mockGroups: TeamGroup[] = [
  {
    id: "group-1",
    name: "Sales Team",
    members: ["user-1", "user-2"],
    createdAt: new Date().toISOString(),
    createdBy: "user-1",
    unreadCount: 5,
    isPinned: true,
    isActive: false
  },
  {
    id: "group-2",
    name: "Development Team",
    members: ["user-1", "user-3"],
    createdAt: new Date().toISOString(),
    createdBy: "user-3",
    unreadCount: 0,
    isPinned: false,
    isActive: false
  }
];

export const mockMessages: TeamMessage[] = [
  {
    id: "msg-1",
    channelId: "channel-1",
    content: "Welcome to the general channel!",
    createdAt: new Date().toISOString(),
    senderId: "user-1",
    isPinned: true
  },
  {
    id: "msg-2",
    channelId: "channel-1",
    content: "Thanks! Happy to be here.",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    senderId: "user-2"
  },
  {
    id: "msg-3",
    channelId: "channel-2",
    content: "Anyone watching the game tonight?",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    senderId: "user-1"
  },
  {
    id: "msg-4",
    groupId: "group-1",
    content: "Let's discuss the Q2 targets",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    senderId: "user-1"
  }
];

export const mockGifs = [
  { id: "gif-1", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTBwd2FtZGd3ZXBkYmRxbHR0NHNzamFkY2J0aGZ2dDV0NzJ1aDRjNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT1XGS8T8m0sitetBC/giphy.gif", title: "Happy dance" },
  { id: "gif-2", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWl0ZXV0cHRwZnV0aXhnOGYza2U0YW1idGYzZ2tmOGVtbTJ2ZTlyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FPpSuhgHvYo9Kyk/giphy.gif", title: "Typing" },
  { id: "gif-3", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTRmZWNiNzZreG1jdjkwcGl0OGdxaWg2cTltOHlncXBlc2w0cW9xZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif", title: "Thumbs up" },
  { id: "gif-4", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDVmd2V3emN1NWNhYTg1ZHZ5aGxwMTlyM3dzbWF2bWZkMWZ0aHY2dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHAUOqG3lSS0f1C/giphy.gif", title: "High five" }
];
